JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Extract the URL search string parameters cleanly
    const queryStringData = window.location.search;
    const urlAddressParameters = new URLSearchParams(queryStringData);

    const extractedName = urlAddressParameters.get('fullname');
    const extractedEmail = urlAddressParameters.get('useremail');
    const extractedLevel = urlAddressParameters.get('explevel');
    const extractedGoal = urlAddressParameters.get('goal');

    // DOM Manipulation: Inject parameters safely into matching structural text tags
    if (extractedName) {
        document.getElementById('param-name').textContent = extractedName;
    } else {
        document.getElementById('param-name').textContent = "Not provided";
    }

    if (extractedEmail) {
        document.getElementById('param-email').textContent = extractedEmail;
    }

    if (extractedLevel) {
        document.getElementById('param-level').textContent = extractedLevel;
    }

    if (extractedGoal) {
        document.getElementById('param-goal').textContent = extractedGoal;
    }
});