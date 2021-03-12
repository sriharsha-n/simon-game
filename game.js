var buttonColors=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];

var level=0;
var count=0;
var score=0;

if(screen.width<1000){
	setTimeout(nextSequence,2500);
}

$(".btn").click(function(event){
	// if(firstPress==1||screen.width<1000){
		// var userChosenColour=event.target.id;
		if(count==0){
			userClickedPattern=[];
		}
		var userChosenColour=$(this).attr("id");
		console.log(userChosenColour);
		userClickedPattern.push(userChosenColour);
		console.log(userClickedPattern);
		playSound(userChosenColour);
		animatePress(userChosenColour);
		var index=buttonColors.indexOf(userChosenColour);
		console.log(count,level);
		checkAnswer(index);
	// }
});

function animatePress(currentColor){
	$("#"+currentColor).addClass("pressed");
	setTimeout(function(){
		$("#"+currentColor).removeClass("pressed");
	},200);
}

function nextSequence(){
	changeLevel();
	var randomNumber=Math.random();
	randomNumber=Math.floor(randomNumber*4)
	var randomChosenColor=buttonColors[randomNumber];
	gamePattern.push(randomChosenColor)
	console.log(gamePattern);
	$("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
	playSound(randomChosenColor);
}

function playSound(file){
	var audio=new Audio("sounds/"+file+".mp3");
	console.log(audio);
	audio.play();
}

function changeLevel(){
	$("#level-title").text("Level "+level);
	level++;
	count=0;
}

function checkAnswer(index){
	console.log(index);
	if(gamePattern[count]==userClickedPattern[count]){
		console.log("success");
		count++;
		console.log(count+" "+level)
		score++;
		$("h3 span").slideUp();
		setTimeout(function(){
			$("h3 span").text(score);
			$("h3 span").slideDown();	
		},300);
		if(count==level){
			setTimeout(nextSequence,500);
			// nextSequence();
		}
	}
	else{
		console.log("wrong");
		wrongAnswer();
		count=0;
	}
}

function wrongAnswer(){
	playSound("wrong");
	$("h1").text("Game Over, press any key to restart!");
	gamePattern=[];
	userClickedPattern=[];
	level=0;
	firstPress=0;
	score=0;
	$("h3 span").slideUp().slideDown().text("0");
}

var firstPress=0;
$(document).keypress(function(){
	if(firstPress==0){
		nextSequence();
		firstPress=1;
	}
});