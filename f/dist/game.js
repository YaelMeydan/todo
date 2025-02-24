let users = {};
let currentScore = 0;
let currentUser = null;
let gameInterval;
let timer = 10;
// Sample order generation
function generateOrder() {
    return {
        falafel: Math.floor(Math.random() * 4),
        tomato: Math.floor(Math.random() * 4),
        lettuce: Math.floor(Math.random() * 4),
        onion: Math.floor(Math.random() * 4)
    };
}
// Start game
function startGame() {
    if (currentUser)
        return; // Already in game
    const usernameInput = document.getElementById("username");
    const username = usernameInput.value;
    if (users[username] !== undefined) {
        currentUser = username;
        currentScore = users[username];
    }
    else {
        currentUser = username;
        currentScore = 0;
        users[username] = 0; // New user
    }
    // Hide input and show game
    document.getElementById("userInput").style.display = "none";
    document.getElementById("game").style.display = "block";
    updateInventory();
    loadNewOrder();
    startTimer();
}
// Load inventory
function updateInventory() {
    const inventory = document.getElementById("inventory");
    inventory.innerHTML = `
        <div id="falafel">Falafel: 3</div>
        <div id="tomato">Tomato: 3</div>
        <div id="lettuce">Lettuce: 3</div>
        <div id="onion">Onion: 3</div>`;
}
// Load new order
function loadNewOrder() {
    const order = generateOrder();
    const orderDiv = document.getElementById("currentOrder");
    orderDiv.innerHTML = `Order: Falafel ${order.falafel}, Tomato ${order.tomato}, Lettuce ${order.lettuce}, Onion ${order.onion}`;
}
// Start timer
function startTimer() {
    timer = 10;
    const timerDiv = document.getElementById("timer");
    gameInterval = setInterval(() => {
        timer--;
        timerDiv.innerHTML = `Time Left: ${timer}`;
        if (timer <= 0) {
            clearInterval(gameInterval);
            endGame();
        }
    }, 1000);
}
// End game
function endGame() {
    document.getElementById("score").innerHTML = `Final Score: ${currentScore}`;
    document.getElementById("game").style.display = "none";
    document.getElementById("scoreboard").style.display = "block";
}
// Event listeners
document.getElementById("startGame").addEventListener("click", startGame);
document.getElementById("newGameDifferentUser").addEventListener("click", startGame);
