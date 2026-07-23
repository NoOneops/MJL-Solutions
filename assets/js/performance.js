/* =====================================================
   MJL PERFORMANCE SYSTEM
===================================================== */



// Lazy load images


const images =
document.querySelectorAll("img");



images.forEach(
img=>{


img.loading="lazy";


});




// Prevent layout jump


window.addEventListener(
"load",

()=>{


document.body.classList.add(
"loaded"
);


});