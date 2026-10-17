/* ===================================================================
   🌸 BUBBLES HEART - JAVASCRIPT LOGIC 🌸
   Web Programmer: Aura Dwi Ramadhani
   Kelompok 2 | Kelas X. D
   =================================================================== */

// Inisialisasi Audio Synth (Web Audio API) untuk Efek Suara "Pop" Gelembung
let audioCtx = null;
let isSoundEnabled = true;

function initAudio() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
  }
}

// Fungsi menghasilkan suara "Plop / Pop!" manis tanpa file audio eksternal
function playBubblePopSound(frequency = 520) {
  if (!isSoundEnabled) return;
  try {
    initAudio();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    // Nada pitch melonjak sedikit lalu melandai (seperti gelembung meletus)
    osc.type = 'sine';
    const now = audioCtx.currentTime;
    
    osc.frequency.setValueAtTime(frequency, now);
    osc.frequency.exponentialRampToValueAtTime(frequency * 1.6, now + 0.05);
    osc.frequency.exponentialRampToValueAtTime(frequency * 0.4, now + 0.12);
    
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start(now);
    osc.stop(now + 0.13);
  } catch (e) {
    console.log('Audio efek tidak dapat diputar:', e);
  }
}

// -------------------------------------------------------------------
// 🎈 1. GENERATOR GELEMBUNG MENGAPUNG (FLOATING BUBBLES)
// -------------------------------------------------------------------
const bubbleContainer = document.getElementById('bubble-container');

function createBubble() {
  if (!bubbleContainer) return;
  
  const bubble = document.createElement('div');
  bubble.classList.add('floating-bubble');
  
  // Ukuran acak antara 24px sampai 75px
  const size = Math.floor(Math.random() * 52) + 24;
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  
  // Posisi horizontal acak di layar
  bubble.style.left = `${Math.random() * 96}%`;
  
  // Durasi animasi mengapung acak antara 8s - 16s
  const duration = Math.random() * 8 + 8;
  bubble.style.animationDuration = `${duration}s`;
  
  // Klik untuk meletuskan gelembung
  bubble.addEventListener('click', (e) => {
    e.stopPropagation();
    popBubble(bubble, e.clientX, e.clientY);
  });
  
  bubbleContainer.appendChild(bubble);
  
  // Hapus gelembung setelah selesai mengapung agar hemat memori
  setTimeout(() => {
    if (bubble.parentNode) {
      bubble.remove();
    }
  }, duration * 1000);
}

// Efek Meletus dengan percikan partikel mini (Sparkle Particles)
function popBubble(bubbleEl, x, y) {
  playBubblePopSound(Math.floor(Math.random() * 200) + 480);
  
  createPopParticles(x, y);
  bubbleEl.style.transform = 'scale(1.4)';
  bubbleEl.style.opacity = '0';
  
  setTimeout(() => {
    if (bubbleEl.parentNode) {
      bubbleEl.remove();
    }
  }, 200);
}

function createPopParticles(x, y) {
  const particleCount = 6;
  const colors = ['#ff85b3', '#ffffff', '#70a9fc', '#ffe066'];
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.width = '7px';
    particle.style.height = '7px';
    particle.style.borderRadius = '50%';
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.zIndex = '9999';
    particle.style.pointerEvents = 'none';
    particle.style.boxShadow = '0 0 6px rgba(255, 255, 255, 0.8)';
    
    document.body.appendChild(particle);
    
    const angle = (i / particleCount) * Math.PI * 2;
    const distance = Math.random() * 35 + 20;
    const destX = x + Math.cos(angle) * distance;
    const destY = y + Math.sin(angle) * distance;
    
    particle.animate([
      { transform: 'translate(0, 0) scale(1)', opacity: 1 },
      { transform: `translate(${destX - x}px, ${destY - y}px) scale(0)`, opacity: 0 }
    ], {
      duration: 350,
      easing: 'ease-out'
    }).onfinish = () => particle.remove();
  }
}

// Jalankan pembuatan gelembung secara berkala
setInterval(createBubble, 1400);

// Buat beberapa gelembung awal saat pertama kali dimuat
for (let i = 0; i < 6; i++) {
  setTimeout(createBubble, i * 400);
}

// -------------------------------------------------------------------
// 🌸 2. EFEK 3D TILT PADA KARTU ANGGOTA TIM
// -------------------------------------------------------------------
const memberCards = document.querySelectorAll('.member-card[data-tilt]');

memberCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
  });
  
  // Suara saat kartu anggota diklik
  card.addEventListener('click', (e) => {
    playBubblePopSound(600);
    createPopParticles(e.clientX, e.clientY);
  });
});

// -------------------------------------------------------------------
// 🔊 3. TOMBOL PENGATUR SUARA (SOUND ON / OFF)
// -------------------------------------------------------------------
const soundBtn = document.getElementById('sound-btn');

if (soundBtn) {
  soundBtn.addEventListener('click', () => {
    isSoundEnabled = !isSoundEnabled;
    
    if (isSoundEnabled) {
      soundBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i> <span>Sound: ON</span>';
      soundBtn.style.opacity = '1';
      playBubblePopSound(650);
    } else {
      soundBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i> <span>Sound: OFF</span>';
      soundBtn.style.opacity = '0.7';
    }
  });
}

// Klik di mana saja pada latar belakang membuat sedikit gelembung kecil
document.addEventListener('click', (e) => {
  // Hanya jika yang diklik bukan tombol atau tautan
  if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'A' && !e.target.closest('button') && !e.target.closest('a')) {
    createPopParticles(e.clientX, e.clientY);
  }
});
