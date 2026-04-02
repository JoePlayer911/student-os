// src/intro.js

export function initIntroSequence() {
  const introContainer = document.getElementById('cinematic-intro');
  const video = document.getElementById('intro-video');
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
    video.pause();
    introContainer.style.display = 'none';
    introContainer.remove();
  }

  video.addEventListener('canplay', showButton);
  video.addEventListener('canplaythrough', showButton);
  video.addEventListener('loadeddata', showButton);
  if (video.readyState >= 2) showButton();
  setTimeout(showButton, 4000);

  introContainer.addEventListener('click', () => {
    if (isVideoPlaying || pressBtn.classList.contains('hidden')) return;
    isVideoPlaying = true;
    titlesContainer.style.opacity = '0';
    video.classList.add('video-visible');
    video.play().catch(() => killIntro());
  });

  video.addEventListener('ended', killIntro);

  // Polling failsafe
  video.addEventListener('playing', () => {
    const id = setInterval(() => {
      if (removed || video.ended) { clearInterval(id); killIntro(); }
    }, 500);
  });
}
