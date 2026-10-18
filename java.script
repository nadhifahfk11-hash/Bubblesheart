// Audio Effect State
let soundEnabled = true;
const audioBtn = document.getElementById('audioToggle');

if (audioBtn) {
    audioBtn.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        audioBtn.innerHTML = soundEnabled ? '<i class="fas fa-volume-up"></i>' : '<i class="fas fa-volume-mute"></i>';
        audioBtn.style.opacity = soundEnabled ? '1' : '0.6';
    });
}

function playPopSound() {
    if (!soundEnabled) return;
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(650, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(220, audioCtx.currentTime + 0.08);

        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + 0.08);
    } catch (e) {}
}

// Background Canvas Interactive Bubbles
const canvas = document.getElementById('bubbleCanvas');
const ctx = canvas.getContext('2d');

let width, height;
function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

let mouse = { x: null, y: null };
window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
    if (Math.random() < 0.2) {
        createParticle(e.x, e.y);
    }
});

class Bubble {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 100;
        this.size = Math.random() * 16 + 8;
        this.speedY = Math.random() * 1.5 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.isHeart = Math.random() > 0.65;
        this.color = `hsla(${Math.random() * 40 + 330}, 100%, 75%, ${this.opacity})`;
    }

    update() {
        this.y -= this.speedY;
        this.x += Math.sin(this.y * 0.02) * 0.5;

        if (mouse.x && mouse.y) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 80) {
                this.x -= dx * 0.03;
                this.y -= dy * 0.03;
            }
        }

        if (this.y < -30) {
            this.reset();
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = this.color;

        if (this.isHeart) {
            ctx.beginPath();
            let topCurve = this.size * 0.3;
            ctx.moveTo(0, topCurve);
            ctx.bezierCurveTo(0, 0, -this.size / 2, 0, -this.size / 2, topCurve);
            ctx.bezierCurveTo(-this.size / 2, (this.size + topCurve) / 2, 0, this.size, 0, this.size);
            ctx.bezierCurveTo(0, this.size, this.size / 2, (this.size + topCurve) / 2, this.size / 2, topCurve);
            ctx.bezierCurveTo(this.size / 2, 0, 0, 0, 0, topCurve);
            ctx.closePath();
            ctx.fill();
        } else {
            ctx.beginPath();
            ctx.arc(0, 0, this.size, 0, Math.PI * 2);
            ctx.fill();

            ctx.beginPath();
            ctx.arc(-this.size * 0.3, -this.size * 0.3, this.size * 0.25, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
            ctx.fill();
        }

        ctx.restore();
    }
}

const bubbles = Array.from({ length: 45 }, () => new Bubble());

function animate() {
    ctx.clearRect(0, 0, width, height);
    bubbles.forEach(b => {
        b.update();
        b.draw();
    });
    requestAnimationFrame(animate);
}
animate();

function createParticle(x, y) {
    const p = document.createElement('div');
    p.className = 'pop-particle';
    const size = Math.random() * 18 + 8;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;

    const colors = ['#ff85a2', '#fef08a', '#bbee33', '#60a5fa', '#f472b6'];
    p.style.background = colors[Math.floor(Math.random() * colors.length)];

    p.style.left = `${x + (Math.random() * 30 - 15)}px`;
    p.style.top = `${y + (Math.random() * 30 - 15)}px`;

    document.body.appendChild(p);
    setTimeout(() => p.remove(), 800);
}

window.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar') && !e.target.closest('iframe')) {
        playPopSound();
        for (let i = 0; i < 6; i++) {
            createParticle(e.clientX, e.clientY);
        }
    }
});

const logo = document.getElementById('interactiveLogo');
if (logo) {
    logo.addEventListener('click', (e) => {
        e.stopPropagation();
        playPopSound();
        logo.style.transform = 'scale(1.15) rotate(10deg)';
        setTimeout(() => {
            logo.style.transform = '';
        }, 400);
    });
}
