const playButton = document.getElementById('playButton');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const birdImg = new Image();
// birdImg.src = "Pictures/bird.png";
birdImg.src = "https://i.postimg.cc/N9t6F4Zw/pngwing-com-1.png";

const pipeImg = new Image();
// pipeImg.src = "Pictures/pipes-png_388476.png";
pipeImg.src = "https://i.postimg.cc/dkT0MP5s/Nice-Png-pipes-png-388476.png";

function pausegameOverMusic() {
    const backgroundMusic = document.getElementById('backgroundMusic');
    gameOverMusic.pause();
}


const gravity = 0.1;
const jumpStrength = -4;
const birdSize = 180;
const pipeWidth = 100;
const pipeGap = 650;
const pipeSpeed = 1;

let isMusicPlaying = false;
let gameStarted = false;
let birdY = canvas.height / 2;
let birdVelocity = 0;
let pipes = [];
let score = 0;
let gameOver = false;

// Define the functions to play and stop background music
function playBackgroundMusic() {
    stopHoverMusic(); 
    stopBackgroundMusicStart();
    stopGameOverMusic();
    const backgroundMusic = document.getElementById('backgroundMusic');
    backgroundMusic.play();
}

function stopBackgroundMusic() {
    const backgroundMusic = document.getElementById('backgroundMusic');
    backgroundMusic.pause();
}

function playBackgroundMusicStart() {
    stopHoverMusic();
    stopBackgroundMusic();
    stopGameOverMusic();
    const backgroundMusicStart = document.getElementById('backgroundMusicstart');
    backgroundMusicStart.play();
}

function stopBackgroundMusicStart() {
    const backgroundMusicStart = document.getElementById('backgroundMusicstart');
    backgroundMusicStart.pause();
}

function playGameOverMusic() {
    stopHoverMusic();
    stopBackgroundMusic();
    stopBackgroundMusicStart();
    const gameOverMusic = document.getElementById('gameOverMusic');
    gameOverMusic.play();
}

function stopGameOverMusic() {
    const gameOverMusic = document.getElementById('gameOverMusic');
    gameOverMusic.pause();
}

function playSoundEffect() {
    stopHoverMusic(); // Pause hover music when sound effect plays
    const soundEffect = document.getElementById('soundEffect');
    soundEffect.play();
}


// Existing music functions...

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

// Example usage:
// Play background music
playMusic('backgroundMusic');

// Stop background music
stopMusic('backgroundMusic');
// Other code in your JavaScript file...


// Function to draw the bird
function drawBird() {
    ctx.drawImage(birdImg, canvas.width / 4, birdY, birdSize, birdSize);
}

function drawPipe(pipeX, openingY) {
    ctx.drawImage(pipeImg, pipeX, 0, pipeWidth, openingY);
    ctx.drawImage(pipeImg, pipeX, openingY + pipeGap, pipeWidth, canvas.height - openingY - pipeGap);
}


// Function to draw the score
function drawScore() {
    ctx.font = "40px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + score, canvas.width - 200, 60);
}

// Function to check collision with pipes
function checkCollision(pipe) {
    const birdBottomY = birdY + birdSize; // Bottom position of the bird
    const birdX = canvas.width / 4;
     // Check collision with floor
     if (birdBottomY >= canvas.height) {
        endGame(); // Call endGame() when collision with floor is detected
        playSound('floorCeilSound'); // Play floor/ceiling collision sound effect
        return;
    }

     // Check collision with ceiling
     if (birdY <= 0) {
        endGame(); // Call endGame() when collision with ceiling is detected
        playSound('floorCeilSound'); // Play floor/ceiling collision sound effect
        return;
    }

 // Check collision with pipes
 if (
    birdX + birdSize >= pipe.x && // Bird collides with right side of pipe
    birdX <= pipe.x + pipeWidth && // Bird collides with left side of pipe
    (birdY <= pipe.openingY || birdBottomY >= pipe.openingY + pipeGap) // Bird collides with top or bottom of pipe
) {
    endGame(); // Call endGame() when collision with pipe is detected
    playSound('pipeSound'); // Play pipe collision sound effect
    return;
}
}

function playSound(soundId) {
const sound = document.getElementById(soundId);
sound.play();

    if (
        birdX + birdSize >= pipe.x &&
        birdX <= pipe.x + pipeWidth &&
        (birdY <= pipe.openingY || birdY + birdSize >= pipe.openingY + pipeGap)
    ) {
        endGame();
    }
}

