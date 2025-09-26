const gameContainer = document.getElementById("gameContainer");
const basket = document.getElementById("basket");
const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const levelEl = document.getElementById("level");

let score = 0;
let lives = 3;
let level = 1;
let basketX = window.innerWidth / 2 - 40; // basket width = 80
let fallingObjects = [];
let gameSpeed = 2;

// Basket movement
document.addEventListener("mousemove", (e) => {
    basketX = e.clientX - 40; // center the basket
    basket.style.left = basketX + "px";
});

// Create falling objects
function createObject() {
    const obj = document.createElement("div");
    obj.classList.add("fallingObject");
    obj.style.left = Math.random() * (window.innerWidth - 40) + "px";
    obj.style.top = "0px";
    gameContainer.appendChild(obj);
    fallingObjects.push(obj);
}

// Move falling objects
function moveObjects() {
    fallingObjects.forEach((obj, index) => {
        let top = parseInt(obj.style.top);
        top += gameSpeed;
        obj.style.top = top + "px";

        // Check collision
        const objRect = obj.getBoundingClientRect();
        const basketRect = basket.getBoundingClientRect();

        if (
            objRect.bottom >= basketRect.top &&
            objRect.left < basketRect.right &&
            objRect.right > basketRect.left
        ) {
            score += 10;
            scoreEl.textContent = score;
            gameContainer.removeChild(obj);
            fallingObjects.splice(index, 1);
        } else if (top > gameContainer.offsetHeight) {
            lives--;
            livesEl.textContent = lives;
            gameContainer.removeChild(obj);
            fallingObjects.splice(index, 1);
            if (lives <= 0) {
                alert("Game Over! Your Score: " + score);
                window.location.reload();
            }
        }
    });
}

// Level up
function checkLevel() {
    if (score >= level * 50) {
        level++;
        levelEl.textContent = level;
        gameSpeed += 1;
    }
}

// Game loop
function gameLoop() {
    moveObjects();
    checkLevel();
    requestAnimationFrame(gameLoop);
}

// Object creation interval
setInterval(createObject, 1500);

// Start game
gameLoop();
