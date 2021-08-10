// alert("Working");
var level = 0;
var started = false;
var buttonColours = ["red", "green", "blue", "yellow"];
var userClickedPattern = [];
var gamePattern = [];

$(document).keypress(function() {
	if(started === false){
		nextSequence();
		started = true;
	}
});


function nextSequence(){
	userClickedPattern = [];

	// selecting random color from the buttonColours array 
	var randomColor = buttonColours[Math.floor(Math.random() * 4)];
	gamePattern.push(randomColor);


	playSound(randomColor);
	animateButton(randomColor);

	// increase level
	level++;
	$("#level-title").text("Level " + level);
}


function playSound(color) {
	var audio = new Audio("sounds/" + color + ".mp3");
	audio.play();
}

function animateButton(color) {
	$("#" + color).addClass("pressed");
	setTimeout(function(){
		$("#" + color).removeClass("pressed");
	}, 100);
}

$(".btn").click(function() {
	if(started === true){
		var userChosenColor = $(this).attr("id");
		// console.log(userChosenColor);

		playSound(userChosenColor);
		animateButton(userChosenColor);

		userClickedPattern.push(userChosenColor);
		checkAnswer(userClickedPattern.length - 1);
	}
	
});


function checkAnswer(index) {
	if(gamePattern[index] === userClickedPattern[index]){
		// console.log("sucess");
		if(gamePattern.length === userClickedPattern.length){
			setTimeout(nextSequence , 1000);
		}
	}
	else{
		// console.log("wrong");
		var audio = new Audio("sounds/wrong.mp3");
		audio.play();
		$("body").addClass("game-over");
		setTimeout(function() {
			$("body").removeClass("game-over")
		}, 200);
		$("#level-title").text("Game Over, Press Any Key to Restart");

		startOver();

	}
}

function startOver() {
	level = 0;
	started = false;
	gamePattern = [];
}
