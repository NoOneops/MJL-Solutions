/* =====================================================
   MJL SOLUTIONS
   THREE.JS HOLOGRAPHIC CORE
===================================================== */


const container =
document.querySelector("#three-container");



if(container){



// ========================
// SCENE
// ========================


const scene = new THREE.Scene();




// ========================
// CAMERA
// ========================


const camera =
new THREE.PerspectiveCamera(

    45,

    container.clientWidth /
    container.clientHeight,

    0.1,

    1000

);



camera.position.z = 5;




// ========================
// RENDERER
// ========================


const renderer =
new THREE.WebGLRenderer({

    alpha:true,

    antialias:true

});



renderer.setPixelRatio(

Math.min(
window.devicePixelRatio,
2
)

);



renderer.setSize(

    container.clientWidth,

    container.clientHeight

);



container.appendChild(
renderer.domElement
);




// ========================
// CORE SPHERE
// ========================


const geometry =
new THREE.IcosahedronGeometry(

    1.35,

    5

);



const material =
new THREE.MeshStandardMaterial({

    color:0x00e5ff,

    wireframe:true,

    transparent:true,

    opacity:.8

});



const core =
new THREE.Mesh(

    geometry,

    material

);



scene.add(core);





// ========================
// INNER GLOW
// ========================


const glowGeometry =
new THREE.SphereGeometry(

    1.1,

    64,

    64

);



const glowMaterial =
new THREE.MeshBasicMaterial({

    color:0x38bdf8,

    transparent:true,

    opacity:.08

});



const glow =
new THREE.Mesh(

    glowGeometry,

    glowMaterial

);



scene.add(glow);





// ========================
// ORBIT RINGS
// ========================


function createRing(size,rotation){


const ringGeometry =
new THREE.TorusGeometry(

    size,

    .008,

    32,

    200

);



const ringMaterial =
new THREE.MeshBasicMaterial({

    color:0x00e5ff,

    transparent:true,

    opacity:.5

});



const ring =
new THREE.Mesh(

    ringGeometry,

    ringMaterial

);



ring.rotation.x =
rotation;



scene.add(ring);



return ring;


}



const ring1 =
createRing(1.8,.5);


const ring2 =
createRing(2.1,1.2);


const ring3 =
createRing(2.5,.8);





// ========================
// PARTICLES
// ========================


const particleGeometry =
new THREE.BufferGeometry();



const particleCount = 
window.innerWidth < 700 ? 100 : 250;



const positions =
new Float32Array(
particleCount * 3
);



for(
let i=0;
i<particleCount*3;
i++
){

positions[i] =
( Math.random() - .5 ) * 8;

}



particleGeometry.setAttribute(

"position",

new THREE.BufferAttribute(

positions,

3

)

);



const particleMaterial =
new THREE.PointsMaterial({

color:0x00e5ff,

size:.025

});



const particles =
new THREE.Points(

particleGeometry,

particleMaterial

);



scene.add(particles);





// ========================
// LIGHTING
// ========================


const light =
new THREE.PointLight(

0x00e5ff,

4,

20

);



light.position.set(

3,

3,

3

);



scene.add(light);



scene.add(

new THREE.AmbientLight(

0xffffff,

.5

)

);





// ========================
// MOUSE MOVEMENT
// ========================


let mouseX = 0;

let mouseY = 0;



window.addEventListener(

"mousemove",

(e)=>{


mouseX =
(e.clientX /
window.innerWidth)
-.5;



mouseY =
(e.clientY /
window.innerHeight)
-.5;



}

);





// ========================
// ANIMATION LOOP
// ========================


function animate(){


requestAnimationFrame(
animate
);



core.rotation.y += .003;

core.rotation.x += .001;



glow.scale.x =
1 +
Math.sin(
Date.now()*.002
)*.05;


glow.scale.y =
glow.scale.x;




ring1.rotation.z += .002;

ring2.rotation.z -= .001;

ring3.rotation.z += .001;




particles.rotation.y += .0008;



// mouse reaction

core.rotation.y +=
mouseX*.002;


core.rotation.x +=
mouseY*.002;




renderer.render(

scene,

camera

);



}



animate();





// ========================
// RESPONSIVE
// ========================


window.addEventListener(

"resize",

()=>{


camera.aspect =

container.clientWidth /
container.clientHeight;



camera.updateProjectionMatrix();



renderer.setSize(

container.clientWidth,

container.clientHeight

);



}

);



}