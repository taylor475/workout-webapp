let workoutCounter = 1

function createNewSet() {
    // Create the main workout set container
    const workoutSet = document.createElement('div');
    workoutSet.className = 'workout-set';

    // Create and append the main heading
    const mainHeading = document.createElement('h2');
    mainHeading.textContent = 'Workout Set ' + workoutCounter;
    workoutSet.appendChild(mainHeading);

    // Increment the workout counter for the next set
    workoutCounter++;

    // Create the workout container
    const workout = document.createElement('div');
    workout.className = 'workout';
    workoutSet.appendChild(workout);

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
        const button = document.createElement('button');
        button.className = 'tracker-button';
        button.textContent = '5';
        workoutButtons.appendChild(button);
    }

    // Create and append the "Add Another Workout" button
    const addButton = document.createElement('button');
    addButton.className = 'new-workout';
    addButton.textContent = 'Add Another Workout';
    addButton.onclick = createNewWorkout;
    workoutSet.appendChild(addButton);

    // Append the entire workout set to the main container
    const container = document.getElementById('workout-container');
    container.appendChild(workoutSet);
}

function createNewWorkout() {
    //
}

function createNewTracker() {
    //
}
