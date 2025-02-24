"use strict";

var users = {};
var currentScore = 0;
var currentUser = null;
var gameInterval;
var timer = 120; // Sample order generation

function generateOrder() {
  return {
    falafel: Math.floor(Math.random() * 4),
    tomato: Math.floor(Math.random() * 4),
    lettuce: Math.floor(Math.random() * 4),
    onion: Math.floor(Math.random() * 4)
  };
} // Start game


function startGame() {
  if (currentUser) return; // Already in game

  var usernameInput = document.getElementById("userInput");
  var username = usernameInput.value;

  if (users[username] !== undefined) {
    currentUser = username;
    currentScore = users[username];
  } else {
    currentUser = username;
    currentScore = 0;
    users[username] = 0; // New user
  } // Hide input and show game


  document.getElementById("hideWhenGameStart").style.display = "none";
  document.getElementById("game").style.display = "block";
  document.getElementById("userInputshow").style.display = "block";
  updateInventory();
  loadNewOrder();
  startTimer();
} // Load inventory


function updateInventory() {
  var inventory = document.getElementById("inventory");
  inventory.innerHTML = "\n        <div id=\"falafel\">Falafel: 3</div>\n        <div id=\"tomato\">Tomato: 3</div>\n        <div id=\"lettuce\">Lettuce: 3</div>\n        <div id=\"onion\">Onion: 3</div>";
} // Load new order


function loadNewOrder() {
  var order = generateOrder();
  var orderDiv = document.getElementById("currentOrder");
  orderDiv.innerHTML = "Order: Falafel ".concat(order.falafel, ", Tomato ").concat(order.tomato, ", Lettuce ").concat(order.lettuce, ", Onion ").concat(order.onion);
} // Start timer


function startTimer() {
  timer = 120;
  var timerDiv = document.getElementById("timer");
  gameInterval = setInterval(function () {
    timer--;
    timerDiv.innerHTML = "Time Left: ".concat(timer);

    if (timer <= 0) {
      clearInterval(gameInterval);
      endGame();
    }
  }, 1000);
} // End game


function endGame() {
  document.getElementById("hideWhenGameStart").style.display = "none";
  document.getElementById("score").innerHTML = "Final Score: ".concat(currentScore);
  document.getElementById("game").style.display = "none";
  document.getElementById("scoreboard").style.display = "block";
  document.getElementById("newGameDifferentUser").addEventListener("click", startGame);
}

document.getElementById("startGame").addEventListener("click", startGame); // Event listeners