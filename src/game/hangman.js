// src/game/hangman.js
import { dioramaData } from '../data/dioramas.js';
import { resetGlobeView } from '../globe.js';
import { playSound } from '../audio.js';
import { t } from '../i18n.js';

let isGameActive = false;
let mysteryWord = "";
let currentTargetData = null;
let guessedLetters = [];
let chances = 5;
let score = 0;
let wordPool = [];

// Canvas Scrape variables
let canvas, ctx;
let isDrawing = false;
let pixelsRevealed = 0;
let totalPixels = 0;
let revealLocked = false;

const SCRAPE_RADIUS = 25;
const MAX_REVEAL_PERCENT = 0.5; // 50%

export function startHangman() {
    // Close panels if any
    const btn = document.querySelector('#games-panel .close-btn');
    if (btn) btn.click();

    isGameActive = true;
    chances = 5;
    revealLocked = false;
    guessedLetters = [];

    // Hide UI
    document.getElementById('bottom-bar').classList.add('hidden');
    document.getElementById('sidebar-left').classList.add('hidden');
    document.getElementById('sidebar-right').classList.add('hidden');
    document.getElementById('top-bar').classList.add('hidden');

    const view = document.getElementById('diorama-view');
    view.style.opacity = '1';
    view.classList.remove('hidden');

    // Setup backdrop (reuse Sprite Hunter backdrop logic)
    const bgLayerUI = document.querySelector('.bg-layer');
    bgLayerUI.style.backgroundImage = 'none';
    bgLayerUI.style.backgroundColor = '#0a0a12';

    // Reset containers
    document.getElementById('diorama-layers-container').innerHTML = '';
    document.getElementById('diorama-title').textContent = "SCRAPE & GUESS PROTOCOL";
    document.getElementById('sh-ui').classList.add('hidden');
    document.getElementById('nc-ui').classList.add('hidden');
    document.getElementById('fr-ui').classList.add('hidden');
    
    document.getElementById('hm-ui').classList.remove('hidden');
    document.getElementById('hm-victory-modal').classList.add('hidden');

    if (wordPool.length === 0) buildWordPool();
    
    initNewRound();
}

function buildWordPool() {
    wordPool = [];
    Object.values(dioramaData).forEach(island => {
        island.layers.forEach(layer => {
            if (layer.hotspots && layer.hotspots.length > 0) {
                const title = layer.hotspots[0].title.toUpperCase();
                // Basic filtering for Animals and Objects
                const isAnimal = /TIGER|SNAKE|CROCODILE|BIRD|CENDRAWASIH|ALLIGATOR/.test(title);
                const isObject = /BATIK|WAYANG|KEBAYA|FAN|HOUSE|JOGLO|TONGKONAN|HONAI|GADANG|ATTIRE|TRIBE/.test(title);
                
                if (isAnimal || isObject) {
                    wordPool.push({
                        word: title,
                        url: layer.url,
                        island: island.title
                    });
                }
            }
        });
    });
}

function initNewRound() {
    currentTargetData = wordPool[Math.floor(Math.random() * wordPool.length)];
    mysteryWord = currentTargetData.word.replace(/ /g, ""); // Remove spaces for the game logic, but maybe better to keep them as non-guessable
    
    // For display, we'll keep the actual characters but only hide letters
    guessedLetters = [];
    chances = 5;
    revealLocked = false;

    updateUI();
    setupCanvas();
    renderKeyboard();
    renderWord();

    const img = document.getElementById('hm-target-img');
    const resolvedUrl = currentTargetData.url.startsWith('/') 
        ? import.meta.env.BASE_URL + currentTargetData.url.substring(1) 
        : currentTargetData.url;
    img.src = resolvedUrl;
}

function setupCanvas() {
    canvas = document.getElementById('hm-scrape-canvas');
    ctx = canvas.getContext('2d', { willReadFrequently: true });
    
    // Set dimensions
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Fill with black
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add some "digital texture"
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.1)';
    ctx.lineWidth = 1;
    for(let i=0; i<canvas.width; i+=10) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
    }
    for(let j=0; j<canvas.height; j+=10) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(canvas.width, j);
        ctx.stroke();
    }

    totalPixels = canvas.width * canvas.height;
    pixelsRevealed = 0;

    canvas.onmousedown = (e) => { isDrawing = true; scrape(e); };
    canvas.onmousemove = (e) => { if (isDrawing) scrape(e); };
    canvas.onmouseup = () => { isDrawing = false; checkRevealPercentage(); };
    canvas.onmouseleave = () => { isDrawing = false; };

    // Touch support
    canvas.ontouchstart = (e) => { isDrawing = true; scrape(e.touches[0]); };
    canvas.ontouchmove = (e) => { e.preventDefault(); if (isDrawing) scrape(e.touches[0]); };
    canvas.ontouchend = () => { isDrawing = false; checkRevealPercentage(); };
}

