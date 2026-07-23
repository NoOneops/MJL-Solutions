/* =====================================================
   HERO INTERACTIONS
===================================================== */


gsap.from(".hero-content > *",{


    opacity:0,

    y:60,

    stagger:.15,

    duration:1.2,

    ease:"power4.out"


});



gsap.from(".floating-panel",{


    opacity:0,

    scale:.5,

    stagger:.2,

    duration:1,


});

