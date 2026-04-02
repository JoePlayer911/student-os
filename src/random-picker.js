// src/random-picker.js
// Random number picker that remembers previously chosen numbers

let maxNumber = 30; // default
let pickedNumbers = [];
let isAnimating = false;

export function initRandomPicker(panelContentEl) {
  renderPickerUI(panelContentEl);
}

function renderPickerUI(container) {
  container.innerHTML = `
    <div class="picker-wrapper">
      <div class="picker-display-area">
        <div class="picker-result" id="picker-result">?</div>
        <div class="picker-subtitle" id="picker-subtitle">TAP TO ROLL</div>
      </div>

      <div class="picker-controls">
        <div class="picker-range-row">
          <label class="picker-label">RANGE: 1 to</label>
          <input type="number" id="picker-max" class="picker-input" value="${maxNumber}" min="2" max="999" />
        </div>
        
        <div class="picker-stats" id="picker-stats">
          <span>REMAINING: <strong id="picker-remaining">${maxNumber}</strong></span>
          <span>PICKED: <strong id="picker-picked-count">0</strong></span>
        </div>
      </div>

      <div class="picker-buttons">
        <button class="picker-btn picker-btn-roll" id="picker-roll-btn">🎲 ROLL</button>
        <button class="picker-btn picker-btn-reset" id="picker-reset-btn">↺ RESET</button>
      </div>

      <div class="picker-history" id="picker-history">
        <div class="picker-label">HISTORY</div>
        <div class="picker-history-list" id="picker-history-list">—</div>
      </div>
    </div>
  `;

  // Bind events
  document.getElementById('picker-roll-btn').addEventListener('click', rollNumber);
  document.getElementById('picker-reset-btn').addEventListener('click', resetPicker);
  document.getElementById('picker-max').addEventListener('change', (e) => {
    const val = parseInt(e.target.value);
    if (val >= 2 && val <= 999) {
      maxNumber = val;
      resetPicker();
    }
  });
}

function rollNumber() {
  if (isAnimating) return;

  const available = [];
  for (let i = 1; i <= maxNumber; i++) {
    if (!pickedNumbers.includes(i)) available.push(i);
  }

  if (available.length === 0) {
    const result = document.getElementById('picker-result');
    const subtitle = document.getElementById('picker-subtitle');
    result.textContent = '—';
    subtitle.textContent = 'ALL NUMBERS USED. RESET!';
    subtitle.style.color = 'var(--accent-alert)';
    return;
  }

  // Animate the roll
  isAnimating = true;
  const result = document.getElementById('picker-result');
  const subtitle = document.getElementById('picker-subtitle');
  const rollBtn = document.getElementById('picker-roll-btn');
  rollBtn.disabled = true;

  let ticks = 0;
  const totalTicks = 15;
  const interval = setInterval(() => {
    // Show random flash numbers during animation
    const flashNum = available[Math.floor(Math.random() * available.length)];
    result.textContent = flashNum;
    result.classList.add('picker-flash');
    ticks++;

    if (ticks >= totalTicks) {
      clearInterval(interval);
      // Pick the final number
      const finalIndex = Math.floor(Math.random() * available.length);
      const chosen = available[finalIndex];
      pickedNumbers.push(chosen);

      result.textContent = chosen;
      result.classList.remove('picker-flash');
      result.classList.add('picker-pop');
      setTimeout(() => result.classList.remove('picker-pop'), 400);

      subtitle.textContent = `NUMBER ${chosen} SELECTED`;
      subtitle.style.color = 'var(--accent-gold)';

      updatePickerStats();
      rollBtn.disabled = false;
      isAnimating = false;
    }
  }, 60);
}

function resetPicker() {
  pickedNumbers = [];
  const result = document.getElementById('picker-result');
  const subtitle = document.getElementById('picker-subtitle');
  result.textContent = '?';
  subtitle.textContent = 'TAP TO ROLL';
  subtitle.style.color = 'var(--text-muted)';
  updatePickerStats();
}

function updatePickerStats() {
  const remaining = maxNumber - pickedNumbers.length;
  document.getElementById('picker-remaining').textContent = remaining;
  document.getElementById('picker-picked-count').textContent = pickedNumbers.length;

  const historyList = document.getElementById('picker-history-list');
  if (pickedNumbers.length === 0) {
    historyList.textContent = '—';
  } else {
    historyList.textContent = pickedNumbers.join(', ');
  }
}
