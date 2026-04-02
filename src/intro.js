// src/intro.js

export function initIntroSequence() {
  const introContainer = document.getElementById('cinematic-intro');
  const video = document.getElementById('intro-video');
  const blackLayer = document.getElementById('intro-black-layer');
  const titlesContainer = document.querySelector('.intro-titles');
  const pressBtn = document.getElementById('press-to-soar');
  
  if (!introContainer || !video || !pressBtn) return;
  
  let isVideoPlaying = false;
  let removed = false;

  video.loop = false;

  function showButton() {
    if (!isVideoPlaying) {
      pressBtn.classList.remove('hidden');
    }
  }

  function killIntro() {
    if (removed) return;
    removed = true;

    // 1. Kill the video instantly
    video.pause();
    video.src = '';
    video.style.display = 'none';

    // 2. The black layer is now revealed — fade IT out over 1 second
    if (blackLayer) {
      blackLayer.classList.add('fade-out');
      setTimeout(() => {
        introContainer.remove();
      }, 1100);
    } else {
      introContainer.remove();
    }
  }

  video.addEventListener('canplay', showButton);
  video.addEventListener('loadeddata', showButton);
  if (video.readyState >= 2) showButton();
  setTimeout(showButton, 4000);

  introContainer.addEventListener('click', () => {
    if (isVideoPlaying || pressBtn.classList.contains('hidden')) return;
    isVideoPlaying = true;
    titlesContainer.style.display = 'none';
    video.classList.add('video-visible');
    
    video.play().then(() => {
      if (video.duration && isFinite(video.duration)) {
        setTimeout(killIntro, video.duration * 1000 + 500);
      }
      const poll = setInterval(() => {
        if (removed) { clearInterval(poll); return; }
        if (video.ended || video.paused) {
          clearInterval(poll);
          killIntro();
        }
      }, 1000);
    }).catch(() => killIntro());
  });

  video.onended = killIntro;
}
