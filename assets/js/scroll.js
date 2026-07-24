/* =====================================================
   MJL SCROLL REVEALS
===================================================== */

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (!prefersReducedMotion) {
    gsap.to(".cta-orb", {
        scale: 1.4,
        rotation: 180,
        scrollTrigger: {
            trigger: "#cta",
            scrub: true
        }
    });
}
