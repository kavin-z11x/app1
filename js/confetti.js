document.addEventListener('DOMContentLoaded', () => {
    const surpriseBtn = document.getElementById('surprise-btn');
    const surpriseContent = document.getElementById('surprise-content');
    const balloonsContainer = document.getElementById('balloons-container');

    if (surpriseBtn) {
        surpriseBtn.addEventListener('click', () => {
            // Hide button, show content
            gsap.to(surpriseBtn, {
                scale: 0,
                opacity: 0,
                duration: 0.5,
                ease: "back.in(1.7)",
                onComplete: () => {
                    surpriseBtn.classList.add('hidden');
                    surpriseContent.classList.remove('hidden');
                    
                    // Reveal content animation
                    gsap.from(surpriseContent, {
                        y: 50,
                        scale: 0.8,
                        opacity: 0,
                        duration: 1,
                        ease: "elastic.out(1, 0.7)"
                    });

                    // Trigger confetti
                    fireConfetti();
                    
                    // Trigger balloons
                    releaseBalloons();
                }
            });
        });
    }

    function fireConfetti() {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            // since we're using canvas-confetti via cdn
            if (typeof confetti !== 'undefined') {
                confetti(Object.assign({}, defaults, { 
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                    colors: ['#f8c8dc', '#d8b4e2', '#ffd700', '#ffffff']
                }));
                confetti(Object.assign({}, defaults, { 
                    particleCount,
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                    colors: ['#f8c8dc', '#d8b4e2', '#ffd700', '#ffffff']
                }));
            }
        }, 250);
    }

    function releaseBalloons() {
        for(let i = 0; i < 20; i++) {
            const balloon = document.createElement('div');
            balloon.classList.add('balloon');
            
            // Random properties
            const left = Math.random() * 100;
            const delay = Math.random() * 2;
            const duration = Math.random() * 3 + 4;
            const colors = ['#f8c8dc', '#d8b4e2', '#ffd700', '#ff6b6b', '#a8e6cf'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            balloon.style.left = `${left}%`;
            balloon.style.backgroundColor = color;
            
            balloonsContainer.appendChild(balloon);
            
            gsap.to(balloon, {
                y: -window.innerHeight - 200,
                x: (Math.random() - 0.5) * 100,
                rotation: (Math.random() - 0.5) * 45,
                duration: duration,
                delay: delay,
                ease: "power1.inOut",
                onComplete: () => balloon.remove()
            });
        }
    }
});
