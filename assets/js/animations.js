/* =========================
   ABOUT ANIMATION
========================= */


gsap.from(
".about-content",
{

scrollTrigger:{

trigger:"#about",

start:"top 80%"

},


opacity:0,

x:-80,

duration:1


});





gsap.from(
".timeline",
{

scrollTrigger:{

trigger:"#about",

start:"top 70%"

},


opacity:0,

x:80,

duration:1


});
/* =========================
   SERVICES ANIMATION
========================= */


gsap.from(
".service-card",
{

scrollTrigger:{

trigger:"#services",

start:"top 75%"

},


opacity:0,

y:80,

stagger:.15,

duration:1,

ease:"power4.out"


});
/* =========================
   TECH STACK ANIMATION
========================= */


gsap.from(
".tech-item",
{

scrollTrigger:{

trigger:"#skills",

start:"top 80%"

},


opacity:0,

scale:.5,

stagger:.08,

duration:.8

});





/* =========================
   PROCESS ANIMATION
========================= */


gsap.from(
".process-step",
{

scrollTrigger:{

trigger:"#process",

start:"top 75%"

},


opacity:0,

y:80,

stagger:.15,

duration:1

});
/* =========================
   CONTACT ANIMATION
========================= */


gsap.from(
".contact-info",
{

scrollTrigger:{

trigger:"#contact",

start:"top 75%"

},


opacity:0,

x:-80,

duration:1

});





gsap.from(
".contact-terminal",
{

scrollTrigger:{

trigger:"#contact",

start:"top 75%"

},


opacity:0,

x:80,

duration:1

});
/* =========================
   CTA ANIMATION
========================= */


gsap.from(
".cta-box",
{

scrollTrigger:{

trigger:"#cta",

start:"top 80%"

},


opacity:0,

scale:.8,

duration:1.2,

ease:"power4.out"

});