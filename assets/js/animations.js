/* =====================================================
   MJL SECTION ANIMATIONS
===================================================== */

/*
   Content sections intentionally do not receive opacity-based GSAP reveals.
   ScrollTrigger initializes `from()` animations immediately, which can leave
   cards hidden when a trigger is skipped or refreshed. The sections remain
   visible through their CSS, while the hero and decorative 3D scene retain
   their independent animations.
*/
