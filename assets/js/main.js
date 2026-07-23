// ==========================================
// Navbar Scroll Effect
// ==========================================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if(window.scrollY > 50){

        navbar.classList.add("scrolled");

    }else{

        navbar.classList.remove("scrolled");

    }

});
// ===============================
// Typed Text
// ===============================

new Typed("#typing",{

    strings:[

        "Virtual Assistant",

        "Web Developer",

        "Project Manager",

        "Creative Designer",

        "Problem Solver"

    ],

    typeSpeed:70,

    backSpeed:45,

    loop:true

});