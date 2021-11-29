var buttonColors = ["red","blue","green","yellow"];

var gamePattern = [];

var userClickedPattern = [];

var notStarted = true;

var level = 0;

//creates random color that will beep

function nextSequence(){
  var randomNumber = Math.floor(Math.random()*4);

  var randomChosenColour =  buttonColors[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

  level++;

  $("h1").text("Level "+level);

}

//takes the user clicked button's color and add it into userclickedpattern
$(".btn").click(function(){
  var color = $(this).attr('id');

  userClickedPattern.push(color);

  playSound(color);

  animatePress(color);

  checkAnswer(userClickedPattern.length-1);
})

//plays sound for each color
function playSound(name){
  var path = "sounds/"+name+".mp3";

  var audio = new Audio(path);
  audio.play();
}

//animate the button when we press it
function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");

  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");},100)
}

//if the game is not yet started this will listen for keypress event and start the game
$(document).keypress(function(){
  if(notStarted){
    nextSequence();
  //  $("h1").text("Level 0");
    notStarted = false;
  }
});

//checks the current pressed button is equal to that of in the sequence in same position
function checkAnswer(currentLevel){

  console.log("Success");

  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){

    if(currentLevel===gamePattern.length-1){  // if the number of button pressed is equal to the end of the sequence then call nextSequence to add color to the sequence
      setTimeout(nextSequence,1000);
      userClickedPattern = [];
    }

  }

  else{   //the user picked wrong color restart the game
    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over")
    },200);

    $("h1").text("Game Over, Press Any Key to Restart");

    starOver();
  }
}

//Restart the game
function starOver(){
  gamePattern = []
  userClickedPattern = []
  level = 0;
  notStarted = true;
}
