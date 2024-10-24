let hoverMusic = document.getElementById('hoverMusic');
let isHoverMusicPlaying = false;
// Function to play hover music
let isMusicPlaying = false; // Variable to track if any music is currently playing
// Function to play hover music
function playHoverMusic() {
    if (!isMusicPlaying) { // Check if any music is currently playing
        const hoverMusic = document.getElementById('hoverMusic');
        hoverMusic.play();
    }
}
// Function to stop hover music
function stopHoverMusic() {
    const hoverMusic = document.getElementById('hoverMusic');
    hoverMusic.pause();
}
// Function to play any other music
function playMusic(musicId) {
    stopHoverMusic(); // Stop hover music if it's playing
    const music = document.getElementById(musicId);
    music.play();
    isMusicPlaying = true; // Set isMusicPlaying to true when any music starts playing
}
// Function to stop any other music
function stopMusic(musicId) {
    const music = document.getElementById(musicId);
    music.pause();
    isMusicPlaying = false; // Set isMusicPlaying to false when any music stops playing
}
// Play background music
playMusic('backgroundMusic');
// Stop background music
stopMusic('backgroundMusic');
// Function to pause hover music
function pauseHoverMusic() {
    const hoverMusic = document.getElementById('hoverMusic');
    hoverMusic.pause();
}
// Add event listener for mouseover on body
document.body.addEventListener('mouseover', playHoverMusic);
// Function to pause hover music when other music or sound plays
function pauseHoverOnSoundPlay() {
    pauseHoverMusic();
}
// Add event listeners to other audio elements for game sounds
const gameMusic = document.getElementById('gameMusic');
gameMusic.addEventListener('play', pauseHoverOnSoundPlay);
gameMusic.addEventListener('pause', playHoverMusic);