// Function to end the game
function endGame() {
    gameOver = true;
    stopBackgroundMusic(); // Stop background music when the game ends
    const gameOverModal = document.getElementById('gameOverModal');
    const gameOverMessage = document.getElementById('gameOverMessage');
    const scoreMessage = document.getElementById('scoreMessage');
    stopBackgroundMusicStart();
    document.getElementById('gameOverModal').style.display = 'block';
    playGameOverMusic();
    gameOverMessage.innerText = "Game Over!";
    scoreMessage.innerText = "Your Score: " + score; // Set the score message
    gameOverModal.style.display = 'block';
    document.getElementById('playButton').style.display = 'block'; // Display the play button
    // document.getElementById('gameOverMessage').innerText = "Game Over! Your Score: " + score; 
}

function jump() {
    birdVelocity = jumpStrength;
}

// Function to start the game
function startGame() {
    let gameStarted = false; // Add a variable to track if the game has started
    birdY = canvas.height / 2;
    birdVelocity = 0;
    pipes = [];
    score = 0;
    gameOver = false;
    playBackgroundMusic(); // Start playing background music
    document.getElementById('gameOverModal').style.display = 'none';
    document.getElementById('playButton').style.display = 'none'; // Hide the play button
    update();
    const gameOverMusic = document.getElementById('gameOverMusic');
    gameOverMusic.pause();
}

function playGameOverMusic() {
    const gameOverMusic = document.getElementById('gameOverMusic');
    gameOverMusic.play();
}

const retryButton = document.getElementById('retryButton');
retryButton.addEventListener('click', function () {
    playButton.style.display = 'block';
    playGameOverMusic();
});

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', function () {
        stopBackgroundMusic();
    });
});

function stopBackgroundMusic() {
    const backgroundMusic = document.getElementById('backgroundMusic');
    backgroundMusic.pause();
}


function resetGame() {
    birdY = canvas.height / 2;
    birdVelocity = 0;
    pipes = [];
    score = 0;
    gameOver = false;
    document.getElementById('playButton').style.display = 'block'; // Display the play button
}

let hasScored = false;
// Add an event listener to the play button
document.getElementById('playButton').addEventListener('click', function() {
    gameStarted = true; // Set gameStarted to true
    document.getElementById('playButton').style.display = 'none'; // Hide the play button
    stopBackgroundMusicStart(); 
    startGame(); // Start the game
});
// Update the update function to start the game loop only when gameStarted is true
function update() {
    if (gameStarted && !gameOver) {
        birdVelocity += gravity;
        birdY += birdVelocity;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBird();
        pipes.forEach(pipe => {
            pipe.x -= pipeSpeed;
            drawPipe(pipe.x, pipe.openingY);
            checkCollision(pipe);
            if (pipe.x + pipeWidth < canvas.width / 4 && !pipe.scored) {
                score++;
                pipe.scored = true;
                hasScored = true; // Set hasScored to true when the player scores
            }
        });
        drawScore();
        if (pipes.length === 0 || pipes[pipes.length - 1].x <= canvas.width - pipeWidth * 2) {
            const openingY = Math.random() * (canvas.height - pipeGap);
            pipes.push({ x: canvas.width, openingY: openingY });
        }
        pipes = pipes.filter(pipe => pipe.x + pipeWidth > 0);
        pipes.forEach(pipe => {
            if (pipe.x + pipeWidth < canvas.width / 4 && !pipe.scored) {
                score++;
                pipe.scored = true;
                hasScored = true; // Set hasScored to true when the player scores
            }
        });
         // If the player has scored, play the scoring sound
         if (hasScored) {
            playScoreSound();
            hasScored = false; // Reset hasScored to false
        }
        requestAnimationFrame(update);
    }
}


// Function to play the scoring sound
function playScoreSound() {
    const scoreSound = document.getElementById('scoreSound');
    scoreSound.play();
}

// // Event listener for retry button
// document.getElementById('retryButton').addEventListener('click', function () {
//     startGame();
// });

document.getElementById('retryButton').addEventListener('click', function () {
    document.getElementById('gameOverModal').style.display = 'none'; // Hide the game over modal
    stopGameOverMusic(); 
    resetGame(); // Reset the game
    playBackgroundMusicStart();
    document.getElementById('playButton').style.display = 'block'; // Display the play button       
});


// Event listener for space key press
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        jump();
    }
});

// Event listener for touch/tap on the screen
canvas.addEventListener('click', function() {
    jump();
});


// Event listener for play button
document.getElementById('playButton').addEventListener('click', function () {
    startGame();
});

document.addEventListener('DOMContentLoaded', function () {
   // Check if the user is authenticated (e.g., by checking authentication cookies)
   const isAuthenticated = false; // Change this to true if the user is authenticated

   if (isAuthenticated) {
       // If the user is authenticated, start the game
       gameStarted = true;
       startGame();
   } else {
       // If the user is not authenticated, show the sign-up or login form
       document.getElementById('authContainer').style.display = 'block';
   }

    const playButton = document.getElementById('playButton');

    // Event listener for play button click
    playButton.addEventListener('click', function () {
        pausegameOverMusic();
        startGame();
        playButton.style.display = 'none'; // Hide the play button after clicking
    });
});
