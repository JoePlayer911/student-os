// src/intro.js

export function initIntroSequence() {
  const introContainer = document.getElementById('cinematic-intro');
  const video = document.getElementById('intro-video');
  const titlesContainer = document.querySelector('.intro-titles');
  const pressBtn = document.getElementById('press-to-soar');
  
  if (!introContainer || !video || !pressBtn) return;
  
  let isVideoPlaying = false;
  let fadeOutTriggered = false;

  function showButton() {
    if (!isVideoPlaying) {
      pressBtn.classList.remove('hidden');
    }
  }

  // Multiple events to maximize the chance of catching readiness
  video.addEventListener('canplay', showButton);
  video.addEventListener('canplaythrough', showButton);
  video.addEventListener('loadeddata', showButton);
  
  // If video is instantly ready (e.g. from cache)
  if (video.readyState >= 2) {
    showButton();
  }
  
  // FALLBACK: If nothing fires after 4 seconds, show button anyway
  // The video can stream; it doesn't need to be fully buffered to play
  setTimeout(showButton, 4000);

  // Handle the user click anywhere on screen
  introContainer.addEventListener('click', () => {
    if (isVideoPlaying || pressBtn.classList.contains('hidden')) return;
    
    // User triggered start!
    isVideoPlaying = true;
    
    // Fade out textual titles
    titlesContainer.style.opacity = '0';
    
    // Make video visible
    video.classList.add('video-visible');
    
    // Play video (now legally permitted because of the click gesture)
    video.play().catch(e => {
      console.error("Video play failed:", e);
      // If video totally fails to play, just skip to main app
      introContainer.classList.add('intro-fade-out');
      setTimeout(() => introContainer.remove(), 2000);
    });
  });

  // Track the video progress over time
  video.addEventListener('timeupdate', () => {
    if (!fadeOutTriggered && video.duration && video.currentTime > 0) {
      if (video.duration - video.currentTime <= 2.0) {
        fadeOutTriggered = true;
        introContainer.classList.add('intro-fade-out');
        setTimeout(() => introContainer.remove(), 2000);
      }
    }
  });
  
  // Fallback in case of slow math or unexpected end
  video.addEventListener('ended', () => {
     if (!fadeOutTriggered) {
        introContainer.classList.add('intro-fade-out');
        setTimeout(() => introContainer.remove(), 2000);
     }
  });
}
