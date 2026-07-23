/* =====================================================
   MJL SYSTEM LOADER
===================================================== */


const loader = document.querySelector("#loader");

const progress =
document.querySelector(".loader-progress");


const percent =
document.querySelector("#loader-percent");


const text =
document.querySelector("#loader-text");



let value = 0;



const messages = [

    "INITIALIZING SYSTEM...",

    "LOADING COMPONENTS...",

    "CONNECTING SERVICES...",

    "PREPARING EXPERIENCE...",

    "SYSTEM READY..."

];



const interval = setInterval(()=>{


    value++;


    progress.style.width =
    value + "%";


    percent.textContent =
    value + "%";



    if(value === 20){

        text.textContent =
        messages[1];

    }


    if(value === 45){

        text.textContent =
        messages[2];

    }


    if(value === 75){

        text.textContent =
        messages[3];

    }


    if(value === 95){

        text.textContent =
        messages[4];

    }



    if(value >= 100){


        clearInterval(interval);



        gsap.to(loader,{

            opacity:0,

            duration:1,

            ease:"power4.out",

            onComplete:()=>{

                loader.style.display="none";

            }

        });


    }


},25);
