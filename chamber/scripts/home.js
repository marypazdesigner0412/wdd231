// ==========================================
// 1. GLOBAL VARIABLES & CONFIGURATION
// ==========================================
const apiKey = "3671579f8ffc1628a56ca414fc6f2154";
const lat = "11.7042";  // Punto Fijo Latitude
const lon = "-70.1989"; // Punto Fijo Longitude

const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const membersUrl = "data/members.json";

// Footer Elements
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const lastModEl = document.getElementById("lastModified");
if (lastModEl) lastModEl.textContent = document.lastModified;

// Mobile Menu Toggle
const menuBtn = document.getElementById("menu-toggle");
const navList = document.getElementById("nav-list");

if (menuBtn && navList) {
    menuBtn.addEventListener("click", () => {
        navList.classList.toggle("open");
        menuBtn.classList.toggle("open");
        const isOpen = navList.classList.contains("open");
        menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
}


// ==========================================
// 2. WEATHER FETCHING & DISPLAY LOGIC
// ==========================================
async function fetchWeather() {
    try {
        // Fetch Current Weather
        const responseCurrent = await fetch(currentUrl);
        if (!responseCurrent.ok) {
            throw new Error(`Current weather HTTP error! status: ${responseCurrent.status}`);
        }
        const currentData = await responseCurrent.json();
        displayCurrentWeather(currentData);

        // Fetch Forecast
        const responseForecast = await fetch(forecastUrl);
        if (!responseForecast.ok) {
            throw new Error(`Forecast HTTP error! status: ${responseForecast.status}`);
        }
        const forecastData = await responseForecast.json();
        displayForecast(forecastData);

    } catch (error) {
        console.error("Error fetching weather data:", error);

        // Provide friendly visual feedback instead of leaving it stuck on "Loading..."
        const currentContainer = document.getElementById("weather-current");
        if (currentContainer) {
            currentContainer.innerHTML = `<p style="color: #666; font-size: 0.9rem;">Weather temporarily unavailable.</p>`;
        }
    }
}

function displayCurrentWeather(data) {
    const container = document.getElementById("weather-current");
    if (!container) return;

    const temp = Math.round(data.main.temp);
    const desc = data.weather[0].description;
    const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

    container.innerHTML = `
        <div class="weather-info">
            <img src="${icon}" alt="${desc}">
            <span><strong>${temp}°C</strong> - ${desc.toUpperCase()}</span>
        </div>
    `;
}

function displayForecast(data) {
    const container = document.getElementById("weather-forecast");
    if (!container) return;
    container.innerHTML = "";

    // Filter out rows to get 3 consecutive daily forecasts roughly midday (12:00:00)
    const dailyData = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

    dailyData.forEach(day => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
        const temp = Math.round(day.main.temp);

        const forecastItem = document.createElement("div");
        forecastItem.className = "forecast-day";
        forecastItem.innerHTML = `<span>${dayName}:</span> <strong>${temp}°C</strong>`;
        container.appendChild(forecastItem);
    });
}


// ==========================================
// 3. MEMBER SPOTLIGHT LOGIC
// ==========================================
async function loadSpotlights() {
    try {
        const response = await fetch(membersUrl);
        const members = await response.json();

        // Filter out only Gold (3) and Silver (2) members
        const qualifiedMembers = members.filter(m => m.membership_level === 3 || m.membership_level === 2);

        // Shuffle the array randomly
        const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());

        // Select up to 3 members from the shuffled array
        const selectedSpotlights = shuffled.slice(0, 3);

        displaySpotlights(selectedSpotlights);
    } catch (error) {
        console.error("Error loading member spotlights:", error);
    }
}

function displaySpotlights(spotlights) {
    const container = document.getElementById("spotlight-cards");
    if (!container) return;
    container.innerHTML = "";

    spotlights.forEach(member => {
        const levelText = member.membership_level === 3 ? "Gold" : "Silver";
        const card = document.createElement("div");
        card.className = `spotlight-card level-${levelText.toLowerCase()}`;

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} Logo">
            <h3>${member.name}</h3>
            <p class="tagline"><em>${member.other}</em></p>
            <hr>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><a href="${member.website}" target="_blank" class="member-site-link">Visit Website</a></p>
            <span class="badge">${levelText} Member</span>
        `;
        container.appendChild(card);
    });
}


// ==========================================
// 4. INITIALIZATION FUNCTION CALLS
// ==========================================
// These execute automatically as soon as the browser loads home.js
fetchWeather();
loadSpotlights();