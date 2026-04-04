// src/game/nusantacraft.js
import { dioramaData } from '../data/dioramas.js';
import { openDiorama } from '../diorama.js';

let currentGameIslandId = null;
let activeTargetEl = null;
let remainingItems = 0;

function playGameSound(type) {
  const audioCtx = window.ncAudioCtx || new (window.AudioContext || window.webkitAudioContext)();
  if (!window.ncAudioCtx) window.ncAudioCtx = audioCtx;
  
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  
  const now = audioCtx.currentTime;
  
  switch(type) {
    case 'select':
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.1);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.05);
      gain.gain.linearRampToValueAtTime(0, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
      break;
    case 'deselect':
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.1);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.05);
      gain.gain.linearRampToValueAtTime(0, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
      break;
    case 'matched':
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(554, now + 0.1); // C#
      osc.frequency.setValueAtTime(659, now + 0.2); // E
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.4, now + 0.05);
      gain.gain.linearRampToValueAtTime(0, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
      break;
    case 'wrong':
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.linearRampToValueAtTime(100, now + 0.3);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.05);
      gain.gain.linearRampToValueAtTime(0, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
      break;
    case 'victory':
      osc.type = 'square';
      osc.frequency.setValueAtTime(440, now); // A
      osc.frequency.setValueAtTime(554, now + 0.15); // C#
      osc.frequency.setValueAtTime(659, now + 0.3); // E
      osc.frequency.setValueAtTime(880, now + 0.45); // A high
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.1);
      gain.gain.linearRampToValueAtTime(0.1, now + 0.8);
      gain.gain.linearRampToValueAtTime(0, now + 1.0);
      osc.start(now);
      osc.stop(now + 1.0);
      break;
    case 'click':
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.1, now + 0.02);
      gain.gain.linearRampToValueAtTime(0, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
      break;
  }
}

export function startNusantacraft() {
  const islands = Object.keys(dioramaData).filter(id => id !== 'taiwan');
  const randomIsland = islands[Math.floor(Math.random() * islands.length)];
  currentGameIslandId = randomIsland;
  
  // Close the panels
  const btn = document.querySelector('#games-panel .close-btn');
  if (btn) btn.click();
  
  // Launch Diorama in Game Mode
  openDiorama(randomIsland, true); // true = gameMode
  
  // Reset state
  activeTargetEl = null;
  
  // Build the UI
  document.getElementById('nc-ui').classList.remove('hidden');
  document.getElementById('nc-victory-modal').classList.add('hidden');
  
  // Bind global click listener for clicking on diorama targets
  // It's attached to the container so it works for dynamically injected targets
  const container = document.getElementById('diorama-layers-container');
  container.removeEventListener('click', handleDioramaClick); // prevent duplicates
  container.addEventListener('click', handleDioramaClick);
  
  buildInventory(randomIsland);
}

function handleDioramaClick(e) {
  const target = e.target.closest('.nc-drop-target');
  if (!target) {
    if (activeTargetEl) {
      activeTargetEl.classList.remove('nc-target-selected');
      activeTargetEl = null;
      playGameSound('deselect');
    }
    return;
  }
  
  // If clicking an already selected target, deselect it
  if (activeTargetEl === target) {
    target.classList.remove('nc-target-selected');
    activeTargetEl = null;
    playGameSound('deselect');
    return;
  }
  
  // Deselect previous
  if (activeTargetEl) {
    activeTargetEl.classList.remove('nc-target-selected');
  }
  
  // Select new
  activeTargetEl = target;
  target.classList.add('nc-target-selected');
  playGameSound('select');
}

