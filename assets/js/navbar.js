export function initNavigation(reducedMotionQuery) {
  const nav = document.querySelector(".nav-container");
  const menu = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const links = [...document.querySelectorAll(".nav-links a")];
  const sections = [...document.querySelectorAll("main section[id]")];
  const mobileQuery = window.matchMedia("(max-width: 900px)");

  if (!nav || !menu || !navLinks) {
    return;
  }

  let isOpen = false;
  let scrollFrame = 0;
  let focusTimer = 0;

  const setDrawerState = (open, restoreFocus = false) => {
    window.clearTimeout(focusTimer);
    isOpen = mobileQuery.matches && open;
    navLinks.classList.toggle("open", isOpen);
    menu.setAttribute("aria-expanded", String(isOpen));
    menu.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu",
    );
    document.body.classList.toggle("nav-open", isOpen);

    if (mobileQuery.matches) {
      navLinks.inert = !isOpen;
      navLinks.setAttribute("aria-hidden", String(!isOpen));
    } else {
      navLinks.inert = false;
      navLinks.removeAttribute("aria-hidden");
    }

    if (isOpen) {
      focusTimer = window.setTimeout(() => links[0]?.focus(), 230);
    } else if (restoreFocus) {
      menu.focus();
    }
  };

  const updateActiveLink = () => {
    scrollFrame = 0;
    let currentSection = sections[0]?.id ?? "";

    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 200) {
        currentSection = section.id;
      }
    });

    links.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${currentSection}`,
      );
    });
  };

  const handleScroll = () => {
    nav.classList.toggle("scrolled", window.scrollY > 50);

    if (!scrollFrame) {
      scrollFrame = requestAnimationFrame(updateActiveLink);
    }
  };

  menu.addEventListener("click", () => setDrawerState(!isOpen, isOpen));

  document.addEventListener("pointerdown", (event) => {
    if (
      isOpen &&
      !navLinks.contains(event.target) &&
      !menu.contains(event.target)
    ) {
      setDrawerState(false, true);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (!isOpen) {
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setDrawerState(false, true);
      return;
    }

    if (event.key !== "Tab") {
      return;
    }

    const firstLink = links[0];
    const lastLink = links[links.length - 1];

    if (event.shiftKey && document.activeElement === firstLink) {
      event.preventDefault();
      menu.focus();
    } else if (!event.shiftKey && document.activeElement === menu) {
      event.preventDefault();
      firstLink?.focus();
    } else if (event.shiftKey && document.activeElement === menu) {
      event.preventDefault();
      lastLink?.focus();
    }
  });

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      const target = targetId?.startsWith("#")
        ? document.querySelector(targetId)
        : null;

      if (isOpen) {
        setDrawerState(false, true);
      }

      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({
        behavior: reducedMotionQuery.matches ? "auto" : "smooth",
        block: "start",
      });
    });
  });

  mobileQuery.addEventListener("change", () => setDrawerState(false));
  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("load", updateActiveLink, { once: true });

  setDrawerState(false);
  handleScroll();
}
