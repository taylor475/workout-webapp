let workoutSetCounter = 1
let workoutCounter = 1
let trackerButtonCounter = 1

function loadData() {
    if (localStorage.length > 0) {
        // Fetch localStorage counter variable values
        workoutSetCounter = localStorage.getItem('workoutSetCounter')
        workoutCounter = localStorage.getItem('workoutCounter')

        // Recreate the workout sets as found in localStorage
        for (i = 1; i < workoutSetCounter; i++) {
            loadSet()
        }

        // Recreate the workouts as found in localStorage
        for (i = 1; i < workoutCounter; i++) {
            containerId = localStorage.getItem('workout-' + i + '-parent')
            container = document.getElementById(containerId)
            workoutName = localStorage.getItem('workout-' + i + '-name')
            console.log(workoutName)
            sets = localStorage.getItem('workout-' + i + '-sets')
            reps = localStorage.getItem('workout-' + i + '-reps')
            weight = localStorage.getItem('workout-' + i + '-weight')

            loadWorkout(container, 'workout-' + i, workoutName, sets, reps, weight)
        }
    }
    else {
        // Set the default counter variable values in localStorage
        localStorage.setItem('workoutSetCounter', workoutSetCounter)
        localStorage.setItem('workoutCounter', workoutCounter)
    }
}

// Used to create new workout sets
function createNewSet() {
    // Create the main workout set container
    const workoutSet = document.createElement('div')
    workoutSet.className = 'workout-set'
    workoutSet.id = 'workout-set-' + workoutSetCounter

    // Create and append the "Finish Set" button
    createFinishWorkoutButton(workoutSet)

    // Create and append the main heading
    const mainHeading = document.createElement('h2')
    mainHeading.textContent = 'Workout Set ' + workoutSetCounter
    workoutSet.appendChild(mainHeading)

    // Increment the workout set counter for the next set
    workoutSetCounter++
    localStorage.setItem('workoutSetCounter', workoutSetCounter)

    // Create and append the "Add Another Workout" button
    createNewWorkoutButton(workoutSet)

    // Append the entire workout set to the main container
    const container = document.getElementById('workout-container')
    container.appendChild(workoutSet)
}

// Used to recreate previous workout sets
function loadSet() {
    // Create the main workout set container
    const workoutSet = document.createElement('div')
    workoutSet.className = 'workout-set'
    workoutSet.id = 'workout-set-' + i

    // Create and append the "Finish Set" button
    createFinishWorkoutButton(workoutSet)

    // Create and append the main heading
    const mainHeading = document.createElement('h2')
    mainHeading.textContent = 'Workout Set ' + i
    workoutSet.appendChild(mainHeading)

    // Create and append the "Add Another Workout" button
    createNewWorkoutButton(workoutSet)

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
    createNewSubheading(workout)

    // Create default localStorage workout name
    localStorage.setItem(workout.id + '-name', '[CHANGE ME]')

    // Create the workout buttons container
    const workoutButtons = document.createElement('div')
    workoutButtons.id = 'workout-buttons-container-' + workoutCounter
    workoutButtons.className = 'workout-buttons'

    // Create and append the workout details
    createNewDetails(workout, undefined, undefined, undefined, workoutButtons)

    // Create default localStorage workout values
    localStorage.setItem(workout.id + '-sets', 5)
    localStorage.setItem(workout.id + '-reps', 5)
    localStorage.setItem(workout.id + '-weight', 5)

    // Append the workout buttons container
    workout.appendChild(workoutButtons)

    // Create and append the tracker buttons
    for (let i = 0; i < 5; i++) {
        createNewTracker(workoutButtons, 5)
    }

    // Increment the workout counter for the next workout
    workoutCounter++
    localStorage.setItem('workoutCounter', workoutCounter)
}

