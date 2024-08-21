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

document.querySelector('#themeToggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    document.querySelector('header').classList.toggle('dark-mode');
    document.querySelector('main').classList.toggle('dark-mode');
    document.querySelector('footer').classList.toggle('dark-mode');
    document.querySelectorAll('h1, h2').forEach(el => el.classList.toggle('dark-mode'));
    document.querySelectorAll('nav button').forEach(el => el.classList.toggle('dark-mode'));
    this.classList.toggle('dark-mode');

    // Trigger scroll event to apply the correct gradient
    window.dispatchEvent(new Event('scroll'));
});

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollPercentage = scrollPosition / maxScroll;

    const lightStartColor = [255, 111, 97]; // #ff6f61
    const lightMidColor = [255, 140, 0]; // #ff8c00
    const lightEndColor = [255, 75, 62]; // #ff4b3e

    const darkStartColor = [26, 26, 26]; // #1a1a1a
    const darkEndColor = [51, 51, 51]; // #333

    const interpolateColor = (start, end, percentage) => {
        return start.map((startValue, index) => {
            const endValue = end[index];
            return Math.round(startValue + (endValue - startValue) * percentage);
        });
    };

    if (document.body.classList.contains('dark-mode')) {
        const newColor1 = interpolateColor(darkStartColor, darkEndColor, scrollPercentage);
        const newColor2 = interpolateColor(darkEndColor, darkStartColor, scrollPercentage);
        document.body.style.background = `linear-gradient(135deg, rgb(${newColor1.join(',')}), rgb(${newColor2.join(',')}))`;
    } else {
        const newColor1 = interpolateColor(lightStartColor, lightMidColor, scrollPercentage);
        const newColor2 = interpolateColor(lightMidColor, lightEndColor, scrollPercentage);
        document.body.style.background = `linear-gradient(135deg, rgb(${newColor1.join(',')}), rgb(${newColor2.join(',')}))`;
    }
});

setInterval(updateClock, 1000);
updateClock();