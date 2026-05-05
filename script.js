/* ===================================================
   BAUTIZO — ELIAN CRISTALINAS RAMIREZ
   Lógica del Gran Show
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    initAudio();
    initRSVP();
    initAnimations();
});

// 1. CUENTA REGRESIVA
function initCountdown() {
    const countdownDate = new Date("July 26, 2026 12:00:00").getTime();
    const elements = {
        d: document.getElementById('days'),
        h: document.getElementById('hours'),
        m: document.getElementById('minutes'),
        s: document.getElementById('seconds')
    };

    if (!elements.d) return;

    const x = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        elements.d.innerHTML = days;
        elements.h.innerHTML = hours;
        elements.m.innerHTML = minutes;
        elements.s.innerHTML = seconds;

        if (distance < 0) {
            clearInterval(x);
            document.getElementById('countdown').innerHTML = "¡EL SHOW HA COMENZADO!";
        }
    }, 1000);
}

// 2. AUDIO
function initAudio() {
    const musicBtn = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    if (!musicBtn || !bgMusic) return;

    let isPlaying = false;

    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.innerHTML = '<i class="fas fa-music"></i>';
        } else {
            bgMusic.play();
            musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    });
}

// 3. RSVP
function initRSVP() {
    const rsvpBtn = document.getElementById('rsvp-btn');
    if (!rsvpBtn) return;

    rsvpBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const phone = "525512345678";
        const message = encodeURIComponent(`¡Hola! Confirmo mi asistencia al gran show del bautizo de Elian. ¡Muchas gracias!`);
        window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    });
}

// 4. ANIMACIONES SHOW
function initAnimations() {
    // Observador para revelar elementos al hacer scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-up, .fade-in').forEach(el => observer.observe(el));

    // Si estamos en invitacion.html, disparar confeti de celebración
    if (window.location.pathname.includes('invitacion.html')) {
        setTimeout(launchShowConfetti, 1000);
    }
}

function launchShowConfetti() {
    if (typeof confetti === 'function') {
        const count = 200;
        const defaults = {
            origin: { y: 0.7 },
            colors: ['#D72638', '#87CEEB', '#FFD700', '#FFFFFF']
        };

        function fire(particleRatio, opts) {
            confetti({
                ...defaults,
                ...opts,
                particleCount: Math.floor(count * particleRatio)
            });
        }

        fire(0.25, { spread: 26, startVelocity: 55 });
        fire(0.2, { spread: 60 });
        fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
        fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
        fire(0.1, { spread: 120, startVelocity: 45 });
    }
}
