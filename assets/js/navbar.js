/* =====================================================
   MJL NAVIGATION SYSTEM
===================================================== */

const nav = document.querySelector(".nav-container");
const menu = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section");

/* ==========================================
   NAVBAR SCROLL EFFECT
========================================== */

if (nav) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {
            nav.classList.add("scrolled");
        } else {
            nav.classList.remove("scrolled");
        }

    });

}

/* ==========================================
   MOBILE MENU
========================================== */

if (menu && navLinks) {

    menu.setAttribute("aria-expanded", "false");

    menu.addEventListener("click", () => {

        navLinks.classList.toggle("open");

        const isOpen = navLinks.classList.contains("open");

        menu.setAttribute("aria-expanded", isOpen);

    });

}

/* ==========================================
   CLOSE MENU AFTER CLICK
========================================== */

links.forEach(link => {

    link.addEventListener("click", () => {

        if (navLinks) {

            navLinks.classList.remove("open");

        }

        if (menu) {

            menu.setAttribute("aria-expanded", "false");

        }

    });

});

/* ==========================================
   SMOOTH SCROLL
========================================== */

links.forEach(link => {

    link.addEventListener("click", (e) => {

        const targetId = link.getAttribute("href");

        if (!targetId.startsWith("#")) return;

        const target = document.querySelector(targetId);

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({

            behavior: "smooth",
            block: "start"

        });

    });

});

/* ==========================================
   ACTIVE SECTION HIGHLIGHT
========================================== */

function updateActiveLink() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 200;

        if (window.scrollY >= sectionTop) {

            currentSection = section.id;

        }

    });

    links.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {

            link.classList.add("active");

        }

    });

}

window.addEventListener("scroll", updateActiveLink);
window.addEventListener("load", updateActiveLink);