let workoutSetCounter = 1;
let workoutCounter = 1;
let trackerButtonCounter = 1;

function createNewSet() {
    // Create the main workout set container
    const workoutSet = document.createElement('div');
    workoutSet.className = 'workout-set';
    workoutSet.id = 'workout-set-' + workoutSetCounter;

    // Create and append the main heading
    const mainHeading = document.createElement('h2');
    mainHeading.textContent = 'Workout Set ' + workoutSetCounter;
    workoutSet.appendChild(mainHeading);

    // Increment the workout set counter for the next set
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
    workout.id = 'workout-' + workoutCounter;
    setContainer.appendChild(workout);

    // Create and append the subheading
    const subHeading = document.createElement('h3');
    subHeading.id = 'workout-name-' + workoutCounter;
    subHeading.textContent = '[CHANGE ME]';
    subHeading.onclick = function() {
        changeWorkoutType(subHeading);
    }
    workout.appendChild(subHeading);

    // Create and append the workout details
    const workoutDetails = document.createElement('h4');
    workoutDetails.id = 'workout-details-' + workoutCounter;
    workoutDetails.textContent = 'n x n - n lbs.';
    workoutDetails.onclick = function() {
        changeWorkoutDetails(workoutDetails);
    }
    workout.appendChild(workoutDetails);

    // Create the workout buttons container
    const workoutButtons = document.createElement('div');
    workoutButtons.id = 'workout-buttons-container-' + workoutCounter;
    workoutButtons.className = 'workout-buttons';
    workout.appendChild(workoutButtons);

    // Create and append the tracker buttons
    for (let i = 0; i < 6; i++) {
        createNewTracker(workoutButtons);
    }

    // Increment the workout counter for the next workout
    workoutCounter++;
}

function createNewTracker(buttonContainer) {
    // Create the tracker button
    const button = document.createElement('button');
    button.className = 'tracker-button';
    button.id = 'tracker-button-' + trackerButtonCounter;
    button.textContent = '5';
    buttonContainer.appendChild(button);

    // Increment the button counter for the next button
    trackerButtonCounter++;
}

function changeWorkoutType(workoutHeading) {
    let input = prompt('Please enter the type of workout', 'Overhead Press');
    input = sanitize(input);
    workoutHeading.textContent = input;
}

function changeWorkoutDetails(workoutDetails) {
    let sets = prompt('Please enter the number of sets', '5');
    sets = sanitize(sets).replace(/[^\d]*/ig, '');

    let reps = prompt('Please enter the number of reps', '5');
    reps = sanitize(sets).replace(/[^\d]*/ig, '');

    let weight = prompt('Please enter the weight per rep', '10');
    reps = sanitize(sets).replace(/[^\d]*/ig, '');

    workoutDetails.textContent = sets + ' x ' + reps + ' - ' + weight + ' lbs.'
}

function sanitize(string) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        "/": '&#x2F;',
    };
    const reg = /[&<>"'/]/ig;
    return string.replace(reg, (match)=>(map[match]));
  }
