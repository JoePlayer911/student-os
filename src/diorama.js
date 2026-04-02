// src/diorama.js
import { dioramaData } from './data/dioramas.js';

let isDioramaActive = false;
let currentDioramaContext = null;

export function initDioramaSystem() {
  const exitBtn = document.getElementById('diorama-exit-btn');
  const view = document.getElementById('diorama-view');
  
  if (exitBtn) {
    exitBtn.addEventListener('click', closeDiorama);
  }

  // Parallax mouse movement
  document.addEventListener('mousemove', (e) => {
    if (!isDioramaActive) return;
    
    // Calculate normalized coords (-1 to 1)
    const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    const mouseY = (e.clientY / window.innerHeight) * 2 - 1;

    // Shift layers
    const layers = document.querySelectorAll('.diorama-layer');
    layers.forEach(layer => {
      const speed = parseFloat(layer.getAttribute('data-speed')) || 0;
      // Closer objects move more
      const moveX = mouseX * speed * -100; // max shift in px
      const moveY = mouseY * speed * -50; 
      
      layer.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  });

  // Touch tracking for smartboards
  document.addEventListener('touchmove', (e) => {
    if (!isDioramaActive || !e.touches || e.touches.length === 0) return;
    const touch = e.touches[0];
    
    const mouseX = (touch.clientX / window.innerWidth) * 2 - 1;
    const mouseY = (touch.clientY / window.innerHeight) * 2 - 1;

    const layers = document.querySelectorAll('.diorama-layer');
    layers.forEach(layer => {
      const speed = parseFloat(layer.getAttribute('data-speed')) || 0;
      const moveX = mouseX * speed * -100;
      const moveY = mouseY * speed * -50;
      
      layer.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  });

  // Setup close button on annotation
  document.getElementById('anno-close').addEventListener('click', () => {
    document.getElementById('diorama-annotation').classList.add('hidden');
  });
}

export function openDiorama(islandId) {
  const data = dioramaData[islandId];
  if (!data) {
    console.warn("No diorama data for:", islandId);
    return;
  }

  isDioramaActive = true;
  const view = document.getElementById('diorama-view');
  const container = document.getElementById('diorama-layers-container');
  const bgLayer = document.querySelector('.bg-layer');
  
  // Set UI
  document.getElementById('diorama-title').textContent = data.title;
  bgLayer.style.backgroundColor = data.bgColor;
  document.getElementById('diorama-annotation').classList.add('hidden');

  // Build layers
  container.innerHTML = '';
  data.layers.forEach(layerData => {
    // If it's the background layer, we just use the global bg layer for simplicity
    if (layerData.id.startsWith('bg-')) {
      if (layerData.url) {
        bgLayer.style.backgroundImage = `url(${layerData.url})`;
        bgLayer.style.backgroundColor = 'transparent';
      } else {
        bgLayer.style.backgroundImage = 'none';
        bgLayer.style.backgroundColor = layerData.colorPlaceholder || data.bgColor;
      }
      return; 
    }

    const layerEl = document.createElement('div');
    layerEl.className = 'diorama-layer';
    layerEl.setAttribute('data-speed', layerData.depth.toString());
    
    // Set position and size
    layerEl.style.width = layerData.width || '100%';
    layerEl.style.height = layerData.height || '100%';
    layerEl.style.top = layerData.top || '0';
    layerEl.style.left = layerData.left || '0';

    if (layerData.url) {
      layerEl.style.backgroundImage = `url(${layerData.url})`;
    } else {
      layerEl.style.backgroundColor = layerData.colorPlaceholder;
      layerEl.style.opacity = '0.7'; // So we can see through overlapping placeholders
    }

    // Add hotspots to this layer
    if (layerData.hotspots) {
      layerData.hotspots.forEach(hs => {
        const hsEl = document.createElement('div');
        hsEl.className = 'diorama-hotspot';
        // Position hotspot locally within the layer
        hsEl.style.width = '60px';
        hsEl.style.height = '60px';
        hsEl.style.top = hs.top;
        hsEl.style.left = hs.left;
        hsEl.style.transform = 'translate(-50%, -50%)'; // center on coord
        
        hsEl.addEventListener('click', (e) => {
          e.stopPropagation();
          showAnnotation(hs.title, hs.desc);
        });
        
        layerEl.appendChild(hsEl);
      });
    }

    container.appendChild(layerEl);
  });

  // Hide main UI, Fade in Diorama
  document.getElementById('bottom-bar').classList.add('hidden');
  document.getElementById('sidebar-left').classList.add('hidden');
  document.getElementById('sidebar-right').classList.add('hidden');
  document.getElementById('top-bar').classList.add('hidden');
  
  view.style.opacity = '0';
  view.classList.remove('hidden');
  
  // Trigger reflow for transition
  void view.offsetWidth;
  view.style.opacity = '1';
}

export function closeDiorama() {
  isDioramaActive = false;
  const view = document.getElementById('diorama-view');
  
  view.style.opacity = '0';
  
  setTimeout(() => {
    view.classList.add('hidden');
    // Restore main UI
    document.getElementById('bottom-bar').classList.remove('hidden');
    document.getElementById('sidebar-left').classList.remove('hidden');
    document.getElementById('sidebar-right').classList.remove('hidden');
    document.getElementById('top-bar').classList.remove('hidden');
    
    document.getElementById('diorama-layers-container').innerHTML = '';
  }, 800); // Wait for fade out
}

function showAnnotation(title, desc) {
  const anno = document.getElementById('diorama-annotation');
  document.getElementById('anno-title').textContent = title;
  document.getElementById('anno-desc').textContent = desc;
  
  anno.classList.remove('hidden');
}
