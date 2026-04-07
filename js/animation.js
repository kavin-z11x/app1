document.addEventListener('DOMContentLoaded', () => {
    
    // Page Transitions
    gsap.from('body', { opacity: 0, duration: 0.8, ease: "power2.inOut" });

    // Intro Page Animations
    if (document.querySelector('.intro-page')) {
        const tl = gsap.timeline();
        
        tl.from(".intro-text-1", {
            y: 50,
            opacity: 0,
            duration: 1.5,
            ease: "power3.out",
            delay: 0.5
        })
        .to(".intro-text-1", {
            y: -50,
            opacity: 0,
            duration: 1,
            ease: "power3.in",
            delay: 1.5
        })
        .set(".intro-text-1", { display: "none" })
        .set(".intro-text-2", { className: "intro-text-2" }) // remove hidden
        .from(".intro-text-2", {
            scale: 0.8,
            opacity: 0,
            duration: 1.5,
            ease: "elastic.out(1, 0.5)"
        })
        .set("#enter-btn", { className: "" })
        .from("#enter-btn", {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.5");
    }

    // Home Page Animations
    if (document.querySelector('.hero-title')) {
        gsap.from('.hero-title', { 
            y: 50, 
            opacity: 0, 
            duration: 1, 
            ease: "back.out(1.7)", 
            delay: 0.2 
        });
        gsap.from('.hero-subtitle', { 
            y: 30, 
            opacity: 0, 
            duration: 1, 
            ease: "power2.out", 
            delay: 0.6 
        });
        gsap.from('.cake-container', {
            scale: 0,
            opacity: 0,
            duration: 1.2,
            ease: "elastic.out(1, 0.5)",
            delay: 1
        });
    }

    // Navbar animation
    if(document.querySelector('.navbar') && !document.querySelector('.intro-page')) {
        gsap.from('.navbar', {
            y: -100,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });
    }

    // Message Page Typewriter using GSAP TextPlugin
    if (document.getElementById('typewriter')) {
        gsap.registerPlugin(TextPlugin);
        const text = `Dear Iswariya,<br><br>You are not just my sister, you are my best friend. Thank you for always being there, for your boundless love, and for lighting up our world.<br><br>Wishing you the happiest 24th Birthday! May all your dreams come true. 💖`;
        
        gsap.to("#typewriter", {
            duration: 6,
            text: text,
            ease: "none",
            delay: 0.5
        });
    }

    // Gallery Animations
    if (document.querySelector('.gallery-grid')) {
        gsap.from('.gallery-item', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.2)"
        });
    }
});
