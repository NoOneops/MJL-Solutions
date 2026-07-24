// ==========================================
// MJL SOLUTIONS MAIN JAVASCRIPT
// ==========================================


// Navbar Scroll Effect

const navbar = document.querySelector(".navbar");


if(navbar){

    window.addEventListener("scroll", () => {


        if(window.scrollY > 50){


            navbar.classList.add("scrolled");


        }else{


            navbar.classList.remove("scrolled");


        }


    });


}





// ==========================================
// Typed Hero Text
// ==========================================


const typingElement =
document.querySelector("#typing");



if(typingElement){


    new Typed("#typing",{


        strings:[


            "Virtual Assistant",

            "Web Developer",

            "Project Manager",

            "UI/UX Designer",

            "Creative Problem Solver"


        ],


        typeSpeed:70,


        backSpeed:45,


        loop:true


    });


}