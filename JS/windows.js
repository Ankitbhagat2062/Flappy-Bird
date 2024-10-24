window.addEventListener('message', function(event) {
    if (event.data.type === 'toggleAudio') {
      // Toggle audio based on received message
      const audio = document.getElementById(event.data.audioId);
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    } else if (event.data.type === 'setVolume') {
      // Set volume based on received message
      const audio = document.getElementById(event.data.audioId);
      audio.volume = event.data.volume;
    }
  });
  