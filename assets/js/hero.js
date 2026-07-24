/* =====================================================
   MJL HERO SYSTEM
===================================================== */

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// HERO INTRO
// ==========================================

const heroTimeline = gsap.timeline({
    defaults: {
        ease: "power4.out"
    }
});

heroTimeline

.from(".hero-badge", {
    opacity: 0,
    y: 40,
    duration: 0.8
})

.from(".hero-title", {
    opacity: 0,
    y: 60,
    duration: 1
}, "-=0.4")

.from(".hero-description", {
    opacity: 0,
    y: 40,
    duration: 0.8
}, "-=0.5")

.from(".hero-actions", {
    opacity: 0,
    y: 40,
    duration: 0.8
}, "-=0.5")

.from(".hero-stats > div", {
    opacity: 0,
    y: 30,
    stagger: 0.15,
    duration: 0.6
}, "-=0.4")

.from(".floating-panel", {
    opacity: 0,
    scale: 0.7,
    stagger: 0.15,
    duration: 0.8
}, "-=0.6");



// ==========================================
// FLOATING PANELS
// ==========================================

gsap.to(".panel-one", {
    y: -20,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});

gsap.to(".panel-two", {
    y: 15,
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});

gsap.to(".panel-three", {
    y: -15,
    duration: 3.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});



// ==========================================
// HERO PARALLAX
// ==========================================

gsap.to(".hero-visual", {

    y: 120,

    ease: "none",

    scrollTrigger: {

        trigger: "#hero",

        start: "top top",

        end: "bottom top",

        scrub: true

    }

});



// ==========================================
// SCROLL INDICATOR
// ==========================================

gsap.to(".scroll-indicator span", {

    y: 12,

    repeat: -1,

    yoyo: true,

    duration: 1,

    ease: "power1.inOut"

});