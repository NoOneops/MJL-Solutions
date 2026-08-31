import gsap from "gsap";

export function initHeroAnimations(reducedMotionQuery) {
  const hero = document.querySelector("#hero");

  if (!hero || reducedMotionQuery.matches) {
    return;
  }

  const animatedElements = hero.querySelectorAll(
    ".hero-badge, .hero-title, .hero-description, .hero-actions, .hero-note, .studio-profile",
  );

  const context = gsap.context(() => {
    gsap.from(animatedElements, {
      y: 18,
      duration: 0.45,
      stagger: 0.06,
      ease: "power2.out",
    });
  }, hero);

  reducedMotionQuery.addEventListener(
    "change",
    (event) => {
      if (event.matches) {
        context.revert();
      }
    },
    { once: true },
  );
}
