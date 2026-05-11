const mainnav = document.querySelector('.navigation');
const hambutton = document.querySelector('#menu');

hambutton.addEventListener('click', () => {
    mainnav.classList.toggle('show'); // Ensure the CSS handles .show
    hambutton.classList.toggle('show');

    // Toggle the button text/icon between Hamburger and X
    if (hambutton.classList.contains('show')) {
        hambutton.textContent = 'X';
    } else {
        hambutton.textContent = '☰';
    }
});