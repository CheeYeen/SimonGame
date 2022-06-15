var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickPattern = [];
var level = 0;
var gameStarted = false;

$(document).keypress(function() {
  if (!gameStarted) {
    nextSequence();
    $("#level-title").text("Level " + level);
    gameStarted = true;
  }
});

$(".btn").on("click", function() {
  var userChosenColour = $(this).attr("id");
  userClickPattern.push(userChosenColour);
  console.log(userClickPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickPattern.length - 1);
});

function nextSequence() {
  userClickPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  var btnID = "#" + randomChosenColour;

  $(btnID).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $("h1").text("Level " + level);
}

function playSound(name) {
  var btnSound = "sounds/" + name + ".mp3";
  var audio = new Audio(btnSound);
  audio.play();
}

function animatePress(currentColour) {
  var activeButton = $("#" + currentColour);
  activeButton.addClass("pressed");
  setTimeout(function() {
    activeButton.removeClass("pressed")
  }, 100)
}

function checkAnswer(currentLevel) {
  if (userClickPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (userClickPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 100)
    }
  } else {
    console.log("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 500);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startover();
  }
}

function startover() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}
