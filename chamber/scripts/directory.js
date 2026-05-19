// Footer Dates
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
const lastModEl = document.getElementById("lastModified");
if (lastModEl) lastModEl.textContent = document.lastModified;

// Hamburger Menu
const menuBtn = document.getElementById("menu-toggle");
const navList = document.getElementById("nav-list");
if (menuBtn && navList) {
    menuBtn.addEventListener("click", () => navList.classList.toggle("open"));
}

// Directory Toggle
const container = document.getElementById("member-container");
const gridBtn = document.getElementById("grid-btn");
const listBtn = document.getElementById("list-btn");

if (gridBtn && container) {
    gridBtn.addEventListener("click", () => {
        container.classList.add("grid");
        container.classList.remove("list");
    });
}

if (listBtn && container) {
    listBtn.addEventListener("click", () => {
        container.classList.add("list");
        container.classList.remove("grid");
    });
}

// Fetch Data
const url = "data/members.json";

const fallbackMembers = [
    {
        name: "Sambil Paraguaná",
        address: "Av. Intercomunal Alí Primera, Punto Fijo",
        phone: "+58 269-4100000",
        url: "https://www.sambil.com.ve",
        image: "sambil-logo.webp",
        level: 3,
        other: "Retail and Entertainment Hub"
    },
    {
        name: "Hotel Las Virtudes",
        address: "Urb. Las Virtudes, Punto Fijo",
        phone: "+58 269-2481011",
        url: "https://hotellasvirtudes.com",
        image: "logo-virtudes.webp",
        level: 2,
        other: "Premium Business Lodging"
    }
];

async function getMembers() {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
        const data = await response.json();
        if (!container) return;
        displayMembers(data);
    } catch (err) {
        console.warn('Fetch failed; using fallback member data.', err);
        if (!container) return;
        container.innerHTML = '<p class="error">Unable to fetch directory data. Showing fallback directory content.</p>';
        displayMembers(fallbackMembers);
    }
}

function displayMembers(members) {
    if (!container) return;
    container.innerHTML = ""; // Clear current content
    members.forEach(member => {
        let card = document.createElement("section");
        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><a href="${member.url}" target="_blank">Visit Website</a></p>
            <p>Level: ${getMembershipLevel(member.level)}</p>
        `;
        container.appendChild(card);
    });
}

function getMembershipLevel(level) {
    if (level === 3) return "Gold";
    if (level === 2) return "Silver";
    return "Member";
}

getMembers();