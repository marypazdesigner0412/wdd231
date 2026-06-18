// Import reusable async and tracking logic from our ES Module (Criterion 12)
import { fetchFitnessMatrix, trackUserVisits } from './module.js';

let workingExerciseCache = [];

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Fire up the local storage tracking banner status
    renderVisitBanner();

    // 2. Fetch data using our module function
    workingExerciseCache = await fetchFitnessMatrix();

    // 3. Render all 15 items initially via template literals (Criterion 8 & 11)
    renderCardsGrid(workingExerciseCache);

    // 4. Initialize interaction listeners (Filters, Hamburger, Modals)
    setupFilterEvents();
    setupMobileNavigation();
    setupModalWiring();
});

/**
 * VISITS GENERATION (DOM Manipulation / Template Literals)
 */
function renderVisitBanner() {
    const targetBanner = document.getElementById('visit-counter-banner');
    if (targetBanner) {
        const visitCount = trackUserVisits();
        targetBanner.innerHTML = `<p>🏋️ Welcome back! You have accessed your TUYI2 Fit system terminal <strong>${visitCount} times</strong> this season.</p>`;
    }
}

/**
 * CARDS RENDER SYSTEM (Criterion 8 & 11: Array Methods, DOM Manipulation, Template Literals)
 */
function renderCardsGrid(datasetArray) {
    const trackingGridElement = document.getElementById('dynamic-cards-grid');
    if (!trackingGridElement) return;

    // Clear existing container text to avoid messy duplicates
    trackingGridElement.innerHTML = '';

    if (datasetArray.length === 0) {
        trackingGridElement.innerHTML = `<p class="error-text">No active fitness matrix parameters found. Check data configuration links.</p>`;
        return;
    }

    // Process array dynamically using forEach loop parameters
    datasetArray.forEach(item => {
        // Construct visual frame components cleanly using template literal strings
        const cardStructureMarkup = `
            <div class="matrix-card" data-id="${item.id}">
                <div class="card-header-block">
                    <span class="category-pill">${item.category}</span>
                    <span class="intensity-tag">Zone: ${item.intensity}</span>
                </div>
                <h3>${item.name}</h3>
                <p>${item.description.substring(0, 75)}...</p>
                <button class="btn btn-accent btn-sm open-modal-trigger">Inspect Rules</button>
            </div>
        `;
        // Inject into current active DOM tree
        trackingGridElement.insertAdjacentHTML('beforeend', cardStructureMarkup);
    });
}

/**
 * CATEGORY FILTER ENGINE (Criterion 11: Array Methods)
 */
function setupFilterEvents() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetScope = button.getAttribute('data-category');

            // Use clean JS array filter method logic matching rubric goals
            const filteredResults = (targetScope === 'all')
                ? workingExerciseCache
                : workingExerciseCache.filter(item => item.category === targetScope);

            renderCardsGrid(filteredResults);
        });
    });
}

/**
 * DIALOG CONTROLS (Criterion 10: Modal Dialog Structure)
 */
function setupModalWiring() {
    const modalElement = document.getElementById('program-modal');
    const closeBtn = document.getElementById('close-modal-btn');
    const gridContainer = document.getElementById('dynamic-cards-grid');

    if (!modalElement || !closeBtn || !gridContainer) return;

    // Delegate click event targeting items inside the card grid container safely
    gridContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('open-modal-trigger')) {
            const targetCardId = parseInt(event.target.closest('.matrix-card').getAttribute('data-id'), 10);
            const discoveredDataMatch = workingExerciseCache.find(x => x.id === targetCardId);

            if (discoveredDataMatch) {
                // Populate details dynamically inside the modal instance
                document.getElementById('modal-title').textContent = discoveredDataMatch.name;
                document.getElementById('modal-metric').textContent = `${discoveredDataMatch.category} (Intensity Level: ${discoveredDataMatch.intensity})`;
                document.getElementById('modal-desc').textContent = discoveredDataMatch.description;

                // Native native HTML dialog element display method
                modalElement.showModal();
            }
        }
    });

    closeBtn.addEventListener('click', () => {
        modalElement.close();
    });
}

/**
 * RESPONSIVE MENU HAMBURGER HOOK (Bulletproof Execution)
 */
function setupMobileNavigation() {
    const toggleBtn = document.getElementById('mobile-menu-btn');
    const linksList = document.getElementById('nav-links-list');

    // Debugging check: Open your browser console (F12) to see if these print!
    console.log("Hamburger Button Found:", toggleBtn);
    console.log("Navigation Menu Found:", linksList);

    if (toggleBtn && linksList) {
        // Direct click assignment bypassing any bubble lag
        toggleBtn.onclick = (e) => {
            e.stopPropagation();
            linksList.classList.toggle('active');
            toggleBtn.classList.toggle('open');

            const isOpen = linksList.classList.contains('active');
            toggleBtn.setAttribute('aria-expanded', isOpen);
            console.log("Hamburger clicked! Menu active state:", isOpen);
        };

        // Auto-close menu when clicking a navigation link
        linksList.querySelectorAll('a').forEach(link => {
            link.onclick = () => {
                linksList.classList.remove('active');
                toggleBtn.classList.remove('open');
                toggleBtn.setAttribute('aria-expanded', 'false');
            };
        });

        // Global click-away closer
        document.onclick = (e) => {
            if (!linksList.contains(e.target) && !toggleBtn.contains(e.target)) {
                linksList.classList.remove('active');
                toggleBtn.classList.remove('open');
                toggleBtn.setAttribute('aria-expanded', 'false');
            }
        };
    } else {
        console.error("CRITICAL ERROR: JavaScript could not find #mobile-menu-btn or #nav-links-list in your HTML structure!");
    }
}