let scrapeCount = 0;
function scrape(e) {
    if (revealLocked) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, SCRAPE_RADIUS, 0, Math.PI * 2);
    ctx.fill();

    scrapeCount++;
    if (scrapeCount % 20 === 0) {
        checkRevealPercentage();
    }
}

function checkRevealPercentage() {
    if (revealLocked) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let revealed = 0;
    // Check every 4th pixel (alpha channel)
    for (let i = 3; i < imageData.length; i += 4) {
        if (imageData[i] === 0) revealed++;
    }

    const percent = revealed / (imageData.length / 4);
    if (percent >= MAX_REVEAL_PERCENT) {
        revealLocked = true;
        playSound('wrong'); // Visual cue that scrape is locked
        // Add a red glow to canvas to show it's locked
        canvas.style.boxShadow = "0 0 20px rgba(255, 0, 0, 0.5)";
    }
}

function renderKeyboard() {
    const container = document.getElementById('hm-keyboard');
    container.innerHTML = '';
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    
    letters.forEach(letter => {
        const btn = document.createElement('div');
        btn.className = 'hm-key';
        btn.textContent = letter;
        btn.onclick = () => handleGuess(letter, btn);
        container.appendChild(btn);
    });
}

function handleGuess(letter, btnEl) {
    if (guessedLetters.includes(letter) || chances <= 0) return;

    guessedLetters.push(letter);
    btnEl.classList.add('used');

    if (currentTargetData.word.toUpperCase().includes(letter)) {
        playSound('matched');
        btnEl.classList.add('correct');
        renderWord();
        checkWin();
    } else {
        playSound('wrong');
        btnEl.classList.add('wrong');
        chances--;
        updateUI();
        if (chances <= 0) {
            endGame(false);
        }
    }
}

function renderWord() {
    const display = document.getElementById('hm-word-display');
    const word = currentTargetData.word.toUpperCase();
    
    let html = "";
    for (let char of word) {
        if (char === " ") {
            html += '<span class="hm-space">&nbsp;</span>';
        } else if (guessedLetters.includes(char)) {
            html += `<span class="hm-letter">${char}</span>`;
        } else {
            html += `<span class="hm-letter">_</span>`;
        }
    }
    display.innerHTML = html;
}

function updateUI() {
    document.getElementById('hm-chances').textContent = chances;
    document.getElementById('hm-score').textContent = score;
    
    if (chances <= 1) {
        document.getElementById('hm-chances').style.color = "#ff003c";
    } else {
        document.getElementById('hm-chances').style.color = "white";
    }
}

function checkWin() {
    const word = currentTargetData.word.toUpperCase().replace(/ /g, "");
    const isWon = [...word].every(char => guessedLetters.includes(char));
    
    if (isWon) {
        score += 10;
        endGame(true);
    }
}

function endGame(won) {
    playSound(won ? 'victory' : 'wrong');
    const modal = document.getElementById('hm-victory-modal');
    modal.classList.remove('hidden');
    
    document.getElementById('hm-result-title').textContent = won ? "PROTOCOL CLEAR" : "SYSTEM FAILURE";
    document.getElementById('hm-result-title').style.color = won ? "var(--accent-cyan)" : "#ff003c";
    document.getElementById('hm-result-word').textContent = `The identity was: ${currentTargetData.word.toUpperCase()}`;
}

// Global Binds
document.addEventListener('DOMContentLoaded', () => {
    const btnChange = document.getElementById('hm-btn-change');
    if (btnChange) {
        btnChange.addEventListener('click', () => {
            playSound('click');
            initNewRound();
            document.getElementById('hm-scrape-canvas').style.boxShadow = "none";
        });
    }

    const btnPlay = document.getElementById('hm-btn-playagain');
    if (btnPlay) {
        btnPlay.addEventListener('click', () => {
            playSound('click');
            initNewRound();
            document.getElementById('hm-victory-modal').classList.add('hidden');
            document.getElementById('hm-scrape-canvas').style.boxShadow = "none";
        });
    }

    const btnOrbit = document.getElementById('hm-btn-orbit');
    if (btnOrbit) {
        btnOrbit.addEventListener('click', () => {
            playSound('click');
            isGameActive = false;
            document.getElementById('hm-ui').classList.add('hidden');
            
            const view = document.getElementById('diorama-view');
            view.style.opacity = '0';
            
            resetGlobeView(); 
            
            setTimeout(() => {
                view.classList.add('hidden');
                document.getElementById('bottom-bar').classList.remove('hidden');
                document.getElementById('sidebar-left').classList.remove('hidden');
                document.getElementById('sidebar-right').classList.remove('hidden');
                document.getElementById('top-bar').classList.remove('hidden');
                document.getElementById('diorama-layers-container').innerHTML = '';
            }, 800);
        });
    }
});
