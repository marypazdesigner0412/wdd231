const courses = [
    { subject: 'CSE', number: 110, title: 'Intro to Programming', credits: 2, completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, completed: false },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, completed: false },
    { subject: 'WDD', number: 131, title: 'Web Frontend I', credits: 2, completed: true },
    { subject: 'WDD', number: 231, title: 'Web Frontend II', credits: 2, completed: false }
];

const courseContainer = document.querySelector('#course-list');
const courseDetails = document.getElementById("course-details");

courseDetails.addEventListener("click", (event) => {
    if (event.target === courseDetails) {
        courseDetails.close();
    }
});

// Modal render function
function displayCourseDetails(course) {
    courseDetails.innerHTML = `
        <button id="closeModal" aria-label="Close dialog window">❌</button>
        <h2>${course.subject} ${course.number}</h2>
        <h3>${course.title}</h3>
        <p><strong>Credits</strong>: ${course.credits}</p>
        <p><strong>Status</strong>: ${course.completed ? 'Completed' : 'In progress'}</p>
    `;

    courseDetails.showModal();

    const closeModalBtn = courseDetails.querySelector("#closeModal");
    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", () => {
            courseDetails.close();
        });
    }
}

function displayCourses(filteredCourses) {
    courseContainer.innerHTML = ""; // Clear existing content

    filteredCourses.forEach(course => {
        let card = document.createElement("div");
        card.className = "course-card";

        // Match the screenshot text: "SUBJECT NUMBER"
        card.textContent = `${course.subject} ${course.number}`;

        // Open details dialog when the course card is clicked
        card.addEventListener("click", () => {
            displayCourseDetails(course);
        });

        // Add a "completed" class if the course is done (to change color in CSS)
        if (course.completed) {
            card.classList.add("completed");
        }

        courseContainer.appendChild(card);
    });

    // Calculate total credits for displayed courses
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    document.querySelector("#total-credits").textContent = totalCredits;
}

// Button Listeners
document.querySelector("#all").addEventListener("click", () => displayCourses(courses));
document.querySelector("#cse").addEventListener("click", () => {
    displayCourses(courses.filter(c => c.subject === 'CSE'));
});
document.querySelector("#wdd").addEventListener("click", () => {
    displayCourses(courses.filter(c => c.subject === 'WDD'));
});

// Initial call to show all courses
displayCourses(courses);