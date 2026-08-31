import { initCommandPalette } from "./command.js";
import { initHeroAnimations } from "./hero.js";
import { initNavigation } from "./navbar.js";
import { initPerformanceEnhancements } from "./performance.js";
import { initProjectFilters } from "./project-filters.js";
import { initContactForm } from "./terminal.js";

const reducedMotionQuery = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
);

initNavigation(reducedMotionQuery);
initCommandPalette(reducedMotionQuery);
initProjectFilters();
initContactForm();
initPerformanceEnhancements();
initHeroAnimations(reducedMotionQuery);