function buildInventory(correctIslandId) {
  const track = document.getElementById('nc-inventory-track');
  track.innerHTML = '';
  
  const correctLayerData = dioramaData[correctIslandId].layers.filter(
    l => l.url && !l.id.startsWith('bg-')
  );
  remainingItems = correctLayerData.length;
  
  // Build a pool of all interactive layers
  let allLayers = [];
  Object.entries(dioramaData).forEach(([islandId, island]) => {
    if (islandId === 'taiwan') return; // Exclude Taiwan layers from game pool
    island.layers.forEach(layer => {
      if (layer.url && !layer.id.startsWith('bg-')) {
        allLayers.push(layer);
      }
    });
  });
  
  // Gather items for inventory: correct ones + random distractors
  const inventoryItems = [...correctLayerData];
  
  // Fill until 15 items
  while (inventoryItems.length < 15) {
    const randomDecoy = allLayers[Math.floor(Math.random() * allLayers.length)];
    // Make sure we don't duplicate (though duplicates are fine if it's the exact same object, but let's avoid it if it's the same URL)
    if (!inventoryItems.find(i => i.url === randomDecoy.url)) {
      inventoryItems.push(randomDecoy);
    }
  }
  
  // Shuffle array
  inventoryItems.sort(() => Math.random() - 0.5);
  
  // Render html
  inventoryItems.forEach(itemData => {
    const slot = document.createElement('div');
    slot.className = 'nc-slot';
    
    const sprite = document.createElement('div');
    sprite.className = 'nc-draggable-sprite';
    sprite.setAttribute('data-url', itemData.url);
    // Resolve URL using exact same logic as diorama.js
    const resolvedUrl = (itemData.url && itemData.url.startsWith('/assets/')) 
      ? import.meta.env.BASE_URL + itemData.url.substring(1) 
      : itemData.url;
    sprite.style.backgroundImage = `url(${resolvedUrl})`;
    
    // Bind click event instead of drag events
    sprite.addEventListener('click', () => {
      handleTrayItemClick(sprite, itemData.url);
    });
    
    slot.appendChild(sprite);
    track.appendChild(slot);
  });
}

function handleTrayItemClick(spriteEl, itemUrl) {
  if (!activeTargetEl) {
    showToast("Select an empty slot in the diorama first!");
    playGameSound('wrong');
    return;
  }
  
  const requiredUrl = activeTargetEl.getAttribute('data-expected-url');
  
  if (requiredUrl === itemUrl) {
    // Success!
    handleSuccess(spriteEl, activeTargetEl);
  } else {
    // Fail
    handleFail();
  }
}

function handleSuccess(spriteEl, dropZoneEl) {
  // Turn the drop zone into the actual visual sprite layer
  dropZoneEl.className = 'diorama-layer'; 
  dropZoneEl.style.animation = 'none';
  dropZoneEl.style.border = 'none';
  dropZoneEl.innerHTML = ''; // clear hint text
  dropZoneEl.style.backgroundColor = 'transparent';
  
  const resolvedUrl = spriteEl.style.backgroundImage;
  dropZoneEl.style.backgroundImage = resolvedUrl;
  
  // Make sprite disappear from tray
  spriteEl.style.opacity = '0';
  spriteEl.style.pointerEvents = 'none';
  
  // Deselect target
  activeTargetEl = null;
  
  // Decrement
  remainingItems--;
  if (remainingItems <= 0) {
    playGameSound('victory');
    showVictory();
  } else {
    playGameSound('matched');
  }
}

function handleFail() {
  playGameSound('wrong');
  showToast("Hmm, that doesn't seem to belong there...");
}

function showToast(msg) {
  const toast = document.getElementById('nc-feedback-toast');
  toast.textContent = msg;
  toast.classList.remove('hidden');
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3000);
}

function showVictory() {
  document.getElementById('nc-victory-modal').classList.remove('hidden');
  document.getElementById('nc-inventory-wrapper').classList.add('hidden');
}

// Global binds
document.addEventListener('DOMContentLoaded', () => {
  // Just in case it's loaded early
  const btnPlay = document.getElementById('nc-btn-playagain');
  if (btnPlay) {
    btnPlay.addEventListener('click', () => {
      playGameSound('click');
      document.getElementById('nc-inventory-wrapper').classList.remove('hidden');
      startNusantacraft();
    });
  }
  
  const btnOrbit = document.getElementById('nc-btn-orbit');
  if (btnOrbit) {
    btnOrbit.addEventListener('click', () => {
      playGameSound('click');
      document.getElementById('nc-ui').classList.add('hidden');
      document.getElementById('diorama-exit-btn').click(); // trigger natural exit
    });
  }
});
