// Countdown timer to Valentine's Day 2026
function updateCountdown() {
    const now = new Date();
    const valentine = new Date('February 14, 2026 00:00:00');
    const diff = valentine - now;

    if (diff <= 0) {
        document.getElementById('countdown').innerText = 'Happy Valentine\'s Day!';
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('countdown').innerText = 
        `${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Typing effect for question
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

const questionText = "Will you be my Valentine?";
typeWriter(document.getElementById('questionText'), questionText);

// Slideshow
let currentSlide = 0;
const slides = document.querySelectorAll('.crush-image');
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

document.getElementById('nextBtn').addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
});

document.getElementById('prevBtn').addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
});

// Auto slideshow
setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}, 5000);

// No button movement and messages
const noBtn = document.getElementById('noBtn');
const noMessages = [
    "Are you sure? 😢",
    "Please reconsider! 💔",
    "Think again! ❤️",
    "Don't break my heart! 💔",
    "One more chance? 😘"
];
let messageIndex = 0;

noBtn.addEventListener('mouseover', () => {
    const container = document.querySelector('.container');
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    let newLeft = Math.random() * (containerRect.width - btnRect.width);
    let newTop = Math.random() * (containerRect.height - btnRect.height);

    newLeft = Math.max(0, Math.min(newLeft, containerRect.width - btnRect.width));
    newTop = Math.max(0, Math.min(newTop, containerRect.height - btnRect.height));

    noBtn.style.position = 'absolute';
    noBtn.style.left = newLeft + 'px';
    noBtn.style.top = newTop + 'px';

    // Show message
    const noMsgDiv = document.getElementById('noMessages');
    noMsgDiv.innerText = noMessages[messageIndex % noMessages.length];
    noMsgDiv.classList.remove('hidden');
    messageIndex++;
    setTimeout(() => noMsgDiv.classList.add('hidden'), 2000);
});

// Yes button click
document.getElementById('yesBtn').addEventListener('click', () => {
    playSound('click');
    document.querySelector('.question').classList.add('hidden');
    document.getElementById('celebration').classList.remove('hidden');
    createConfetti();
    createFireworks();
    playMusic();
    typePoem();
    growRose();
});

// Background music
function playMusic() {
    const audio = document.getElementById('bgMusic');
    audio.play().catch(e => console.log('Audio play failed:', e));
}

// Sound effects
function playSound(soundId) {
    const audio = document.getElementById(soundId);
    if (audio) audio.play().catch(e => console.log('Sound play failed:', e));
}

// Hearts floating animation with click
let score = 0;
function createHearts() {
    const heartsContainer = document.getElementById('hearts');
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerText = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
        heart.addEventListener('click', () => {
            score++;
            document.getElementById('score').innerText = score;
            playSound('click');
            heart.remove();
        });
        heartsContainer.appendChild(heart);

        setTimeout(() => {
            if (heart.parentNode) heart.remove();
        }, 5000);
    }, 500);
}

createHearts();

// Confetti effect
function createConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.id = 'confetti';
    confettiContainer.style.position = 'absolute';
    confettiContainer.style.top = '0';
    confettiContainer.style.left = '0';
    confettiContainer.style.width = '100%';
    confettiContainer.style.height = '100%';
    confettiContainer.style.pointerEvents = 'none';
    document.body.appendChild(confettiContainer);

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear infinite`;
        confettiContainer.appendChild(confetti);
    }

    setTimeout(() => {
        confettiContainer.remove();
    }, 5000);
}

// Fireworks
function createFireworks() {
    const fireworksContainer = document.getElementById('fireworks');
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.classList.add('firework');
            firework.style.left = Math.random() * 100 + 'vw';
            firework.style.top = Math.random() * 100 + 'vh';
            fireworksContainer.appendChild(firework);
            setTimeout(() => firework.remove(), 1000);
        }, i * 100);
    }
}

// Type poem
function typePoem() {
    const poemText = `Roses are red,\nViolets are blue,\nSugar is sweet,\nAnd so are you!`;
    typeWriter(document.getElementById('poem'), poemText, 150);
}

// Grow rose
function growRose() {
    document.getElementById('rose').classList.add('grown');
}

// Theme changer
const themes = [
    { bg: 'linear-gradient(135deg, #ff9a9e, #fecfef, #fecfef)', container: 'rgba(255, 255, 255, 0.8)' },
    { bg: 'linear-gradient(135deg, #667eea, #764ba2)', container: 'rgba(255, 255, 255, 0.9)' },
    { bg: 'linear-gradient(135deg, #f093fb, #f5576c)', container: 'rgba(255, 255, 255, 0.8)' }
];
let currentTheme = 0;

document.getElementById('themeBtn').addEventListener('click', () => {
    currentTheme = (currentTheme + 1) % themes.length;
    document.body.style.background = themes[currentTheme].bg;
    document.querySelector('.container').style.background = themes[currentTheme].container;
});

// Add confetti animation to CSS via JS
const style = document.createElement('style');
style.innerHTML = `
@keyframes fall {
    0% { transform: translateY(-10px) rotate(0deg); }
    100% { transform: translateY(100vh) rotate(360deg); }
}
`;
document.head.appendChild(style);