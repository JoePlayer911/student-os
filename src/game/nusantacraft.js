// src/game/nusantacraft.js
import { dioramaData } from '../data/dioramas.js';
import { openDiorama } from '../diorama.js';

let currentGameIslandId = null;
let currentDraggedItem = null;
let remainingItems = 0;

export function startNusantacraft() {
  const islands = Object.keys(dioramaData);
  const randomIsland = islands[Math.floor(Math.random() * islands.length)];
  currentGameIslandId = randomIsland;
  
  // Close the panels
  const btn = document.querySelector('#games-panel .close-btn');
  if (btn) btn.click();
  
  // Launch Diorama in Game Mode
  openDiorama(randomIsland, true); // true = gameMode
  
  // Build the UI
  document.getElementById('nc-ui').classList.remove('hidden');
  document.getElementById('nc-victory-modal').classList.add('hidden');
  
  buildInventory(randomIsland);
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
  Object.values(dioramaData).forEach(island => {
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
    
    // Bind generic pointer events
    bindDragEvents(sprite);
    
    slot.appendChild(sprite);
    track.appendChild(slot);
  });
}

function bindDragEvents(el) {
  let initialX, initialY;
  let offsetX = 0, offsetY = 0;
  
  el.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    el.setPointerCapture(e.pointerId);
    
    const rect = el.getBoundingClientRect();
    // Remember initial position in the tray
    el.setAttribute('data-origin-x', rect.left);
    el.setAttribute('data-origin-y', rect.top);
    
    // Switch to absolute positioning at the document level
    el.style.position = 'fixed';
    el.style.left = rect.left + 'px';
    el.style.top = rect.top + 'px';
    el.style.zIndex = 1000;
    
    // Store where user grabbed the element relative to its top-left
    initialX = e.clientX;
    initialY = e.clientY;
    
    // Move to body so it escapes the overflow-x hidden/scroll tray!
    document.body.appendChild(el);
  });
  
  el.addEventListener('pointermove', (e) => {
    if (!el.hasPointerCapture(e.pointerId)) return;
    
    const dx = e.clientX - initialX;
    const dy = e.clientY - initialY;
    
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  });
  
  el.addEventListener('pointerup', (e) => {
    el.releasePointerCapture(e.pointerId);
    
    // Check intersection with any drop zones
    const dropZones = document.querySelectorAll('.nc-drop-target');
    const spriteRect = el.getBoundingClientRect();
    
    let droppedZone = null;
    dropZones.forEach(zone => {
      const zRect = zone.getBoundingClientRect();
      // Basic overlapping box detection
      if (!(spriteRect.right < zRect.left || 
            spriteRect.left > zRect.right || 
            spriteRect.bottom < zRect.top || 
            spriteRect.top > zRect.bottom)) {
        droppedZone = zone;
      }
    });
    
    if (droppedZone) {
      // Validate
      const requiredUrl = droppedZone.getAttribute('data-expected-url');
      const droppedUrl = el.getAttribute('data-url');
      
      if (requiredUrl === droppedUrl) {
        // Success!
        handleSuccess(el, droppedZone);
      } else {
        // Fail
        handleFail(el);
      }
    } else {
      // Return to tray
      returnToTray(el);
    }
  });
}

function handleSuccess(spriteEl, dropZoneEl) {
  // Turn the drop zone into the actual visual sprite layer
  dropZoneEl.className = 'diorama-layer'; 
  dropZoneEl.style.animation = 'none';
  dropZoneEl.style.border = 'none';
  dropZoneEl.innerHTML = ''; // clear hint text
  dropZoneEl.style.background = 'transparent';
  
  const resolvedUrl = spriteEl.style.backgroundImage;
  dropZoneEl.style.backgroundImage = resolvedUrl;
  
  // Destroy dragged sprite
  spriteEl.remove();
  
  // Decrement
  remainingItems--;
  if (remainingItems <= 0) {
    showVictory();
  }
}

function handleFail(spriteEl) {
  showToast("Hmm, that doesn't seem to belong there...");
  returnToTray(spriteEl);
}

function returnToTray(el) {
  // Find an empty slot
  const emptySlot = Array.from(document.querySelectorAll('.nc-slot')).find(s => s.children.length === 0);
  if (emptySlot) {
    el.style.position = 'relative';
    el.style.left = '0';
    el.style.top = '0';
    el.style.transform = 'none';
    el.style.zIndex = '1';
    emptySlot.appendChild(el);
  } else {
    el.remove(); // Failsafe
  }
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
      document.getElementById('nc-inventory-wrapper').classList.remove('hidden');
      startNusantacraft();
    });
  }
  
  const btnOrbit = document.getElementById('nc-btn-orbit');
  if (btnOrbit) {
    btnOrbit.addEventListener('click', () => {
      document.getElementById('nc-ui').classList.add('hidden');
      document.getElementById('diorama-exit-btn').click(); // trigger natural exit
    });
  }
});
