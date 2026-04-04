// src/vocabulary.js
import { vocabularyData as vocabData } from './data/vocab.js';
import { currentLanguage } from './i18n.js';

export function initVocabSystem(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Group by category
  const categories = {};
  vocabData.forEach(item => {
    if (!categories[item.category]) categories[item.category] = [];
    categories[item.category].push(item);
  });

  // Build HTML
  let html = `<div class="vocab-wrapper">`;
  html += `
    <div class="vocab-header">
      <input type="text" id="vocab-search" placeholder="Search words..." />
    </div>
    <div class="vocab-list" id="vocab-list">
  `;

  for (const [category, items] of Object.entries(categories)) {
    html += `<div class="vocab-category-title">${category}</div>`;
    items.forEach(item => {
      const chnDisplay = currentLanguage === 'zh' ? item.chs : item.cht;
      html += `
        <div class="vocab-item" data-search="${item.idn.toLowerCase()} ${item.eng.toLowerCase()} ${chnDisplay}">
          <div class="vocab-content">
            <div class="vocab-lang-row"><span class="lang-tag idn">IDN</span> <span class="vocab-text vocab-idn">${item.idn}</span></div>
            <div class="vocab-lang-row"><span class="lang-tag eng">ENG</span> <span class="vocab-text vocab-eng">${item.eng}</span></div>
            <div class="vocab-lang-row"><span class="lang-tag chn">CHN</span> <span class="vocab-text vocab-chn">${chnDisplay}</span></div>
            <div class="vocab-desc">${item.desc}</div>
          </div>
          <button class="vocab-speak-btn" data-word="${item.idn}">🔊</button>
        </div>
      `;
    });
  }

  html += `</div></div>`;
  container.innerHTML = html;

  // Bind audio buttons
  const speakBtns = container.querySelectorAll('.vocab-speak-btn');
  speakBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const word = e.currentTarget.getAttribute('data-word');
      speakIndonesian(word);
    });
  });

  // Bind Search
  const searchInput = document.getElementById('vocab-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      const items = container.querySelectorAll('.vocab-item');
      items.forEach(el => {
        const text = el.getAttribute('data-search');
        if (text.includes(query)) {
          el.style.display = 'flex';
        } else {
          el.style.display = 'none';
        }
      });
    });
  }
}

function speakIndonesian(text) {
  if (!window.speechSynthesis) {
    console.warn("Text-to-Speech not supported in this browser.");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "id-ID"; // Indonesian Locale
  utterance.rate = 0.9;     // Slightly slower for learning
  utterance.pitch = 1.0;
  
  // Cancel any ongoing speech to prevent queues
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}
