import Globe from 'globe.gl';
import { islandsData } from './data/islands.js';

let globeInstance = null;
let currentActiveIsland = null;

export function initGlobe(containerId, onIslandSelect) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Initialize Globe
  globeInstance = Globe()(container)
    .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg') // Base map
    .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
    .backgroundColor('rgba(0,0,0,0)') // Transparent to show body background
    .showAtmosphere(true)
    .atmosphereColor('#00f0ff')
    .atmosphereAltitude(0.15);

  // Set initial camera position looking at Indonesia
  globeInstance.pointOfView({ lat: -2.0, lng: 118.0, altitude: 2 }, 1000);

  // Configure auto-rotation
  globeInstance.controls().autoRotate = true;
  globeInstance.controls().autoRotateSpeed = 0.5;
  globeInstance.controls().enableZoom = true;

  // Stop rotation on interaction
  const controls = globeInstance.controls();
  controls.addEventListener('start', () => {
    controls.autoRotate = false;
  });

  // Setup HTML Markers
  globeInstance
    .htmlElementsData(islandsData)
    .htmlElement(d => {
      const el = document.createElement('div');
      el.className = 'marker-container';
      
      const dot = document.createElement('div');
      dot.className = 'marker-dot';
      dot.style.backgroundColor = d.color;
      dot.style.boxShadow = `0 0 10px ${d.color}`;
      
      // Override dot pseudo-element border color via a tiny style injection or just use CSS vars.
      // We will handle it by injecting a style directly to avoid complex CSS manipulation.
      el.innerHTML = `
        <style>
          .marker-${d.id}::after { border: 1px solid ${d.color}; }
        </style>
        <div class="marker-dot marker-${d.id}" style="background-color: ${d.color}; box-shadow: 0 0 10px ${d.color};"></div>
        <div class="marker-label">${d.name}</div>
      `;
      
      el.onclick = (e) => {
        e.stopPropagation();
        focusOnIsland(d);
        if (onIslandSelect) onIslandSelect(d);
      };

      return el;
    });

  // Handle resizing
  window.addEventListener('resize', () => {
    globeInstance.width(window.innerWidth);
    globeInstance.height(window.innerHeight);
  });
}

function focusOnIsland(islandConfig) {
  currentActiveIsland = islandConfig;
  
  // Disable auto rotate
  globeInstance.controls().autoRotate = false;
  
  // Fly to points
  globeInstance.pointOfView({
    lat: islandConfig.lat,
    lng: islandConfig.lng,
    altitude: 0.8
  }, 1000); // 1000ms transition
}

export function resetGlobeView() {
  currentActiveIsland = null;
  globeInstance.pointOfView({ lat: -2.0, lng: 118.0, altitude: 2 }, 1000);
  globeInstance.controls().autoRotate = true;
}

export function updateCoordinateDisplay(elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;
  
  // Update coords based on camera position frequently
  setInterval(() => {
    if (globeInstance) {
      const pov = globeInstance.pointOfView();
      el.innerText = `${pov.lat.toFixed(2)}, ${pov.lng.toFixed(2)}`;
    }
  }, 100);
}
