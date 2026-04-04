// src/game/spritehunter.js
import { dioramaData } from '../data/dioramas.js';
import { resetGlobeView } from '../globe.js';
import { playSound } from '../audio.js';

let isGameActive = false;
let spritePool = [];
let currentTarget = null;
let score = 0;
let cooldownPhase = false;



export function startSpriteHunter() {
  const btn = document.querySelector('#games-panel .close-btn');
  if (btn) btn.click();
  
  isGameActive = true;
  score = 0;
  cooldownPhase = false;
  
  // Hide main UI, Fade in Diorama space (reused for game background)
  document.getElementById('bottom-bar').classList.add('hidden');
  document.getElementById('sidebar-left').classList.add('hidden');
  document.getElementById('sidebar-right').classList.add('hidden');
  document.getElementById('top-bar').classList.add('hidden');
  
  const view = document.getElementById('diorama-view');
  view.style.opacity = '1';
  view.classList.remove('hidden');
  
  // Clear diorama layers manually (we don't use openDiorama)
  document.getElementById('diorama-layers-container').innerHTML = '';
  document.getElementById('diorama-title').textContent = 'SPRITE HUNTER';
  document.getElementById('diorama-annotation').classList.add('hidden');
  document.getElementById('nc-ui').classList.add('hidden');
  
  // Choose random background
  const islands = Object.values(dioramaData);
  const randomIsland = islands[Math.floor(Math.random() * islands.length)];
  const bgLayerDef = randomIsland.layers.find(l => l.id.startsWith('bg-'));
  
  const bgLayerUI = document.querySelector('.bg-layer');
  if (bgLayerDef && bgLayerDef.url) {
    const assetUrl = bgLayerDef.url.startsWith('/') 
      ? import.meta.env.BASE_URL + bgLayerDef.url.substring(1) 
      : bgLayerDef.url;
    bgLayerUI.style.backgroundImage = `url(${assetUrl})`;
    bgLayerUI.style.backgroundColor = 'transparent';
    if (bgLayerDef.bgSize) bgLayerUI.style.backgroundSize = bgLayerDef.bgSize;
    if (bgLayerDef.bgPosition) bgLayerUI.style.backgroundPosition = bgLayerDef.bgPosition;
  } else {
    bgLayerUI.style.backgroundImage = 'none';
    bgLayerUI.style.backgroundColor = '#1c1c20';
  }

  // Setup UI
  document.getElementById('sh-ui').classList.remove('hidden');
  document.getElementById('sh-victory-modal').classList.add('hidden');
  document.getElementById('sh-score').textContent = `SCORE: 0 / 10`;
  
  buildSpritePool();
  spawnSprites();
  setNewTarget();
}

function buildSpritePool() {
  spritePool = [];
  // Grab all layers that have hotspots across all islands
  Object.values(dioramaData).forEach(island => {
    island.layers.forEach(layer => {
      if (layer.url && !layer.id.startsWith('bg-') && layer.id !== 'no-volcano' && layer.hotspots && layer.hotspots.length > 0) {
        spritePool.push({
          url: layer.url,
          title: layer.hotspots[0].title
        });
      }
    });
  });
  
  // Shuffle pool
  spritePool.sort(() => Math.random() - 0.5);
}

