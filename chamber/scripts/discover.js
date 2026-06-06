import itemsOfInterest from '../data/discover.mjs';

document.addEventListener("DOMContentLoaded", () => {
    // 1. Execute the local storage calculation for visitor messages
    handleVisits();

    // 2. Inject the Paraguaná cards into the responsive grid area container
    renderDiscoverCards(itemsOfInterest);

    updateFooterDates();
});

function updateFooterDates() {
    const yearElement = document.getElementById("year");
    const lastModifiedElement = document.getElementById("lastModified");

    // Dynamically set the current year
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Dynamically set the last modified date from the document object
    if (lastModifiedElement) {
        lastModifiedElement.textContent = document.lastModified;
    }
}

/**
 * Tracks and displays tailored messages based on the user's return interval.
 */
function handleVisits() {
    const messageElement = document.getElementById("visitor-message");
    if (!messageElement) return;

    const lastVisit = localStorage.getItem("lastChamberVisit");
    const now = Date.now();

    localStorage.setItem("lastChamberVisit", now);

    if (!lastVisit) {
        messageElement.textContent = "Welcome! Let us know if you have any questions.";
        return;
    }

    const msPerDay = 24 * 60 * 60 * 1000;
    const timeDifference = now - Number(lastVisit);

    if (timeDifference < msPerDay) {
        messageElement.textContent = "Back so soon! Awesome!";
    } else {
        const days = Math.floor(timeDifference / msPerDay);
        const dayWord = days === 1 ? "day" : "days";
        messageElement.textContent = `You last visited ${days} ${dayWord} ago.`;
    }
}

function renderDiscoverCards(data) {
    const container = document.getElementById("gallery-container");
    if (!container) return;

    container.innerHTML = "";

    data.forEach((item, index) => {
        const card = document.createElement("div");
        card.classList.add("card", `card-${index + 1}`);

        card.innerHTML = `
            <h2>${item.name}</h2>
            <figure>
                <img src="${item.image}" alt="${item.name}" width="300" height="200" loading="lazy">
            </figure>
            <address>${item.address}</address>
            <p>${item.description}</p>
            <button class="btn-learn">Learn More</button>
        `;

        container.appendChild(card);

        const learnMoreBtn = card.querySelector(".btn-learn");
        learnMoreBtn.addEventListener("click", () => {
            alert(`More information about ${item.name} will be available soon!`);
        });
    });
}