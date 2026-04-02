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
    console.log('[Intro] Killing intro overlay');
    video.pause();
    video.src = ''; // force stop all video activity
    introContainer.style.display = 'none';
    introContainer.remove();
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
      console.log('[Intro] Video playing, duration:', video.duration);
      
      // METHOD 1: If we know the duration, set a hard timeout
      if (video.duration && isFinite(video.duration)) {
        const ms = video.duration * 1000;
        console.log('[Intro] Setting hard timeout:', ms, 'ms');
        setTimeout(killIntro, ms + 500); // small buffer
      }
      
      // METHOD 2: Poll every second checking video.ended
      const poll = setInterval(() => {
        if (removed) { clearInterval(poll); return; }
        if (video.ended || video.paused) {
          console.log('[Intro] Poll detected video stopped');
          clearInterval(poll);
          killIntro();
        }
      }, 1000);
      
    }).catch(() => killIntro());
  });

  // METHOD 3: Standard ended event
  video.onended = killIntro;
}
