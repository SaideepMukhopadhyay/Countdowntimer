let countdown;
let timeRemaining;
let soundPlayed = false;

// Function to start the timer
function startTimer() {
    // Get input values for days, hours, minutes, and seconds
    const daysInput = parseInt(document.getElementById('daysInput').value) || 0;
    const hoursInput = parseInt(document.getElementById('hoursInput').value) || 0;
    const minutesInput = parseInt(document.getElementById('minutesInput').value) || 0;
    const secondsInput = parseInt(document.getElementById('secondsInput').value) || 0;

    // Convert everything to total seconds
    timeRemaining = (daysInput * 24 * 60 * 60) + (hoursInput * 60 * 60) + (minutesInput * 60) + secondsInput;

    // Ensure the time is valid
    if (timeRemaining <= 0) {
        alert("Please enter a valid time!");
        return;
    }

    clearInterval(countdown);
    soundPlayed = false; // Reset sound play status

    countdown = setInterval(() => {
        let days = Math.floor(timeRemaining / (24 * 60 * 60));
        let hours = Math.floor((timeRemaining % (24 * 60 * 60)) / (60 * 60));
        let minutes = Math.floor((timeRemaining % (60 * 60)) / 60);
        let seconds = timeRemaining % 60;

        // Format the time to display as DD:HH:MM:SS
        days = days < 10 ? "0" + days : days;
        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        document.getElementById('timer').textContent = `${days}:${hours}:${minutes}:${seconds}`;

        // Check if the countdown has reached zero
        if (timeRemaining > 0) {
            timeRemaining--;
        } else {
            clearInterval(countdown);
            if (!soundPlayed) {
                playSound(); // Play sound only once
                alert("Time is over!"); // Show alert message
            }
        }
    }, 1000);
}

// Function to play sound
function playSound() {
    const sound = document.getElementById('alarm-sound');
    sound.play();
    soundPlayed = true;

    // Stop the sound after playing for 5 seconds
    setTimeout(() => {
        sound.pause();
        sound.currentTime = 0; // Reset sound to the start
    }, 5000); // Adjust the timeout duration to stop the sound after 5 seconds
}
