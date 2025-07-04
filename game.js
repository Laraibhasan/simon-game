var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;


$("#start-btn").click(function () {
    if (!started){
        $("#level-title").text("Level "+ level);
        nextSequence();
        started=true;
        $("#start-btn").hide(); // Hide after game starts
    }
});


$(".btn").click(function(){
    var userChosenColour= $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playsound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});


function nextSequence(){
    userClickedPattern=[]
    level++;
    $("#level-title").text("Level "+ level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChosenColour);
};


function playsound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};


function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
};


function startOver(){
    level=0;
    gamePattern=[];
    started=false;
    $("#start-btn").show(); // Show button again for restart
};


function checkAnswer(currentLevel){
    if (gamePattern[currentLevel]==userClickedPattern[currentLevel]){
        console.log("success");
        if (userClickedPattern.length==gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playsound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);
        $("h1").text("Game Over, Press Start to Restart");
        startOver();
    }
};
