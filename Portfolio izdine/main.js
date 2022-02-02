import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' ;



const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(100);


renderer.render(scene, camera);

// 3D object //
const geometry = new THREE.TorusGeometry(15, 3, 15, 100);
const meterial = new THREE.MeshStandardMaterial({color:0xFF6347});
const torus = new THREE.Mesh(geometry, meterial);

scene.add(torus);


// const planeGeom = new THREE.PlaneGeometry (100, 50,);
// const plane = new THREE.Mesh(planeGeom, meterial);

// scene.add(plane);


// Light //
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(pointLight, ambientLight)

// //Create a DirectionalLight and turn on shadows for the light
// const light = new THREE.DirectionalLight( 0xffffff, 1, 100 );
// light.position.set( 0, 1, 0 ); //default; light shining from top
// light.castShadow = true; // default false
// scene.add( light );

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50 )
// scene.add(lightHelper, gridHelper)


//control met muis
const controls = new OrbitControls(camera, renderer.domElement);

// De steren 
function addStar() {
const geometry = new THREE.SphereGeometry(0.25, 24, 24);
const material = new THREE.MeshStandardMaterial({ color: 0xFFFFFF})
const star = new THREE.Mesh( geometry, material);

const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 150) );

star.position.set(x, y, z);
scene.add(star)
}

Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('preview.jpg');
scene.background = spaceTexture;

const IzdineTexture = new THREE.TextureLoader().load('Izdine.jpg');

const Izdine = new THREE.Mesh(
new THREE.BoxGeometry(15,15,10),
new THREE.MeshBasicMaterial({map: IzdineTexture,})
);

// const tiesTexture = new THREE.TextureLoader().load('Tiestest.webp');
// const normalTexture = new THREE.TextureLoader().load('normal.jpg');
// const ties = new THREE.Mesh(
//     new THREE.SphereGeometry(15,15,15),
//     new THREE.MeshBasicMaterial({
//         map: tiesTexture,
//         normalmap: normalTexture
//     })
//     );
//     scene.add(ties)

//     ties.position.z = 10
//     ties.position.setX = 10


scene.add(Izdine);

Izdine.position.z = 30
Izdine.position.setX = 10

function moveCamera(){
    const t = document.body.getBoundingClientRect().top;
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.035;
    torus.rotation.z += 0.01;

    Izdine.rotation.y += 0.0;
    Izdine.rotation.z += 0.0;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0001;
    camera.position.y = t * -0.0001;
}

document.body.onscroll = moveCamera

// animation  //
function animate(){
    requestAnimationFrame( animate );
    
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    controls.update();

    renderer.render(scene, camera);
}

animate()
