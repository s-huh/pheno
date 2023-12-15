// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import * as THREE from 'three';

let camera: THREE.Camera, scene: THREE.Scene, renderer: THREE.Renderer;
let geometry, material, mesh: THREE.Mesh;

init();

function init() {
    camera = new THREE.PerspectiveCamera(42, 1, 0.01, 10);
    camera.position.z = 1;

    scene = new THREE.Scene();

    geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    material = new THREE.MeshNormalMaterial();

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setAnimationLoop(animation);
}

function animation(time: number) {
    // do not render if not in DOM:
    if (!renderer.domElement.parentNode) return;

    mesh.rotation.x = time / 2000;
    mesh.rotation.y = time / 1000;

    renderer.render(scene, camera);
}

// respond to size changes:
function resize() {
    const container = renderer.domElement.parentNode;
    if (container) {
        const width = container.offsetWidth;
        const height = container.offsetHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }
}

window.addEventListener('resize', resize);
resize();

// expose a function to interact with react.js:
export function mount(container) {
    if (container) {
        container.insertBefore(renderer.domElement, container.firstChild);
        resize();
    } else {
        renderer.domElement.remove();
    }
}
