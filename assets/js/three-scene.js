/* =====================================================
   MJL SOLUTIONS
   THREE.JS HOLOGRAPHIC CORE
===================================================== */

const container = document.querySelector("#three-container");

if (container) {

    // =====================================================
    // SCENE
    // =====================================================

    const scene = new THREE.Scene();

    // =====================================================
    // CAMERA
    // =====================================================

    const camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );

    camera.position.set(0, 0, 5);

    // =====================================================
    // RENDERER
    // =====================================================

    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    renderer.setSize(
        container.clientWidth,
        container.clientHeight
    );

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.appendChild(renderer.domElement);

    // =====================================================
    // CORE
    // =====================================================

    const geometry = new THREE.IcosahedronGeometry(1.35, 5);

    const material = new THREE.MeshStandardMaterial({

        color: 0x00e5ff,

        wireframe: true,

        transparent: true,

        opacity: 0.85

    });

    const core = new THREE.Mesh(
        geometry,
        material
    );

    scene.add(core);

    // =====================================================
    // GLOW
    // =====================================================

    const glowGeometry = new THREE.SphereGeometry(
        1.15,
        64,
        64
    );

    const glowMaterial = new THREE.MeshBasicMaterial({

        color: 0x38bdf8,

        transparent: true,

        opacity: 0.08

    });

    const glow = new THREE.Mesh(
        glowGeometry,
        glowMaterial
    );

    scene.add(glow);

    // =====================================================
    // RINGS
    // =====================================================

    function createRing(radius, rotationX) {

        const geometry = new THREE.TorusGeometry(
            radius,
            0.008,
            32,
            200
        );

        const material = new THREE.MeshBasicMaterial({

            color: 0x00e5ff,

            transparent: true,

            opacity: 0.55

        });

        const ring = new THREE.Mesh(
            geometry,
            material
        );

        ring.rotation.x = rotationX;

        scene.add(ring);

        return ring;

    }

    const ring1 = createRing(1.8, 0.5);
    const ring2 = createRing(2.1, 1.2);
    const ring3 = createRing(2.5, 0.8);

    // =====================================================
    // PARTICLES
    // =====================================================

    const particleGeometry = new THREE.BufferGeometry();

    const particleCount =
        window.innerWidth < 700 ? 120 : 280;

    const positions = new Float32Array(
        particleCount * 3
    );

    for (let i = 0; i < positions.length; i++) {

        positions[i] = (Math.random() - 0.5) * 8;

    }

    particleGeometry.setAttribute(

        "position",

        new THREE.BufferAttribute(
            positions,
            3
        )

    );

    const particleMaterial = new THREE.PointsMaterial({

        color: 0x00e5ff,

        size: 0.03,

        transparent: true,

        opacity: 0.8,

        depthWrite: false,

        blending: THREE.AdditiveBlending

    });

    const particles = new THREE.Points(

        particleGeometry,

        particleMaterial

    );

    scene.add(particles);

    // =====================================================
    // LIGHTING
    // =====================================================

    const pointLight = new THREE.PointLight(
        0x00e5ff,
        4,
        20
    );

    pointLight.position.set(3, 3, 3);

    scene.add(pointLight);

    scene.add(
        new THREE.AmbientLight(
            0xffffff,
            0.55
        )
    );

    // =====================================================
    // GSAP INTRO
    // =====================================================

    if (typeof gsap !== "undefined") {

        gsap.from(core.scale, {

            x: 0,
            y: 0,
            z: 0,

            duration: 1.6,

            ease: "back.out(2)"

        });

        gsap.from(camera.position, {

            z: 8,

            duration: 2,

            ease: "power3.out"

        });

    }

    // =====================================================
    // MOUSE
    // =====================================================

    let mouseX = 0;
    let mouseY = 0;

    let targetX = 0;
    let targetY = 0;

    window.addEventListener("mousemove", (e) => {

        targetX =
            (e.clientX / window.innerWidth - 0.5) * 0.8;

        targetY =
            (e.clientY / window.innerHeight - 0.5) * 0.8;

    });

    // =====================================================
    // ANIMATION
    // =====================================================

    const clock = new THREE.Clock();

    function animate() {

        requestAnimationFrame(animate);

        const elapsed = clock.getElapsedTime();

        mouseX += (targetX - mouseX) * 0.05;
        mouseY += (targetY - mouseY) * 0.05;

        core.rotation.y += 0.003;
        core.rotation.x += 0.001;

        core.rotation.y += mouseX * 0.02;
        core.rotation.x += mouseY * 0.02;

        glow.scale.setScalar(

            1 + Math.sin(elapsed * 2) * 0.05

        );

        glow.position.y =
            Math.sin(elapsed * 1.5) * 0.05;

        ring1.rotation.z += 0.002;
        ring2.rotation.z -= 0.001;
        ring3.rotation.z += 0.0015;

        particles.rotation.y += 0.0008;
        particles.rotation.x += 0.0003;
        particles.rotation.z += 0.0005;

        camera.position.x +=
            ((mouseX * 0.5) - camera.position.x) * 0.03;

        camera.position.y +=
            ((-mouseY * 0.5) - camera.position.y) * 0.03;

        camera.lookAt(scene.position);

        renderer.render(scene, camera);

    }

    animate();

    // =====================================================
    // RESPONSIVE
    // =====================================================

    window.addEventListener("resize", () => {

        camera.aspect =
            container.clientWidth /
            container.clientHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(

            container.clientWidth,

            container.clientHeight

        );

    });

}