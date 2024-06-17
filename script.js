let workoutSetCounter = 1
let workoutCounter = 1
let trackerButtonCounter = 1

function createNewSet() {
    // Create the main workout set container
    const workoutSet = document.createElement('div')
    workoutSet.className = 'workout-set'
    workoutSet.id = 'workout-set-' + workoutSetCounter

    // Create and append the main heading
    const mainHeading = document.createElement('h2')
    mainHeading.textContent = 'Workout Set ' + workoutSetCounter
    workoutSet.appendChild(mainHeading)

    // Increment the workout set counter for the next set
    workoutSetCounter++
    localStorage.setItem('workoutSetCounter', workoutSetCounter)

    // Create and append the "Add Another Workout" button
    const addButton = document.createElement('button')
    addButton.className = 'new-workout'
    addButton.textContent = 'Add Another Workout'
    addButton.onclick = function() {
        createNewWorkout(workoutSet)
    }
    workoutSet.appendChild(addButton)

    // Append the entire workout set to the main container
    const container = document.getElementById('workout-container')
    container.appendChild(workoutSet)
}

function createNewWorkout(setContainer) {
    // Create the workout container
    const workout = document.createElement('div')
    workout.className = 'workout'
    workout.id = 'workout-' + workoutCounter
    setContainer.appendChild(workout)

    // Save parent container in localStorage
    localStorage.setItem(workout.id + '-parent', setContainer.id)

    // Create and append the subheading
    const subHeading = document.createElement('h3')
    subHeading.id = 'workout-name-' + workoutCounter
    subHeading.textContent = '[CHANGE ME]'
    subHeading.onclick = function() {
        changeWorkoutType(workout, subHeading)
    }
    workout.appendChild(subHeading)

    // Create default localStorage workout name
    localStorage.setItem(workout.id + '-name', '[CHANGE ME]')

    // Create and append the workout details
    const workoutDetails = document.createElement('h4')
    workoutDetails.id = 'workout-details-' + workoutCounter
    workoutDetails.textContent = '5 x 5 - 5 lbs.'
    workoutDetails.onclick = function() {
        changeWorkoutDetails(workout, workoutDetails, workoutButtons)
    }
    workout.appendChild(workoutDetails)

    // Create default localStorage workout values
    localStorage.setItem(workout.id + '-sets', 5)
    localStorage.setItem(workout.id + '-reps', 5)
    localStorage.setItem(workout.id + '-weight', 5)

    // Create the workout buttons container
    const workoutButtons = document.createElement('div')
    workoutButtons.id = 'workout-buttons-container-' + workoutCounter
    workoutButtons.className = 'workout-buttons'
    workout.appendChild(workoutButtons)

    // Create and append the tracker buttons
    for (let i = 0; i < 5; i++) {
        createNewTracker(workoutButtons, 5)
    }

    // Increment the workout counter for the next workout
    workoutCounter++
    localStorage.setItem('workoutCounter', workoutCounter)
}

function createNewTracker(buttonContainer, repCount) {
    // Create the tracker button
    const button = document.createElement('button')
    button.className = 'tracker-button'
    button.id = 'tracker-button-' + trackerButtonCounter
    button.textContent = repCount
    buttonContainer.appendChild(button)

    // Initialize click counter
    button.dataset.clickCount = 0

    // Add event listener to decrement the button value and change color on subsequent clicks
    button.addEventListener('click', function() {
        let clickCount = parseInt(button.dataset.clickCount)
        
        if (clickCount === 0) {
            button.style.backgroundColor = 'red'
        } else {
            let currentValue = parseInt(button.textContent)
            if (currentValue > 0) {
                button.textContent = currentValue - 1
            }

            // Calculate the new color based on the click count
            let colorValue = Math.max(0, 0 + clickCount * (255 / repCount))
            button.style.backgroundColor = `rgb(255, ${colorValue}, ${colorValue})`
        }
        
        button.dataset.clickCount = clickCount + 1
    })

    // Increment the button counter for the next button
    trackerButtonCounter++
}

function changeWorkoutType(parentWorkout, workoutHeading) {
    // Gather and sanitize user input
    let input = prompt('Please enter the type of workout', 'Overhead Press')
    input = sanitize(input)

    // Set text to sanitized user input
    workoutHeading.textContent = input
    localStorage.setItem(parentWorkout.id + '-name', input)
}

function changeWorkoutDetails(parentWorkout, workoutDetails, buttonContainer) {
    // Gather and sanitize user input
    let sets = prompt('Please enter the number of sets', '5')
    sets = sanitize(sets).replace(/[^\d]*/ig, '')

    let reps = prompt('Please enter the number of reps', '5')
    reps = sanitize(reps).replace(/[^\d]*/ig, '')

    let weight = prompt('Please enter the weight per rep', '10')
    weight = sanitize(weight).replace(/[^\d]*/ig, '')

    // Set text to formatted and sanitized user input
    workoutDetails.textContent = sets + ' x ' + reps + ' - ' + weight + ' lbs.'

    // Update the tracker buttons based on the new details
    updateTrackerButtons(buttonContainer, sets, reps)

    // Update default localStorage workout values
    localStorage.setItem(parentWorkout.id + '-sets', sets)
    localStorage.setItem(parentWorkout.id + '-reps', reps)
    localStorage.setItem(parentWorkout.id + '-weight', weight)
}

function updateTrackerButtons(buttonContainer, sets, reps) {
    // Clear existing buttons
    buttonContainer.innerHTML = ''

    // Recreate buttons with new data
    for (let i = 0; i < sets; i++) {
        createNewTracker(buttonContainer, reps)
    }
}

function sanitize(string) {
    // Create a map of characters and their HTML mappings
    const map = {
        '&': '&amp',
        '<': '&lt',
        '>': '&gt',
        '"': '&quot',
        "'": '&#x27',
        "/": '&#x2F',
    }

    // Use regex to replace certain characters with their HTML mappings
    const reg = /[&<>"'/]/ig
    return string.replace(reg, (match)=>(map[match]))
  }

function deleteAllData() {
    // Display confirmation pop-up before proceeding
    if (confirm('This will permanently delete all stored data. Are you sure you want to proceed?')) {
        localStorage.clear()
        window.alert('Data deleted.')
    }
    else {
        window.alert('Deletion canceled. Your data is still saved.')
    }
}
