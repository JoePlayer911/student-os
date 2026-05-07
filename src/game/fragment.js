// src/game/fragment.js
import { dioramaData } from '../data/dioramas.js';
import { resetGlobeView } from '../globe.js';
import { playSound } from '../audio.js';
import { t } from '../i18n.js';

let isGameActive = false;
let pieces = [];
let slots = [];
let spriteReady = false;

export function startFragment() {
  const btn = document.querySelector('#games-panel .close-btn');
  if (btn) btn.click();

  isGameActive = true;
  spriteReady = false;
  
  // Hide main UI
  document.getElementById('bottom-bar').classList.add('hidden');
  document.getElementById('sidebar-left').classList.add('hidden');
  document.getElementById('sidebar-right').classList.add('hidden');
  document.getElementById('top-bar').classList.add('hidden');
  
  const view = document.getElementById('diorama-view');
  view.style.opacity = '1';
  view.classList.remove('hidden');
  
  document.getElementById('diorama-layers-container').innerHTML = '';
  document.getElementById('diorama-title').textContent = t('title-fr');
  
  // Choose random background from Java or Sumatra
  const bgLayerUI = document.querySelector('.bg-layer');
  bgLayerUI.style.backgroundImage = 'none';
  bgLayerUI.style.backgroundColor = '#0a0a0c';

  // Setup UI
  document.getElementById('fr-ui').classList.remove('hidden');
  document.getElementById('fr-victory-modal').classList.add('hidden');
  document.getElementById('fr-status').textContent = 'LOADING ARCHIVE DATA...';
  
  initGame();
}

async function initGame() {
  const container = document.getElementById('fr-game-area');
  container.innerHTML = '';
  pieces = [];
  slots = [];

  // 1. Pick a random sprite
  const allSprites = [];
  Object.values(dioramaData).forEach(island => {
    island.layers.forEach(layer => {
      if (layer.url && !layer.id.startsWith('bg-') && layer.id !== 'no-volcano') {
        allSprites.push({
          url: layer.url.startsWith('/') ? import.meta.env.BASE_URL + layer.url.substring(1) : layer.url,
          title: layer.hotspots ? layer.hotspots[0].title : 'Unknown Asset'
        });
      }
    });
  });

  const randomSprite = allSprites[Math.floor(Math.random() * allSprites.length)];
  document.getElementById('fr-status').textContent = `RECONSTRUCTING: ${randomSprite.title}`;

  // 2. Load Image
  const img = new Image();
  img.src = randomSprite.url;
  await new Promise(resolve => img.onload = resolve);

  // 3. Simple Grid Logic (e.g. 3x3 or 2x4)
  // We want 6 to 10 parts. Let's do a 3x3 grid (9 parts).
  const rows = 3;
  const cols = 3;
  const pieceWidth = img.width / cols;
  const pieceHeight = img.height / rows;

  // Scale down for UI (max width 400px, max height 400px)
  const maxDim = 400;
  const scale = Math.min(maxDim / img.width, maxDim / img.height);
  const displayW = img.width * scale;
  const displayH = img.height * scale;
  const dispPieceW = pieceWidth * scale;
  const dispPieceH = pieceHeight * scale;

  // Center position for the grid
  const startX = (container.clientWidth - displayW) / 2;
  const startY = (container.clientHeight - displayH) / 2;

  // 4. Create Slots and Pieces
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const targetX = startX + c * dispPieceW;
      const targetY = startY + r * dispPieceH;

      // Create Slot (Visual guide)
      const slot = document.createElement('div');
      slot.className = 'fr-slot';
      slot.style.width = `${dispPieceW}px`;
      slot.style.height = `${dispPieceH}px`;
      slot.style.left = `${targetX}px`;
      slot.style.top = `${targetY}px`;
      container.appendChild(slot);
      slots.push({ x: targetX, y: targetY });

      // Create Piece
      const piece = document.createElement('div');
      piece.className = 'fr-piece';
      piece.id = `piece-${r}-${c}`;
      piece.style.width = `${dispPieceW}px`;
      piece.style.height = `${dispPieceH}px`;
      piece.style.backgroundImage = `url(${randomSprite.url})`;
      piece.style.backgroundSize = `${displayW}px ${displayH}px`;
      piece.style.backgroundPosition = `-${c * dispPieceW}px -${r * dispPieceH}px`;

      // Random initial position
      const randX = Math.random() * (container.clientWidth - dispPieceW);
      const randY = Math.random() * (container.clientHeight - dispPieceH);
      piece.style.left = `${randX}px`;
      piece.style.top = `${randY}px`;
      
      container.appendChild(piece);
      
      const pieceData = {
        el: piece,
        targetX,
        targetY,
        isSnapped: false
      };
      pieces.push(pieceData);
      
      makeDraggable(pieceData);
    }
  }
}

function makeDraggable(pieceData) {
  const el = pieceData.el;
  let isDragging = false;
  let startX, startY;
  let offsetX, offsetY;

  el.addEventListener('pointerdown', (e) => {
    if (pieceData.isSnapped) return;
    isDragging = true;
    offsetX = e.clientX - el.offsetLeft;
    offsetY = e.clientY - el.offsetTop;
    el.setPointerCapture(e.pointerId);
    playSound('select');
  });

  el.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    
    // Check for snap during move (visual hint)
    const dist = Math.hypot(x - pieceData.targetX, y - pieceData.targetY);
    if (dist < 40) {
      el.style.boxShadow = '0 0 30px var(--accent-gold)';
    } else {
      el.style.boxShadow = '0 0 5px rgba(0,0,0,0.5)';
    }
  });

  el.addEventListener('pointerup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    el.releasePointerCapture(e.pointerId);

    const x = parseInt(el.style.left);
    const y = parseInt(el.style.top);
    const dist = Math.hypot(x - pieceData.targetX, y - pieceData.targetY);

    if (dist < 40) {
      // SNAP!
      pieceData.isSnapped = true;
      el.style.left = `${pieceData.targetX}px`;
      el.style.top = `${pieceData.targetY}px`;
      el.classList.add('snapped');
      playSound('matched');
      checkVictory();
    } else {
      playSound('deselect');
    }
  });
}

function checkVictory() {
  const allSnapped = pieces.every(p => p.isSnapped);
  if (allSnapped) {
    playSound('victory');
    document.getElementById('fr-status').textContent = 'RECONSTRUCTION SUCCESSFUL';
    setTimeout(() => {
      document.getElementById('fr-victory-modal').classList.remove('hidden');
    }, 800);
  }
}

// Global Binds
document.addEventListener('DOMContentLoaded', () => {
    const btnPlay = document.getElementById('fr-btn-playagain');
    if (btnPlay) {
      btnPlay.addEventListener('click', () => {
        playSound('click');
        startFragment();
      });
    }
    
    const btnOrbit = document.getElementById('fr-btn-orbit');
    if (btnOrbit) {
      btnOrbit.addEventListener('click', () => {
        playSound('click');
        isGameActive = false;
        document.getElementById('fr-ui').classList.add('hidden');
        
        const view = document.getElementById('diorama-view');
        view.style.opacity = '0';
        
        resetGlobeView();
        
        setTimeout(() => {
          view.classList.add('hidden');
          document.getElementById('bottom-bar').classList.remove('hidden');
          document.getElementById('sidebar-left').classList.remove('hidden');
          document.getElementById('sidebar-right').classList.remove('hidden');
          document.getElementById('top-bar').classList.remove('hidden');
        }, 800);
      });
    }
});
