import { initRandomPicker } from './random-picker.js';
import { initVocabSystem } from './vocabulary.js';

export function initPanels() {
    const container = document.getElementById('panels-container');

    // Create Settings Panel
    createPanel(container, 'settings-panel', 'SYSTEM SETTINGS', `
        <div style="font-family: var(--font-body); color: var(--text-main);">
            <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 5px; color: var(--accent-gold); font-size: 1.1rem;">DISPLAY UI SCALE</label>
                <input type="range" id="ui-scale-slider" min="0.8" max="2.5" step="0.1" value="1" style="width: 100%;">
            </div>
            
            <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 5px; color: var(--accent-gold); font-size: 1.1rem;">AUDIO OUTPUT</label>
                <input type="range" min="0" max="100" value="50" style="width: 100%;">
            </div>
             <div>
                <label style="display: block; margin-bottom: 5px; color: var(--accent-gold); font-size: 1.1rem;">DISPLAY CALIBRATION</label>
                <button style="padding: 12px 18px; font-size: 1rem; background: rgba(0, 240, 255, 0.2); border: 1px solid var(--accent-cyan); color: white; cursor: pointer;">Recalibrate Touchscreen</button>
            </div>
        </div>
    `);

    // Create Random Picker Panel (wider)
    createPanel(container, 'random-panel', 'RANDOM NUMBER PICKER', `<div id="random-picker-content"></div>`, '500px');
    
    // Initialize the picker into the panel
    const pickerContent = document.getElementById('random-picker-content');
    initRandomPicker(pickerContent);

    // Create Vocabulary Panel
    createPanel(container, 'vocab-panel', 'VOCABULARY BOOK', `<div id="vocab-content-area"></div>`, '500px');
    initVocabSystem('vocab-content-area');

    // Initialize Settings Event Listeners
    const scaleSlider = document.getElementById('ui-scale-slider');
    if (scaleSlider) {
        scaleSlider.addEventListener('input', (e) => {
            document.documentElement.style.fontSize = `${e.target.value * 100}%`;
        });
    }

    // Create generic placeholders for others
    ['games-panel', 'info-panel', 'archive-panel', 'mission-panel'].forEach(id => {
        const title = id.replace('-panel', '').toUpperCase();
        createPanel(container, id, `${title} MODULE`, `
             <div style="text-align: center; padding: 40px; font-family: var(--font-scifi); color: var(--text-muted);">
                <div style="font-size: 3rem; margin-bottom: 20px; color: var(--accent-gold);">⚠</div>
                <div style="font-size: 1.2rem;">MODULE OFFLINE</div>
                <div style="font-size: 0.9rem; margin-top: 10px;">Slated for deployment in Milestone 2/3</div>
             </div>
        `);
    });
}

function createPanel(container, id, title, contentHTML, width = '400px') {
    const el = document.createElement('div');
    el.className = 'panel';
    el.id = id;
    
    // Position it centrally by default
    el.style.top = '50%';
    el.style.left = '50%';
    el.style.transform = 'translate(-50%, -40%)';
    el.style.width = width;

    el.innerHTML = `
        <div class="panel-header">
            <span>${title}</span>
            <button class="close-btn">&times;</button>
        </div>
        <div class="panel-content">
            ${contentHTML}
        </div>
    `;

    el.querySelector('.close-btn').addEventListener('click', () => {
        closeAllPanels();
    });

    container.appendChild(el);
}

export function openPanel(panelId) {
    closeAllPanels();
    const panel = document.getElementById(panelId);
    if (panel) {
        panel.classList.add('active');
        // Hacky way to fix translation state from active class in main CSS if needed
        panel.style.transform = 'translate(-50%, -50%)'; 
    }
}

export function closeAllPanels() {
    const panels = document.querySelectorAll('.panel');
    panels.forEach(p => {
        p.classList.remove('active');
        p.style.transform = 'translate(-50%, -40%)';
    });
}