function loadWorkout(setContainer, workoutId, workoutName, setCount, repCount, weight) {
    // Create the workout container
    const workout = document.createElement('div')
    workout.className = 'workout'
    workout.id = workoutId
    setContainer.appendChild(workout)

    // Create and append the subheading
    createNewSubheading(workout, workoutName)

    // Create the workout buttons container
    const workoutButtons = document.createElement('div')
    workoutButtons.id = 'workout-buttons-container-' + workoutCounter
    workoutButtons.className = 'workout-buttons'

    // Create and append the workout details
    createNewDetails(workout, setCount, repCount, weight, workoutButtons)

    // Append the workout buttons container
    workout.appendChild(workoutButtons)

    // Create and append the tracker buttons
    for (let i = 0; i < setCount; i++) {
        createNewTracker(workoutButtons, repCount)
    }
}

function createNewWorkoutButton(parentWorkoutSet) {
    // Create the button element
    const addButton = document.createElement('button')

    // Set the button class
    addButton.className = 'new-workout'

    // Set the text content of the button
    addButton.textContent = 'Add Another Workout'

    // Give the button a function to create a new button
    addButton.onclick = function() {
        createNewWorkout(workoutSet)
    }

    // Add the button to the DOM
    parentWorkoutSet.appendChild(addButton)
}

function createFinishWorkoutButton(parentWorkoutSet) {
    // Create the button element
    const finishButton = document.createElement('button')

    // Set the button class
    finishButton.className = 'finish-set'

    // Set the text content of the button
    finishButton.textContent = 'Finish Set'

    // Give the button a function to save data related to the completion of a workout set
    finishButton.onclick = function() {
        finishWorkoutSet(workoutSet)
    }

    // Add the button to the DOM
    parentWorkoutSet.appendChild(finishButton)
}

function createNewSubheading(parentWorkout, workoutName = '[CHANGE ME]') {
    // Create the subheading element
    const subHeading = document.createElement('h3')

    // Set the subheading id
    subHeading.id = parentWorkout.id + '-name'

    // Set the text content of the subheading
    subHeading.textContent = workoutName

    // Give the subheading a function to change its text
    subHeading.onclick = function() {
        changeWorkoutType(parentWorkout)
    }

    // Add the subheading to the DOM
    parentWorkout.appendChild(subHeading)
}

function createNewDetails(parentWorkout, setCount = 5, repCount = 5, weight = 5, workoutButtons) {
    // Create the details element
    const workoutDetails = document.createElement('h4')

    // Set the details id
    workoutDetails.id = parentWorkout.id + '-details'

    // Set the text content of the details
    workoutDetails.textContent = setCount + ' x ' + repCount + ' - ' + weight + ' lbs.'

    // Give the details a function to change portions of its text
    workoutDetails.onclick = function() {
        changeWorkoutDetails(parentWorkout, workoutButtons)
    }

    // Add the details to the DOM
    parentWorkout.appendChild(workoutDetails)
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

function changeWorkoutType(parentWorkout) {
    // Gather and sanitize user input
    let input = prompt('Please enter the type of workout', 'Overhead Press')
    input = sanitize(input)

    // Set text to sanitized user input
    workoutHeading = document.getElementById(parentWorkout.id + '-name')
    workoutHeading.textContent = input
    localStorage.setItem(parentWorkout.id + '-name', input)
}

function changeWorkoutDetails(parentWorkout, buttonContainer) {
    // Gather and sanitize user input
    let sets = prompt('Please enter the number of sets', '5')
    sets = sanitize(sets).replace(/[^\d]*/ig, '')

    let reps = prompt('Please enter the number of reps', '5')
    reps = sanitize(reps).replace(/[^\d]*/ig, '')

    let weight = prompt('Please enter the weight per rep', '10')
    weight = sanitize(weight).replace(/[^\d]*/ig, '')

    // Set text to formatted and sanitized user input
    workoutDetails = document.getElementById(parentWorkout.id + '-details')
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

function getCurrentDate() {
    // Get the current date
    const date = new Date()

    // Set the individual components of the date
    let day = date.getDay()
    let year = date.getFullYear()
    let month = date.getMonth() + 1

    // Combine individual date components
    let currentDate = `${month}-${day}-${year}`
    return currentDate
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
        location.reload(true)
        window.alert('Data deleted.')
    }
    else {
        window.alert('Deletion canceled. Your data is still saved.')
    }
}
