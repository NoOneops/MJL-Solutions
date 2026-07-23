/* =====================================================
   MJL COMMAND SYSTEM
===================================================== */


const overlay =
document.querySelector("#command-overlay");


const input =
document.querySelector("#command-input");


const close =
document.querySelector("#close-command");





function openCommand(){


overlay.classList.add(
"active"
);


input.focus();


}



function closeCommand(){


overlay.classList.remove(
"active"
);


input.value="";


}





// CTRL + K


document.addEventListener(
"keydown",
(e)=>{


if(
(e.ctrlKey || e.metaKey)
&&
e.key==="k"

){


e.preventDefault();


openCommand();


}





if(
e.key==="Escape"

){


closeCommand();


}



});






close.addEventListener(
"click",
closeCommand
);






// Commands


const commands = {


about:"#about",

services:"#services",

projects:"#projects",

contact:"#contact",

github:"https://github.com"


};





input.addEventListener(
"keydown",
(e)=>{


if(e.key==="Enter"){



let command =
input.value
.toLowerCase()
.trim();




if(commands[command]){


if(
commands[command]
.startsWith("#")

){


closeCommand();


document
.querySelector(commands[command])
.scrollIntoView({

behavior:"smooth"

});


}

else{


window.open(
commands[command],
"_blank"
);


}



}



}


});
