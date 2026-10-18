// --- DATABASE DATA ANGGOTA KELOMPOK ---
const membersData = {
    aura: {
        name: "Aura Dwi",
        role: "Web Developer",
        img: "Aura dwi .jpeg",
        desc: "Hai, semuanya! Aku seorang web developer. Tugasku adalah merancang, membangun, dan memelihara struktur serta performa sebuah website. Aku memastikan website dapat diakses dengan cepat, aman, dan berjalan tanpa kendala. Intinya, aku mengubah ide menjadi platform digital yang andal!"
    },
    nadhifah: {
        name: "Nadhifah Faiha",
        role: "App Programmer",
        img: "Nadhifah.jpeg",
        desc: "Hai, semuanya! Aku seorang app programmer. Tugasku adalah membuat aplikasi untuk HP dan komputer. Aku memastikan aplikasi berfungsi dengan baik dan mudah digunakan. Intinya, aku mengubah ide menjadi aplikasi yang bermanfaat!"
    },
    nabila: {
        name: "Farah Nabila",
        role: "Content Writer",
        img: "Nabila .jpeg",
        desc: "Hai, semuanya! Aku seorang content writer. Tugasku adalah membuat konten menarik, seperti artikel, tulisan blog, dan caption media sosial. Aku menggunakan kata-kata untuk menyampaikan ide dan menarik pembaca. Intinya, aku mengubah ide menjadi cerita yang menarik!"
    },
    kannisa: {
        name: "Kannisa Desfitra",
        role: "Graphic Designer",
        img: "Kannisa .jpeg",
        desc: "Hai, semuanya! Aku seorang graphic designer. Tugasku adalah membuat desain visual, seperti poster, logo, dan iklan. Aku memadukan warna, gambar, dan tulisan agar desain terlihat menarik. Intinya, aku mengubah ide menjadi karya visual yang kreatif!"
    },
    khalilla: {
        name: "Khalilla Andien",
        role: "Graphic Designer",
        img: "Khalilla.jpeg",
        desc: "Hai, semuanya! Aku seorang graphic designer. Tugasku adalah membuat desain visual, seperti poster, logo, dan iklan. Aku memadukan warna, gambar, dan tulisan agar desain terlihat menarik. Intinya, aku mengubah ide menjadi karya visual yang kreatif!"
    }
};

// --- AUDIO SYSTEM ---
let soundEnabled = true;
let isBgmPlaying = false;

const audioBtn = document.getElementById('audioToggle');
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx;

function initAudioContext() {
    if (!audioCtx) {
        audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

function playButtonClickSound() {
    if (!soundEnabled) return;
    initAudioContext();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.06);

    gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.06);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.06);
}

function playPopSound() {
    if (!soundEnabled) return;
    initAudioContext();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(700, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(220, audioCtx.currentTime + 0.09);

    gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.09);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.09);
}

let bgmInterval;
function startDreamyBgm() {
    if (isBgmPlaying || !soundEnabled) return;
    initAudioContext();
    isBgmPlaying = true;

    const notes = [523.25, 659.25, 783.99, 987.77, 880.00, 659.25];
    let noteIndex = 0;

    bgmInterval = setInterval(() => {
        if (!soundEnabled || !isBgmPlaying) return;

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'triangle';
        const freq = notes[noteIndex % notes.length];
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

        gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + 0.4);

        noteIndex++;
    }, 450);
}

function stopDreamyBgm() {
    isBgmPlaying = false;
    if (bgmInterval) {
        clearInterval(bgmInterval);
    }
}

if (audioBtn) {
    audioBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        soundEnabled = !soundEnabled;

        if (soundEnabled) {
            audioBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            audioBtn.style.opacity = '1';
            startDreamyBgm();
            playButtonClickSound();
        } else {
            audioBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            audioBtn.style.opacity = '0.6';
            stopDreamyBgm();
        }
    });
}

window.addEventListener('click', () => {
    initAudioContext();
    if (soundEnabled && !isBgmPlaying) {
        startDreamyBgm();
    }
}, { once: true });

// --- MODAL POP-UP LOGIC ANGGOTA ---
function openMemberModal(memberKey) {
    playButtonClickSound();
    const data = membersData[memberKey];
    if (!data) return;

    const imgEl = document.getElementById('modalImg');
    const nameEl = document.getElementById('modalName');
    const roleEl = document.getElementById('modalRole');
    const descEl = document.getElementById('modalDesc');

    if (imgEl) imgEl.src = data.img;
    if (nameEl) nameEl.innerText = data.name;
    if (roleEl) roleEl.innerHTML = `<i class="fas fa-user-tag"></i> ${data.role}`;
    if (descEl) descEl.innerText = data.desc;

    const modal = document.getElementById('memberModal');
    if (modal) {
        modal.classList.add('active');
    }
}

function closeMemberModal(event) {
    if (event) event.stopPropagation();
    playButtonClickSound();
    const modal = document.getElementById('memberModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// --- ANIMASI CANVAS GELEMBUNG ---
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
    if (Math.random() < 0.18) {
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
    if (!e.target.closest('.navbar') && !e.target.closest('iframe') && !e.target.closest('.modal-card') && !e.target.closest('.member-card')) {
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
