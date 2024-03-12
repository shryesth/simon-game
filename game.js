var buttonColors = ['red', 'blue', 'green', 'yellow']
var gamePattern = []
var userClickedPattern = []
var level = 0
var started = 0

function nextSequence() {
    var randomNumber = Math.floor((Math.random() * 4))

    var randomChosenColor = buttonColors[randomNumber]
    gamePattern.push(randomChosenColor)
    console.log(gamePattern)
    $('#' + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100)
    playSound(randomChosenColor)
    level += 1
    $('h1').text('level ' + level)
    userClickedPattern = []
}

$(".btn").on("click", function () {
    var userChosenColour = $(this).attr("id")
    userClickedPattern.push(userChosenColour)
    console.log(userClickedPattern)
    animatePress(userChosenColour)
    playSound(userChosenColour)
    checkAnswer(userClickedPattern.length - 1)
})

function playSound(name) {
    var audio = new Audio('./sounds/' + name + '.mp3');
    audio.play()
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass('pressed')
    setTimeout(function () {
        $("#" + currentColor).removeClass('pressed')
    }, 100)
}

$(document).on("keydown", function () {
    if (started == 0) {
        nextSequence();
        started += 1
    }
    $('h1').text('level ' + level)
})

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        console.log("success")
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000)
        }
    } else {
        console.log("wrong")
        playSound('wrong')
        $('body').addClass('game-over');
        setTimeout(function () {
            $('body').removeClass('game-over')
        }, 200)
        $('h1').text('Game Over, Press Any Key to Restart')
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = 0;
}