import { initGlobe, resetGlobeView, updateCoordinateDisplay } from './globe.js';
import { renderSidebars } from './sidebar.js';
import { initBottomBar, updateBottomBar } from './bottom-bar.js';
import { initPanels, openPanel, closeAllPanels } from './panels.js';
import { initDioramaSystem } from './diorama.js';
import { initIntroSequence } from './intro.js';

console.log("Nusantara Explorer OS Initialized.");

document.addEventListener("DOMContentLoaded", () => {
    // 0. Mount the cinematic intro flow
    initIntroSequence();

    // 1. Initialize Panels
    initPanels();

    // 2. Initialize Bottom Bar
    initBottomBar();

    // 3. Initialize Diorama System
    initDioramaSystem();

    // 3. Initialize Sidebars with a callback for actions
    renderSidebars((config) => {
        console.log(`Action dispatched: ${config.action} (${config.payload})`);
        
        if (config.action === 'openPanel') {
            openPanel(config.payload);
        } else if (config.action === 'resetGlobe') {
            resetGlobeView();
            updateBottomBar(null);
            closeAllPanels();
        }
    });

    // 4. Initialize Globe
    initGlobe('globe-container', (islandData) => {
        // When an island is clicked
        updateBottomBar(islandData);
        closeAllPanels(); // close settings etc if open
    });

    // 5. Start Header Coordinates Display
    updateCoordinateDisplay('stat-coord');
});

