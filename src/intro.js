// src/intro.js

export function initIntroSequence() {
  const introContainer = document.getElementById('cinematic-intro');
  const video = document.getElementById('intro-video');
  const titlesContainer = document.querySelector('.intro-titles');
  const pressBtn = document.getElementById('press-to-soar');
  
  if (!introContainer || !video || !pressBtn) return;
  
  let isVideoPlaying = false;
  let fadeOutTriggered = false;

  // Ensure no looping
  video.loop = false;

  function showButton() {
    if (!isVideoPlaying) {
      pressBtn.classList.remove('hidden');
    }
  }

  function fadeOutAndReveal() {
    if (fadeOutTriggered) return;  // Only ever run once
    fadeOutTriggered = true;
    
    // Pause the video to stop any further playback
    video.pause();
    
    // CSS class triggers a 2s opacity fade
    introContainer.classList.add('intro-fade-out');
    
    // After CSS fade completes, nuke the entire intro container
    setTimeout(() => {
      introContainer.remove();
    }, 2100);
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
    
    // Play video
    video.play().catch(e => {
      console.error("Video play failed:", e);
      // If video totally fails to play, just skip to main app
      fadeOutAndReveal();
    });
  });

  // PRIMARY: Track video progress via timeupdate
  video.addEventListener('timeupdate', () => {
    if (fadeOutTriggered) return;
    
    // Check if we know the duration and are near the end
    if (video.duration && isFinite(video.duration) && video.currentTime > 0) {
      if (video.duration - video.currentTime <= 2.0) {
        fadeOutAndReveal();
      }
    }
  });
  
  // SECONDARY: Video naturally ended
  video.addEventListener('ended', () => {
    fadeOutAndReveal();
  });

  // TERTIARY: Use a polling interval as absolute failsafe
  // Check every 500ms once the video starts playing
  video.addEventListener('playing', () => {
    const checkInterval = setInterval(() => {
      if (fadeOutTriggered) {
        clearInterval(checkInterval);
        return;
      }
      if (video.ended) {
        clearInterval(checkInterval);
        fadeOutAndReveal();
        return;
      }
      if (video.duration && isFinite(video.duration) && video.currentTime > 0) {
        if (video.duration - video.currentTime <= 2.0) {
          clearInterval(checkInterval);
          fadeOutAndReveal();
        }
      }
    }, 500);
  });
}
