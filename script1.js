let buttonColours=["red", "blue", "green", "yellow"];
let gamePattern =[];
let userClickedPattern=[];
var level=0;
var started=false;
function nextSequence(){
    level++;
    $("#level-title").text("Level " + level);
    let randomNumber=Math.random();
    randomNumber= Math.floor(randomNumber*4);
    let randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log("random " + gamePattern);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}


$('.btn').click(function() {
    var userChosenColour=$(this).attr("id");
   userClickedPattern.push(userChosenColour);
   console.log("user "+ userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
})

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }

function animatePress(currentColor){
$('#'+ currentColor).addClass("pressed");
setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);

}

$(document).keypress(()=>{
    if (!started) {
        nextSequence();
        $("#level-title").text("Level " + level);
       
        started = true;
      }
})

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }