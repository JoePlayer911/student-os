import { initRandomPicker } from './random-picker.js';
import { initVocabSystem } from './vocabulary.js';
import { startNusantacraft } from './game/nusantacraft.js';
import { startSpriteHunter } from './game/spritehunter.js';
import { setGlobeTexture } from './globe.js';
import { setLanguage } from './i18n.js';

export function initPanels() {
    const container = document.getElementById('panels-container');

    // Create Settings Panel
    createPanel(container, 'settings-panel', `<span data-i18n="panel-settings">SYSTEM SETTINGS</span>`, `
        <div style="font-family: var(--font-body); color: var(--text-main);">
            <div style="margin-bottom: 20px;">
                <label data-i18n="label-sys-lang" style="display: block; margin-bottom: 5px; color: var(--accent-gold); font-size: 1.1rem;">SYSTEM LANGUAGE</label>
                <select id="sys-language-select" style="width: 100%; padding: 8px; background: rgba(0,0,0,0.5); color: var(--accent-cyan); border: 1px solid var(--accent-cyan); font-family: var(--font-body); font-size: 1rem;">
                    <option value="en">English</option>
                    <option value="id">Bahasa Indonesia</option>
                    <option value="zh">简体中文 (Simplified Mandarin)</option>
                    <option value="zh-tw">繁體中文 (Traditional Mandarin)</option>
                </select>
            </div>
            
            <div style="margin-bottom: 20px;">
                <label data-i18n="label-disp-scale" style="display: block; margin-bottom: 5px; color: var(--accent-gold); font-size: 1.1rem;">DISPLAY UI SCALE</label>
                <input type="range" id="ui-scale-slider" min="0.1" max="2.5" step="0.1" value="1" style="width: 100%;">
            </div>
            
            <div style="margin-bottom: 20px;">
                <label data-i18n="label-audio-output" style="display: block; margin-bottom: 5px; color: var(--accent-gold); font-size: 1.1rem;">AUDIO OUTPUT</label>
                <input type="range" min="0" max="100" value="50" style="width: 100%;">
            </div>
            <div style="margin-bottom: 20px;">
                <label data-i18n="label-globe-skin" style="display: block; margin-bottom: 5px; color: var(--accent-gold); font-size: 1.1rem;">GLOBE SKIN</label>
                <select id="globe-texture-select" style="width: 100%; padding: 8px; background: rgba(0,0,0,0.5); color: var(--accent-cyan); border: 1px solid var(--accent-cyan); font-family: var(--font-body); font-size: 1rem;">
                    <option value="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg" data-i18n="opt-classic-blue">Classic Blue Marble</option>
                    <option value="//unpkg.com/three-globe/example/img/earth-day.jpg" data-i18n="opt-bright-day">Bright Daylight View</option>
                </select>
            </div>
             <div>
                <label data-i18n="label-disp-calib" style="display: block; margin-bottom: 5px; color: var(--accent-gold); font-size: 1.1rem;">DISPLAY CALIBRATION</label>
                <button data-i18n="btn-recalibrate" style="padding: 12px 18px; font-size: 1rem; background: rgba(0, 240, 255, 0.2); border: 1px solid var(--accent-cyan); color: white; cursor: pointer;">Recalibrate Touchscreen</button>
            </div>
        </div>
    `);

    // Create Random Picker Panel (wider)
    createPanel(container, 'random-panel', `<span data-i18n="panel-random">RANDOM NUMBER PICKER</span>`, `<div id="random-picker-content"></div>`, '500px');
    
    // Initialize the picker into the panel
    const pickerContent = document.getElementById('random-picker-content');
    initRandomPicker(pickerContent);

    // Create Vocabulary Panel
    createPanel(container, 'vocab-panel', `<span data-i18n="panel-vocab">VOCABULARY BOOK</span>`, `<div id="vocab-content-area"></div>`, '500px');
    initVocabSystem('vocab-content-area');

    // Initialize Settings Event Listeners
    const langSelect = document.getElementById('sys-language-select');
    if (langSelect) {
        langSelect.addEventListener('change', (e) => {
            setLanguage(e.target.value);
        });
    }

    const scaleSlider = document.getElementById('ui-scale-slider');
    if (scaleSlider) {
        scaleSlider.addEventListener('input', (e) => {
            document.documentElement.style.fontSize = `${e.target.value * 100}%`;
        });
    }

    const textureSelect = document.getElementById('globe-texture-select');
    if (textureSelect) {
        textureSelect.addEventListener('change', (e) => {
            setGlobeTexture(e.target.value);
        });
    }

    // Create Info Panel
    createPanel(container, 'info-panel', `<span data-i18n="panel-info">INFO MODULE</span>`, `
        <div style="padding: 20px; font-family: var(--font-body); color: var(--text-main); line-height: 1.6;">
            <div style="margin-bottom: 20px; border-left: 4px solid var(--accent-gold); padding-left: 15px; background: rgba(212, 175, 55, 0.05); padding-top: 10px; padding-bottom: 10px;">
                <label style="display: block; color: var(--accent-gold); font-family: var(--font-scifi); font-size: 0.75rem; letter-spacing: 2px; margin-bottom: 4px; opacity: 0.8;">DEVELOPER</label>
                <div style="font-size: 1.2rem; font-weight: 600; letter-spacing: 0.5px;">Jonathan Ie</div>
            </div>
            
            <div style="margin-bottom: 20px; border-left: 4px solid var(--accent-cyan); padding-left: 15px; background: rgba(0, 240, 255, 0.05); padding-top: 10px; padding-bottom: 10px;">
                <label style="display: block; color: var(--accent-cyan); font-family: var(--font-scifi); font-size: 0.75rem; letter-spacing: 2px; margin-bottom: 4px; opacity: 0.8;">INSPIRATION</label>
                <div style="font-size: 1.1rem;">Arknights UI/UX Design</div>
            </div>

            <div style="margin-bottom: 20px; border-left: 4px solid var(--text-muted); padding-left: 15px; background: rgba(255, 255, 255, 0.03); padding-top: 10px; padding-bottom: 10px;">
                <label style="display: block; color: var(--text-muted); font-family: var(--font-scifi); font-size: 0.75rem; letter-spacing: 2px; margin-bottom: 4px; opacity: 0.8;">LOADING SEQUENCE</label>
                <div style="font-size: 1rem;">Glider scene from <span style="font-style: italic; color: var(--accent-gold);">IMHHW</span></div>
            </div>

            <div style="margin-top: 30px; padding: 15px; background: rgba(255, 255, 255, 0.05); border-radius: 4px; font-size: 0.8rem; color: var(--text-muted); text-align: center; border: 1px dashed rgba(255, 255, 255, 0.1); font-family: var(--font-scifi);">
                NUSANTARA EXPLORER<br>
                <span style="font-size: 0.7rem; opacity: 0.6;">SYSTEM VERSION 1.0.4-STABLE</span>
            </div>
        </div>
    `);

    // Create generic placeholders for others
    ['archive-panel', 'mission-panel'].forEach(id => {
        const title = id.replace('-panel', '').toUpperCase();
        createPanel(container, id, `${title} MODULE`, `
             <div style="text-align: center; padding: 40px; font-family: var(--font-scifi); color: var(--text-muted);">
                <div style="font-size: 3rem; margin-bottom: 20px; color: var(--accent-gold);">⚠</div>
                <div style="font-size: 1.2rem;" data-i18n="module-offline">MODULE OFFLINE</div>
                <div style="font-size: 0.9rem; margin-top: 10px;" data-i18n="module-slated">Slated for deployment in Milestone 2/3</div>
             </div>
        `);
    });

    // Create Games Panel for Nusantacraft
    createPanel(container, 'games-panel', `<span data-i18n="panel-games">GAMES MODULE</span>`, `
        <div style="text-align: center; padding: 20px; font-family: var(--font-scifi);">
            <div style="font-size: 3rem; margin-bottom: 10px;">🎮</div>
            <button id="btn-launch-nusantacraft" data-i18n="btn-nc-launch" style="padding: 15px 30px; font-size: 1.2rem; background: var(--accent-cyan); color: #000; border: none; cursor: pointer; font-weight: bold; border-radius: 8px; font-family: var(--font-scifi); width: 100%; margin-bottom: 15px;">NUSANTACRAFT EXPEDITION</button>
            
            <h2 style="color: var(--accent-gold); margin-bottom: 20px; margin-top: 30px;" data-i18n="title-sh">SPRITE HUNTER</h2>
            <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 30px;" data-i18n="desc-sh">
                Identify the correct moving items by their cultural names. Do not hit the wrong targets!
            </p>
            <button id="btn-launch-spritehunter" data-i18n="btn-sh-launch" style="padding: 15px 30px; font-size: 1.2rem; background: var(--accent-gold); color: #000; border: none; cursor: pointer; font-weight: bold; border-radius: 8px; font-family: var(--font-scifi); width: 100%;">SPRITE HUNTER PROTOCOL</button>
        </div>
    `);

    // Ensure the dom is attached before querying
    setTimeout(() => {
        const launchBtnNC = document.getElementById('btn-launch-nusantacraft');
        if (launchBtnNC) launchBtnNC.addEventListener('click', startNusantacraft);
        
        const launchBtnSH = document.getElementById('btn-launch-spritehunter');
        if (launchBtnSH) launchBtnSH.addEventListener('click', startSpriteHunter);
    }, 100);
}

function createPanel(container, id, title, contentHTML, width = '400px') {
    const el = document.createElement('div');
    el.className = 'panel';
    el.id = id;
    
    // Position it centrally by default (CSS handles this now)
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
    }
}

export function closeAllPanels() {
    const panels = document.querySelectorAll('.panel');
    panels.forEach(p => {
        p.classList.remove('active');
    });
}
