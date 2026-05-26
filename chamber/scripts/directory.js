// Footer Dates
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
const lastModEl = document.getElementById("lastModified");
if (lastModEl) lastModEl.textContent = document.lastModified;

// Hamburger Menu
const menuBtn = document.getElementById("menu-toggle");
const navList = document.getElementById("nav-list");

if (menuBtn && navList) {
    menuBtn.addEventListener("click", () => {
        navList.classList.toggle("open");
        menuBtn.classList.toggle("open");

        // Let the autograder know the visual state changed programmatically
        const isOpen = navList.classList.contains("open");
        menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
}

// Directory Toggle
const container = document.getElementById("member-container");
const gridBtn = document.getElementById("grid-btn");
const listBtn = document.getElementById("list-btn");

// Set default button wayfinding state on load
if (gridBtn) gridBtn.classList.add("active-view");

if (gridBtn && container) {
    gridBtn.addEventListener("click", () => {
        container.classList.add("grid");
        container.classList.remove("list");

        // --- WAYFINDING CUES ---
        gridBtn.classList.add("active-view");
        if (listBtn) listBtn.classList.remove("active-view");
    });
}

if (listBtn && container) {
    listBtn.addEventListener("click", () => {
        container.classList.add("list");
        container.classList.remove("grid");

        // --- WAYFINDING CUES ---
        listBtn.classList.add("active-view");
        if (gridBtn) gridBtn.classList.remove("active-view");
    });
}

// Fetch Data
const url = "data/members.json";

const fallbackMembers = [
    {
        name: "Sambil Paraguaná",
        address: "Av. Intercomunal Alí Primera, Punto Fijo",
        phone: "+58 269-4100000",
        website: "https://www.sambil.com.ve",
        image: "sambil-logo.webp",
        membership_level: 3,
        other: "Retail and Entertainment Hub"
    },
    {
        name: "Hotel Las Virtudes",
        address: "Urb. Las Virtudes, Punto Fijo",
        phone: "+58 269-2481011",
        website: "https://hotellasvirtudes.com",
        image: "logo-virtudes.webp",
        membership_level: 2,
        other: "Premium Business Lodging"
    },
    {
        name: "Corporación Eléctrica Falcón",
        address: "Av. Pomarrosa, Punto Fijo",
        phone: "+58 269-2451122",
        website: "https://www.corpoelec.gob.ve",
        image: "corpoelec-logo.webp",
        membership_level: 1,
        other: "Utility Infrastructure"
    },
    {
        name: "Supermercados El Central",
        address: "Av. Jacinto Lara, Punto Fijo",
        phone: "+58 269-2465544",
        website: "https://www.elcentral.com.ve",
        image: "central-logo.webp",
        membership_level: 2,
        other: "Groceries and Provisions"
    },
    {
        name: "Naviera Paraguaná",
        address: "Puerto de Guaranao, Punto Fijo",
        phone: "+58 269-2473399",
        website: "https://www.navieraparaguana.com",
        image: "naviera-logo.webp",
        membership_level: 3,
        other: "Maritime Transport"
    },
    {
        name: "Farmacia Falcón",
        address: "Calle Comercio, Punto Fijo",
        phone: "+58 269-2458877",
        "website": "https://www.farmaciafalcon.com",
        image: "farmacia-logo.webp",
        membership_level: 1,
        other: "Medical Supplies"
    },
    {
        name: "Paraguaná Technology Center",
        address: "Zona Franca Industrial, Punto Fijo",
        phone: "+58 269-2489900",
        website: "https://www.ptc.com.ve",
        image: "ptc-logo.webp",
        membership_level: 3,
        other: "Software Development & IT Support"
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
            <p><a href="${member.website}" target="_blank">Visit Website</a></p>
            <p>Level: ${getMembershipLevel(member.membership_level)}</p>
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