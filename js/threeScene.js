const initThreeJS = () => {
    const container = document.getElementById('three-canvas-container');
    if (!container) return;

    // Check if we want stars (intro) or particles (home)
    const isIntro = document.body.classList.contains('intro-page');
    
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Particles/Stars
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = isIntro ? 1500 : 700;
    
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);

    const color1 = new THREE.Color(0xffb6c1); // Pink
    const color2 = new THREE.Color(0xd8b4e2); // Purple
    const color3 = new THREE.Color(0xffd700); // Gold
    const color4 = new THREE.Color(0xffffff); // White

    const colors = [color1, color2, color3, color4];

    for(let i = 0; i < particlesCount * 3; i+=3) {
        // Spread particles
        posArray[i] = (Math.random() - 0.5) * 200;
        posArray[i+1] = (Math.random() - 0.5) * 200;
        posArray[i+2] = (Math.random() - 0.5) * 100;

        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        colorsArray[i] = randomColor.r;
        colorsArray[i+1] = randomColor.g;
        colorsArray[i+2] = randomColor.b;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: isIntro ? 0.4 : 0.8,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX / window.innerWidth - 0.5;
        mouseY = event.clientY / window.innerHeight - 0.5;
    });

    // Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        if(isIntro) {
            particlesMesh.rotation.y = elapsedTime * 0.05;
            particlesMesh.rotation.x = elapsedTime * 0.02;
        } else {
            particlesMesh.rotation.y = elapsedTime * 0.02;
            particlesMesh.position.y = Math.sin(elapsedTime * 0.5) * 2;
        }

        // Parallax effect
        camera.position.x += (mouseX * 10 - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * 10 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
};

document.addEventListener('DOMContentLoaded', initThreeJS);
