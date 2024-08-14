function updateClock() {
    const clockElement = document.getElementById('clock');
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}

function showSection(sectionId) {
    const sections = document.querySelectorAll('main section');
    sections.forEach(section => {
        section.style.display = section.id === sectionId ? 'block' : 'none';
    });
}

document.getElementById('homeButton').addEventListener('click', function() {
    showSection('homepage');
});

document.getElementById('aboutButton').addEventListener('click', function() {
    showSection('about');
});

document.getElementById('projectsButton').addEventListener('click', function() {
    showSection('projects');
});

setInterval(updateClock, 1000);
updateClock();