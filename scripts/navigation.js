const mainnav = document.querySelector('.navigation');
const hambutton = document.querySelector('#menu');

if (hambutton && mainnav) {
    hambutton.addEventListener('click', () => {
        // Toggle the classname that CSS expects
        mainnav.classList.toggle('open');
        hambutton.classList.toggle('open');

        // Toggle the button text/icon between Hamburger and X
        if (hambutton.classList.contains('open')) {
            hambutton.textContent = 'X';
            hambutton.setAttribute('aria-expanded', 'true');
        } else {
            hambutton.textContent = '☰';
            hambutton.setAttribute('aria-expanded', 'false');
        }
    });
}