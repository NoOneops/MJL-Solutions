/* =====================================================
   MJL ADVANCED SCROLL SYSTEM
===================================================== */


// Smooth scrolling

gsap.registerPlugin(
    ScrollTrigger
);



gsap.defaults({

    ease:"power3.out"

});





// ========================
// SECTION REVEALS
// ========================


const revealElements =
document.querySelectorAll(
".card, .section-header, .tech-item, .process-step"
);



revealElements.forEach(
(element)=>{


gsap.from(
element,

{


scrollTrigger:{


trigger:element,


start:"top 85%",


toggleActions:
"play none none reverse"


},


opacity:0,


y:60,


duration:1


}

);


});







// ========================
// PARALLAX ELEMENTS
// ========================


gsap.to(

".hero-visual",

{


scrollTrigger:{


trigger:"#hero",


scrub:true


},


y:150


}

);






gsap.to(

".cta-orb",

{


scrollTrigger:{


trigger:"#cta",


scrub:true


},


scale:1.4,


rotation:180


}

);






// ========================
// MAGNETIC BUTTONS
// ========================


const magneticButtons =

document.querySelectorAll(
".btn"
);



magneticButtons.forEach(

(button)=>{


button.addEventListener(

"mousemove",

(e)=>{


const rect =
button.getBoundingClientRect();



const x =
e.clientX - rect.left
- rect.width / 2;



const y =
e.clientY - rect.top
- rect.height / 2;



gsap.to(
button,

{


x:x*.2,

y:y*.2,

duration:.3


}

);



});





button.addEventListener(

"mouseleave",

()=>{


gsap.to(

button,

{


x:0,

y:0,

duration:.5


}

);



});



});
