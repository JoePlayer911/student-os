import { openDiorama } from './diorama.js';

let currentSelectedIslandId = null;

export function initBottomBar() {
  const btn = document.getElementById('bottom-action-btn');
  btn.onclick = () => {
    if (currentSelectedIslandId) {
      openDiorama(currentSelectedIslandId);
    }
  };
}

export function updateBottomBar(islandData) {
  const title = document.getElementById('bottom-title');
  const pop = document.getElementById('bottom-pop');
  const area = document.getElementById('bottom-area');
  const actionBtn = document.getElementById('bottom-action-btn');

  if (islandData) {
    currentSelectedIslandId = islandData.id;
    title.innerText = islandData.name;
    title.style.color = islandData.color;
    pop.innerText = islandData.population || "--";
    area.innerText = islandData.area || "--";
    
    actionBtn.disabled = false;
    actionBtn.style.backgroundColor = islandData.color;
  } else {
    currentSelectedIslandId = null;
    title.innerText = "Awaiting Input";
    title.style.color = "var(--accent-gold)";
    pop.innerText = "--";
    area.innerText = "--";
    
    actionBtn.disabled = true;
    actionBtn.style.backgroundColor = "var(--accent-gold)";
  }
}
