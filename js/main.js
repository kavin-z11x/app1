document.addEventListener('DOMContentLoaded', () => {
    // Music Toggle logic
    const musicToggle = document.getElementById('music-toggle');
    // Using a beautiful birthday track
    const bgAudio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'); 
    bgAudio.loop = true;
    bgAudio.volume = 0.4;
    
    // Check local storage for audio state to keep it playing across pages
    const isPlaying = localStorage.getItem('musicPlaying') === 'true';
    if (isPlaying) {
        bgAudio.play().catch(e => console.log("Audio autoplay prevented by browser"));
        if(musicToggle) musicToggle.innerText = '🎵 Pause';
    }

    if (musicToggle) {
        musicToggle.addEventListener('click', () => {
            if (bgAudio.paused) {
                bgAudio.play();
                musicToggle.innerText = '🎵 Pause';
                localStorage.setItem('musicPlaying', 'true');
            } else {
                bgAudio.pause();
                musicToggle.innerText = '🎵 Play';
                localStorage.setItem('musicPlaying', 'false');
            }
        });
    }

    // Gallery Lightbox Logic
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-lightbox');

    if (galleryItems.length > 0 && lightbox) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                lightboxImg.src = item.src;
                lightbox.classList.add('active');
                gsap.from(lightboxImg, { scale: 0.8, opacity: 0, duration: 0.3, ease: "back.out(1.7)" });
            });
        });

        closeBtn.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg) {
                lightbox.classList.remove('active');
            }
        });
    }

    // Floating hearts for message.html
    const heartsContainer = document.getElementById('floating-hearts');
    if (heartsContainer) {
        const createHeart = () => {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.innerHTML = '💖';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = Math.random() * 3 + 3 + 's';
            heart.style.fontSize = Math.random() * 20 + 10 + 'px';
            heartsContainer.appendChild(heart);
            setTimeout(() => { heart.remove(); }, 6000);
        };
        setInterval(createHeart, 300);
    }
});
