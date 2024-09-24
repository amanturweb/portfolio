// Function to smoothly scroll to an element
function smoothScroll(target, duration) {
    const targetElement = document.querySelector(target);
    const targetPosition = targetElement.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();

    function animation(currentTime) {
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1); // Ensure progress is between 0 and 1
        window.scrollTo(0, startPosition + distance * easeInOutQuad(progress));

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    function easeInOutQuad(t) {
        return t < 0.5
            ? 2 * t * t
            : -1 + (4 - 2 * t) * t;
    }

    requestAnimationFrame(animation);
}

// Event listener for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = this.getAttribute('href');
        smoothScroll(target, 200); // Duration in milliseconds
    });
});


let currentRepoUrl = '';

function showModal(repoUrl) {
    currentRepoUrl = repoUrl; // Set the current repository URL
    document.getElementById('details-button').onclick = function() {
        window.open(currentRepoUrl, '_blank'); // Open in new tab
    };
    document.getElementById('modal').style.display = "block"; // Show the modal
}

function closeModal() {
    document.getElementById('modal').style.display = "none"; // Hide the modal
}

// Close modal when clicking outside of the modal content
window.onclick = function(event) {
    if (event.target == document.getElementById('modal')) {
        closeModal();
    }
};
