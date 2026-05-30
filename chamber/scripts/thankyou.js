// Unpack form variables via URI components
const queryStrings = new URLSearchParams(window.location.search);

const fetchParam = (key) => queryStrings.get(key) || "Empty Entry";

// Convert the structural form stamp to a clean regional representation
const submissionStamp = queryStrings.get('timestamp');
let standardDateTime = "Empty Entry";
if (submissionStamp) {
    standardDateTime = new Date(submissionStamp).toLocaleString();
}

// Render out ONLY required profile details requested by the rubric
const targetOutputDiv = document.getElementById('resultContainer');
if (targetOutputDiv) {
    targetOutputDiv.innerHTML = `
        <p class="data-row"><span class="data-label">First Name:</span> ${fetchParam('firstName')}</p>
        <p class="data-row"><span class="data-label">Last Name:</span> ${fetchParam('lastName')}</p>
        <p class="data-row"><span class="data-label">Email:</span> ${fetchParam('email')}</p>
        <p class="data-row"><span class="data-label">Mobile Number:</span> ${fetchParam('phone')}</p>
        <p class="data-row"><span class="data-label">Organization Name:</span> ${fetchParam('orgName')}</p>
        <p class="data-row"><span class="data-label">Timestamp Loaded:</span> ${standardDateTime}</p>
    `;
}

// Footer Elements
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const lastModEl = document.getElementById("lastModified");
if (lastModEl) lastModEl.textContent = document.lastModified;