function spawnSprites() {
  const container = document.getElementById('sh-lanes-container');
  container.innerHTML = '';
  
  // Clone and shuffle pool to guarantee unique spawns
  const uniqueItems = [...spritePool].sort(() => Math.random() - 0.5);
  
  // Create 6 horizontal lanes
  for (let i = 0; i < 6; i++) {
    const lane = document.createElement('div');
    lane.className = 'sh-lane';
    lane.style.top = `${5 + (i * 12)}%`; // spread 6 lanes vertically
    
    // Pick 2 or 3 items for this lane
    const numSprites = Math.floor(Math.random() * 2) + 2;
    for (let j = 0; j < numSprites; j++) {
      if (uniqueItems.length === 0) break; // Reached end of available unique sprites
      const spriteData = uniqueItems.pop();
      
      const sprite = document.createElement('div');
      sprite.className = 'sh-sprite';
      
      const resolvedUrl = spriteData.url.startsWith('/') 
        ? import.meta.env.BASE_URL + spriteData.url.substring(1) 
        : spriteData.url;
      
      sprite.style.backgroundImage = `url(${resolvedUrl})`;
      
      // Randomize animation speed (10s to 25s)
      const duration = 12 + Math.random() * 15;
      sprite.style.animationDuration = `${duration}s`;
      
      // Randomize animation delay (-20s to 0s) to spread them out
      const delay = -(Math.random() * 20);
      sprite.style.animationDelay = `${delay}s`;
      
      // Randomize z-index based on lane
      sprite.style.zIndex = i + 10;
      
      sprite.dataset.title = spriteData.title;
      
      sprite.addEventListener('click', (e) => {
        e.stopPropagation();
        handleSpriteClick(sprite, spriteData.title);
      });
      
      lane.appendChild(sprite);
    }
    container.appendChild(lane);
  }
}

function handleSpriteClick(spriteEl, title) {
  if (cooldownPhase) {
    playSound('wrong');
    return;
  }
  
  if (title === currentTarget) {
    // Match
    playSound('matched');
    spriteEl.style.display = 'none'; // remove sprite completely
    
    score++;
    document.getElementById('sh-score').textContent = `SCORE: ${score} / 10`;
    
    if (score >= 10) {
      playSound('victory');
      document.getElementById('sh-victory-modal').classList.remove('hidden');
    } else {
      setNewTarget();
    }
  } else {
    // Fail
    playSound('wrong');
    showFeedback("Incorrect! Module cooling down...");
    
    // Cooldown logic
    cooldownPhase = true;
    document.getElementById('sh-ui').classList.add('sh-cooldown-active');
    setTimeout(() => {
      cooldownPhase = false;
      document.getElementById('sh-ui').classList.remove('sh-cooldown-active');
    }, 2000);
  }
}

function showFeedback(msg) {
  const toast = document.getElementById('sh-feedback-toast');
  toast.textContent = msg;
  toast.classList.remove('hidden');
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 2000);
}

function setNewTarget() {
  const sprites = Array.from(document.querySelectorAll('.sh-sprite'));
  const activeSprites = sprites.filter(s => s.style.display !== 'none');
  
  if (activeSprites.length === 0) {
    return; // Should theoretically only happen if all are clicked, but victory triggers first.
  }
  
  const randomSpriteNode = activeSprites[Math.floor(Math.random() * activeSprites.length)];
  currentTarget = randomSpriteNode.dataset.title;
  document.getElementById('sh-target-word').textContent = currentTarget;
}

// Global Binds
document.addEventListener('DOMContentLoaded', () => {
  const btnPlay = document.getElementById('sh-btn-playagain');
  if (btnPlay) {
    btnPlay.addEventListener('click', () => {
      playSound('click');
      startSpriteHunter();
    });
  }
  
  const btnOrbit = document.getElementById('sh-btn-orbit');
  if (btnOrbit) {
    btnOrbit.addEventListener('click', () => {
      playSound('click');
      isGameActive = false;
      document.getElementById('sh-ui').classList.add('hidden');
      
      const view = document.getElementById('diorama-view');
      view.style.opacity = '0';
      
      resetGlobeView(); // Needs import from globe.js
      
      setTimeout(() => {
        view.classList.add('hidden');
        document.getElementById('bottom-bar').classList.remove('hidden');
        document.getElementById('sidebar-left').classList.remove('hidden');
        document.getElementById('sidebar-right').classList.remove('hidden');
        document.getElementById('top-bar').classList.remove('hidden');
        document.getElementById('diorama-layers-container').innerHTML = '';
      }, 800);
    });
  }
});
