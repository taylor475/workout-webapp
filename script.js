let workoutSetCounter = 1

function createNewSet() {
    // Create the main workout set container
    const workoutSet = document.createElement('div');
    workoutSet.className = 'workout-set';
    workoutSet.id = 'workout-set-' + workoutSetCounter;

    // Create and append the main heading
    const mainHeading = document.createElement('h2');
    mainHeading.textContent = 'Workout Set ' + workoutSetCounter;
    workoutSet.appendChild(mainHeading);

    // Increment the workout counter for the next set
    workoutSetCounter++;

    // Create and append the "Add Another Workout" button
    const addButton = document.createElement('button');
    addButton.className = 'new-workout';
    addButton.textContent = 'Add Another Workout';
    addButton.onclick = function() {
        createNewWorkout(workoutSet);
    }
    workoutSet.appendChild(addButton);

    // Append the entire workout set to the main container
    const container = document.getElementById('workout-container');
    container.appendChild(workoutSet);
}

function createNewWorkout(setContainer) {
    // Create the workout container
    const workout = document.createElement('div');
    workout.className = 'workout';
    setContainer.appendChild(workout);

    // Create and append the subheading
    const subHeading = document.createElement('h3');
    subHeading.textContent = 'Filler';
    workout.appendChild(subHeading);

    // Create and append the workout details
    const workoutDetails = document.createElement('h4');
    workoutDetails.textContent = '5 x 5 - n lbs.';
    workout.appendChild(workoutDetails);

    // Create the workout buttons container
    const workoutButtons = document.createElement('div');
    workoutButtons.className = 'workout-buttons';
    workout.appendChild(workoutButtons);

    // Create and append the tracker buttons
    for (let i = 0; i < 6; i++) {
        createNewTracker(workoutButtons);
    }
}

function createNewTracker(buttonContainer) {
    const button = document.createElement('button');
    button.textContent = '5';
    button.className = 'tracker-button';
    buttonContainer.appendChild(button);
}
