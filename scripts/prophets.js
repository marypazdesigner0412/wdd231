const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');

// Asynchronous function to fetch data
async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();
    // console.table(data.prophets); // Temporary testing line
    displayProphets(data.prophets);
}

// Arrow function to handle data processing and DOM manipulation
const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        // Create elements to add to the div#cards element
        let card = document.createElement('section');
        let fullName = document.createElement('h2');
        let dateOfBirth = document.createElement('p');
        let placeOfBirth = document.createElement('p');
        let portrait = document.createElement('img');

        // Build the h2 content to show the prophet's full name
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;

        // Add additional birth information as requested
        dateOfBirth.textContent = `Date of Birth: ${prophet.birthdate}`;
        placeOfBirth.textContent = `Place of Birth: ${prophet.birthplace}`;

        // Build the image portrait by setting all relevant attributes
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        // Append the elements to the section card
        card.appendChild(fullName);
        card.appendChild(dateOfBirth);
        card.appendChild(placeOfBirth);
        card.appendChild(portrait);

        // Add the finished card layout into the main #cards container
        cards.appendChild(card);
    });
}

// Call the main function to run the process
getProphetData();
