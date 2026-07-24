const events = [];

document.addEventListener('DOMContentLoaded', function () {
    
    
console.log("Custom bookstore JavaScript is connected!");

const eventForm = document.getElementById('event-form');
const searchForm = document.getElementById('search-form');

searchForm.addEventListener('submit', function (event) {

    event.preventDefault();

    const searchInput = document.getElementById('search-name');

    const searchTerm = searchInput.value.trim().toLowerCase();

    const searchLoading =
    document.getElementById('search-loading');
    searchLoading.hidden = false;

    const searchResults = document.getElementById('search-results');

    setTimeout(function(){
        searchLoading.hidden = true;
     // Clear previous search results
    searchResults.innerHTML = '';

    // Assume initially that no event has been found
    let foundEvent = false;

    const originalEvents =
    document.querySelectorAll('#event-list > section:not(.dynamic-event)');
    console.log(originalEvents);

    originalEvents.forEach(function (eventCard) {

        const eventName =
            eventCard.querySelector('h3').textContent.toLowerCase();

        if (eventName.includes(searchTerm)) {

            foundEvent = true;

            searchResults.appendChild(eventCard.cloneNode(true));

        }

    });

    const matchingEvents = events.filter(function (event) {

        return event.name.toLowerCase().includes(searchTerm);

    });
    matchingEvents.forEach(function (event) {

        foundEvent = true;

    const eventCard = document.createElement('section');

    eventCard.innerHTML = `
        <span class="icon style2 major fa-book"></span>

            <h3>${event.name}</h3>

            <p>Type: ${event.type}</p>

            <p>${event.description}</p>

            <p>
            Date: ${event.date}<br>
            Time: ${event.time}<br>
            Venue: ${event.location}
            </p>

            <button
            type="button"
            class="view-details"
            aria-label="View details of ${event.name}">
            View Details
            </button>
        `;

        searchResults.appendChild(eventCard);

    });

    if (foundEvent === false) {

        searchResults.textContent =
            'No events found matching your search.';

    }
    console.log(
        '[Analytics] User interacted with Independent Bookstore Events Page'
    );
},1000);

});

eventForm.addEventListener('submit', function (event) {

    // Prevent normal form submission
    event.preventDefault();

    // Get all form fields
    const name = document.getElementById('name');
    const type = document.getElementById('type');
    const location = document.getElementById('location');
    const date = document.getElementById('date');
    const time = document.getElementById('time');
    const description = document.getElementById('description');

    // Remove previous errors
    clearErrors();

    let isValid = true;

    // Event Name validation
    if (name.value.trim() === '') {

    showError(
        name,
        'name-error',
        'Event name is required.'
    );

    isValid = false;

} else if (name.value.trim().length < 3) {

    showError(
        name,
        'name-error',
        'Event name must contain at least 3 characters.'
    );

    isValid = false;
}

    // Event Type validation
    if (type.value.trim() === '') {

    showError(
        type,
        'type-error',
        'Event type is required.'
    );

    isValid = false;

} else if (type.value.trim().length < 3) {

    showError(
        type,
        'type-error',
        'Event type must contain at least 3 characters.'
    );

    isValid = false;
}
    // Location validation
    if (location.value.trim() === '') {

    showError(
        location,
        'location-error',
        'Location is required.'
    );

    isValid = false;

} else if (location.value.trim().length < 3) {

    showError(
        location,
        'location-error',
        'Location must contain at least 3 characters.'
    );

    isValid = false;
}

    // Date validation
    if (date.value === '') {

    showError(
        date,
        'date-error',
        'Date is required.'
    );

    isValid = false;

} else {

    const selectedDate = new Date(date.value);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {

        showError(
            date,
            'date-error',
            'Event date cannot be in the past.'
        );

        isValid = false;
    }
}

    // Time validation
    if (time.value === '') {

    showError(
        time,
        'time-error',
        'Time is required.'
    );

    isValid = false;

} else if (date.value !== '') {

    const selectedDate = new Date(date.value);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (selectedDate.getTime() === today.getTime()) {

        const currentTime = new Date();

        const [hours, minutes] = time.value.split(':');

        const selectedTime = new Date();

        selectedTime.setHours(
            Number(hours),
            Number(minutes),
            0,
            0
        );

        if (selectedTime < currentTime) {

            showError(
                time,
                'time-error',
                'Event time cannot be in the past.'
            );

            isValid = false;
        }
    }
}
    // Description validation
    if (description.value.trim() === '') {

    showError(
        description,
        'description-error',
        'Description is required.'
    );

    isValid = false;

} else if (description.value.trim().length < 10) {

    showError(
        description,
        'description-error',
        'Description must contain at least 10 characters.'
    );

    isValid = false;
}

    if (isValid) {
        const newEvent = {
        name: sanitizeInput(name.value.trim()),
        type: sanitizeInput(type.value.trim()),
        description: sanitizeInput(description.value.trim()),
        date: date.value,
        time: time.value,
        location: sanitizeInput(location.value.trim())
        };

    events.push(newEvent);

    displayEvents();

    console.log(
        '[Analytics] User interacted with Independent Bookstore Events Page'
    );
    }
});


function showError(input, errorId, message) {

    input.classList.add('input-error');

    const errorMessage = document.getElementById(errorId);

    errorMessage.textContent = message;
}


function clearErrors() {

    const inputs = document.querySelectorAll(
        '#name, #type, #location, #date, #time, #description'
    );

    inputs.forEach(function (input) {
        input.classList.remove('input-error');
    });

    const errorMessages = document.querySelectorAll('.error-message');

    errorMessages.forEach(function (message) {
        message.textContent = '';
    });
}


function sanitizeInput(input) {
    const temporaryElement = document.createElement('div');

    temporaryElement.textContent = input;

    return temporaryElement.innerHTML;
}
function displayEvents() {

    const eventList = document.getElementById('event-list');

     const oldDynamicEvents =
        eventList.querySelectorAll('.dynamic-event');

    oldDynamicEvents.forEach(function (eventCard) {
        eventCard.remove();
    });

    // eventList.innerHTML = '';

    events.forEach(function (event) {

        const eventCard = document.createElement('section');
        eventCard.classList.add('dynamic-event');

        eventCard.classList.add('event-card');

        eventCard.innerHTML = `
           <span class="icon style2 major fa-book"></span>

            <h3>${event.name}</h3>

            <p>Type: ${event.type}</p>

            <p>${event.description}</p>

            <p>
                Date: ${event.date}<br>
                Time: ${event.time}<br>
                Venue: ${event.location}
            </p>

            <button
                type="button"
                class="view-details"
                aria-label="View details of ${event.name}">
                View Details
            </button>
        `;

        eventList.appendChild(eventCard);
    });
}

});