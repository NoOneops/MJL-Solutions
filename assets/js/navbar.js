/* =====================================================
   MJL NAVIGATION SYSTEM
===================================================== */


const nav =
document.querySelector(".nav-container");


const menu =
document.querySelector(".menu-toggle");


const links =
document.querySelectorAll(".nav-links a");




// Scroll effect

window.addEventListener(
"scroll",
()=>{


    if(window.scrollY > 50){


        nav.classList.add(
            "scrolled"
        );


    }

    else{


        nav.classList.remove(
            "scrolled"
        );


    }



});




// Mobile menu


menu.addEventListener(
"click",
()=>{


    document
    .querySelector(".nav-links")
    .classList.toggle(
        "open"
    );


});




// Active section tracking


const sections =
document.querySelectorAll("section");



window.addEventListener(
"scroll",
()=>{


    let current="";


    sections.forEach(
    section=>{


        const top =
        window.scrollY;


        const offset =
        section.offsetTop - 200;



        if(top >= offset){


            current =
            section.id;


        }


    });



    links.forEach(
    link=>{


        link.classList.remove(
            "active"
        );



        if(
        link.getAttribute("href")
        ===
        "#"+current
        ){


            link.classList.add(
                "active"
            );


        }


    });


});
