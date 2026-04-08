// src/game/mancala.js
import { playSound } from '../audio.js';

let ruffle = null;
let player = null;

export async function startMancala() {
    playSound('click');

    // Hide panels
    const gamesPanel = document.getElementById('games-panel');
    if (gamesPanel) gamesPanel.classList.remove('active');

    // Show overlay
    const overlay = document.getElementById('mancala-overlay');
    overlay.classList.remove('hidden');

    // Load Ruffle if not already loaded
    if (!ruffle) {
        await loadRuffle();
    }

    // Create player if not already created
    if (!player) {
        player = ruffle.createPlayer();
        const container = document.getElementById('mancala-game-container');
        container.appendChild(player);
    }

    // Load the SWF
    // Using an absolute path relative to the src/game directory might be tricky in production
    // For now, we'll try to resolve it via Vite's URL import if possible, 
    // but since we're writing the file, let's use a path that works in dev.
    player.load({
        url: "/src/game/mancala.swf",
        parameters: "",
        allowScriptAccess: true,
        autoplay: "on",
        unmuteOverlay: "hidden",
    });
}

async function loadRuffle() {
    return new Promise((resolve, reject) => {
        if (window.RufflePlayer) {
            ruffle = window.RufflePlayer.newest();
            return resolve();
        }
        const script = document.createElement('script');
        script.src = "https://unpkg.com/@ruffle-rs/ruffle";
        script.onload = () => {
            ruffle = window.RufflePlayer.newest();
            resolve();
        };
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

export function closeMancala() {
    playSound('click');
    const overlay = document.getElementById('mancala-overlay');
    overlay.classList.add('hidden');

    // Stop the player
    if (player) {
        player.pause();
    }
}

// Global Binds
document.addEventListener('DOMContentLoaded', () => {
    const exitBtn = document.getElementById('mancala-exit-btn');
    if (exitBtn) {
        exitBtn.addEventListener('click', closeMancala);
    }

    const howBtn = document.getElementById('mancala-how-btn');
    if (howBtn) {
        howBtn.addEventListener('click', () => {
            playSound('click');
            document.getElementById('mancala-help-modal').classList.remove('hidden');
        });
    }

    const closeHelpBtn = document.getElementById('mancala-close-help');
    if (closeHelpBtn) {
        closeHelpBtn.addEventListener('click', () => {
            playSound('click');
            document.getElementById('mancala-help-modal').classList.add('hidden');
        });
    }
});
