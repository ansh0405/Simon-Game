// Array to hold the game pattern
let gamePattern = [];

// New array to hold the user's clicked pattern
let userClickedPattern = [];

// Variable to keep track of the game level
let level = 0;

// Variable to keep track of whether the game has started
let gameStarted = false;

// Function to generate the next sequence
function nextSequence() {
    // Reset userClickedPattern for the new level
    userClickedPattern = [];

    // Increase the level by 1
    level++;

    // Update the h1 with this change in the value of level
    $("#level-title").text("Level " + level);

    // Generate a random number between 0 and 3
    let randomNumber = Math.floor(Math.random() * 4);

    // Array of button colors
    let buttonColors = ["red", "blue", "green", "yellow"];

    // Get the color corresponding to the random number
    let randomChosenColor = buttonColors[randomNumber];

    // Add the chosen color to the game pattern
    gamePattern.push(randomChosenColor);

    // Logging the randomNumber and the gamePattern to the console
    console.log("Random Number: ", randomNumber);
    console.log("Game Pattern: ", gamePattern);

    // Select the button with the same ID as the randomChosenColor and animate a flash
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

    // Play the sound for the button color selected
    playSound(randomChosenColor);
}

// Function to play sound based on the button color
function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Function to animate button press
function animatePress(currentColour) {
    // Add the "pressed" class to the button
    $("#" + currentColour).addClass("pressed");

    // Remove the "pressed" class after 100 milliseconds
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

// Function to check the user's answer
function checkAnswer(currentLevel) {
    // Check if the most recent user answer is the same as the game pattern
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");

        // Check if the user has finished their sequence
        if (userClickedPattern.length === gamePattern.length) {
            // Call nextSequence() after a 1000 millisecond delay
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");

        // Play wrong sound
        playSound("wrong");

        // Change the title to "Game Over"
        $("#level-title").text("Game Over, Press Any Key to Restart");

        // Reset the game variables
        startOver();
    }
}

// Use jQuery to detect when any of the buttons are clicked and trigger a handler function
$(".btn").click(function() {
    // Create a new variable called userChosenColour to store the id of the button that got clicked
    let userChosenColour = $(this).attr("id");

    // Add the contents of the variable userChosenColour to the end of userClickedPattern
    userClickedPattern.push(userChosenColour);

    // Logging the userClickedPattern to the console
    console.log("User Clicked Pattern: ", userClickedPattern);

    // Play the sound for the button clicked by the user
    playSound(userChosenColour);

    // Animate the button press
    animatePress(userChosenColour);

    // Call checkAnswer() after a user has clicked and chosen their answer
    checkAnswer(userClickedPattern.length - 1);
});

// Use jQuery to detect when a keyboard key has been pressed
$(document).keypress(function() {
    // Check if the game has not started
    if (!gameStarted) {
        // Set the game started to true
        gameStarted = true;

        // Reset the level
        level = 0;

        // Call nextSequence() to start the game
        nextSequence();
    }
});

// Function to reset the game variables
function startOver() {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    gameStarted = false;
}
