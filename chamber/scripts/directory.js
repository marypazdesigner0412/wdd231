// Footer Dates
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Hamburger Menu
const menuBtn = document.getElementById("menu-toggle");
const navList = document.getElementById("nav-list");
menuBtn.addEventListener("click", () => navList.classList.toggle("open"));

// Directory Toggle
const container = document.getElementById("member-container");
const gridBtn = document.getElementById("grid-btn");
const listBtn = document.getElementById("list-btn");

gridBtn.addEventListener("click", () => {
    container.classList.add("grid");
    container.classList.remove("list");
});

listBtn.addEventListener("click", () => {
    container.classList.add("list");
    container.classList.remove("grid");
});

// Fetch Data
const url = "data/members.json";

async function getMembers() {
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data);
}

function displayMembers(members) {
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