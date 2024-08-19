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

function addButtonPressAnimation(button) {
    button.classList.add('button-press');
    setTimeout(() => {
        button.classList.remove('button-press');
    }, 200);
}



document.getElementById('homeButton').addEventListener('click', function() {
    showSection('homepage');
    addButtonPressAnimation(this);
});

document.getElementById('aboutButton').addEventListener('click', function() {
    showSection('about');
    addButtonPressAnimation(this);
});

document.getElementById('projectsButton').addEventListener('click', function() {
    showSection('projects');
    addButtonPressAnimation(this);
});

document.getElementById('contactButton').addEventListener('click', function() {
    showSection('contact');
    addButtonPressAnimation(this);
});
document.getElementById('contactForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    try {
        const response = await fetch('http://localhost:3000/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, message })
        });

        if (response.ok) {
            alert('Message sent successfully!');
        } else {
            alert('Failed to send message.');
        }
    } catch (error) {
        alert('Error sending message.');
    }
});

document.getElementById('themeToggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    document.querySelector('header').classList.toggle('dark-mode');
    document.querySelector('main').classList.toggle('dark-mode');
    document.querySelector('footer').classList.toggle('dark-mode');
    document.querySelectorAll('h1, h2').forEach(el => el.classList.toggle('dark-mode'));
    document.querySelectorAll('nav button').forEach(el => el.classList.toggle('dark-mode'));
    this.classList.toggle('dark-mode');
});

setInterval(updateClock, 1000);
updateClock();