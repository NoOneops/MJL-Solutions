/* =====================================================
   MJL CUSTOM CURSOR
===================================================== */


const cursor =
document.querySelector("#cursor");


const dot =
document.querySelector("#cursor-dot");





let mouseX = 0;

let mouseY = 0;

let cursorX = 0;

let cursorY = 0;





window.addEventListener(

"mousemove",

(e)=>{


mouseX = e.clientX;

mouseY = e.clientY;


dot.style.left =
mouseX+"px";


dot.style.top =
mouseY+"px";


});







function animateCursor(){



cursorX +=

(mouseX - cursorX) * .15;



cursorY +=

(mouseY - cursorY) * .15;



cursor.style.left =
cursorX+"px";


cursor.style.top =
cursorY+"px";



requestAnimationFrame(
animateCursor
);


}



animateCursor();






// Hover detection


const hoverElements =
document.querySelectorAll(

"a, button, .card, .service-card"

);




hoverElements.forEach(
(element)=>{


element.addEventListener(
"mouseenter",

()=>{


cursor.classList.add(
"hover"
);


});




element.addEventListener(
"mouseleave",

()=>{


cursor.classList.remove(
"hover"
);


});


});






// Click effect


document.addEventListener(

"mousedown",

()=>{


cursor.classList.add(
"click"
);


});



document.addEventListener(

"mouseup",

()=>{


cursor.classList.remove(
"click"
);


});