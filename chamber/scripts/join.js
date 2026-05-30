// Set timestamp value immediately upon load
const timestampField = document.getElementById('formTimestamp');
if (timestampField) {
    timestampField.value = new Date().toISOString();
}

// Modal Toggle Functionality
const openModalButtons = document.querySelectorAll('.open-modal-btn');
openModalButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetedModalId = btn.getAttribute('data-modal');
        const dialog = document.getElementById(targetedModalId);
        if (dialog) dialog.showModal(); // Opens modal and traps keyboard focus for accessibility
    });
});

const closeModalButtons = document.querySelectorAll('.close-modal-btn');
closeModalButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const targetDialog = e.target.closest('dialog');
        if (targetDialog) targetDialog.close();
    });
});
// Footer Elements
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const lastModEl = document.getElementById("lastModified");
if (lastModEl) lastModEl.textContent = document.lastModified;