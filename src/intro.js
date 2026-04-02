// src/intro.js

export function initIntroSequence() {
  const introContainer = document.getElementById('cinematic-intro');
  const video = document.getElementById('intro-video');
  const titlesContainer = document.querySelector('.intro-titles');
  const pressBtn = document.getElementById('press-to-soar');
  
  if (!introContainer || !video || !pressBtn) return;
  
  let isVideoPlaying = false;
  let fadeOutTriggered = false;

  // Once video has buffered enough to play smoothly without stalling
  video.addEventListener('canplaythrough', () => {
    if (!isVideoPlaying) {
      pressBtn.classList.remove('hidden');
    }
  });
  
  // If video is instantly ready (like from cache)
  if (video.readyState >= 3) {
    pressBtn.classList.remove('hidden');
  }

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
    video.play().catch(e => console.error("Video play failed:", e));
  });

  // Track the video progress over time
  video.addEventListener('timeupdate', () => {
    // We want to fade out the entire black overlay 2 seconds before the video truly ends
    if (!fadeOutTriggered && video.duration && video.currentTime > 0) {
      if (video.duration - video.currentTime <= 2.0) {
        fadeOutTriggered = true;
        
        // This class triggers the 2s opacity fade in CSS
        introContainer.classList.add('intro-fade-out');
        
        // When CSS finishes fading, physically remove the node to free memory and expose the app
        setTimeout(() => {
          introContainer.remove();
        }, 2000);
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
