import * as THREE from "three";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import Stats from "three/addons/libs/stats.module.js";

export default class Test {
  constructor(elem, APP) {
    this.App = APP;
    this.elem = elem;
    this.target_canvas = this.elem.querySelector(".js-canvas");
    this.box = this.elem.querySelector('.js-box');
    this.counter = 0;
  }

  cube() {
    // const t_canvas = this.target_canvas;

    const canvas = this.elem.querySelector(".js-canvas");
    const renderer = new THREE.WebGLRenderer({ canvas });

    // camera
    const fov = 30;
    const aspect = 2; // the canvas default
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;

    // geometry
    const boxWidth = 1;
    const boxHeight = 0.56;
    const boxDepth = 0.56;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    // material
    // const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
    // const material = [
    //   new THREE.MeshPhongMaterial({ color: 0xa83e32 }),//red 3
    //   new THREE.MeshPhongMaterial({ color: 0xa89a32 }),//yellow 1
    //   new THREE.MeshPhongMaterial({ color: 0x4aa832 }),//green
    //   new THREE.MeshPhongMaterial({ color: 0x32a89e }),//skyblue 2
    //   new THREE.MeshPhongMaterial({ color: 0x3244a8 }),//blue
    //   new THREE.MeshPhongMaterial({ color: 0x8c32a8 }),//purple 4
    // ]

    const video = document.getElementById("video");
    video.play();
    const v1 = new THREE.VideoTexture(video);
    v1.wrapS = THREE.RepeatWrapping;
    v1.wrapT = THREE.RepeatWrapping;
    v1.repeat.set(1, 1);
    const material = [
        new THREE.MeshPhongMaterial({ color: 0xa83e32 }),//red 3
        new THREE.MeshPhongMaterial({ color: 0xffffff, map: v1 }),
        new THREE.MeshPhongMaterial({ color: 0x4aa832 }),//green
        new THREE.MeshPhongMaterial({ color: 0x32a89e }),//skyblue 2
        new THREE.MeshPhongMaterial({ color: 0x3244a8 }),//blue
        new THREE.MeshPhongMaterial({ color: 0x8c32a8 }),//purple 4
    ]

    // mesh
    const cube = new THREE.Mesh(geometry, material);

    // scene
    const scene = new THREE.Scene();

    // light
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);

    scene.add(light);
    scene.add(cube);

    // render
    renderer.render(scene, camera);

    this.elem.addEventListener( 'pointerdown', onPointerDown );

    function resizeRendererToDisplaySize(renderer) {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
    }

    let targetRotation = 0;
    let targetRotationOnPointerDown = 0;

    let pointerX = 0;
    let pointerXOnPointerDown = 0;

    let windowHalfX = window.innerWidth / 2;

    function onPointerDown(event) {
      if (event.isPrimary === false) return;

      pointerXOnPointerDown = event.clientX - windowHalfX;
      targetRotationOnPointerDown = targetRotation;

      document.addEventListener("pointermove", onPointerMove);
      document.addEventListener("pointerup", onPointerUp);
    }

    function onPointerMove(event) {
      if (event.isPrimary === false) return;

      pointerX = event.clientX - windowHalfX;

      targetRotation =
        targetRotationOnPointerDown + (pointerX - pointerXOnPointerDown) * 0.02;
    }

    function onPointerUp(event) {
      if (event.isPrimary === false) return;

      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", onPointerUp);
    }

    function updateFrame(time) {
      // time *= 0.001; // convert time to seconds

      // if (resizeRendererToDisplaySize(renderer)) {
      //   const canvas = renderer.domElement;
      //   camera.aspect = canvas.clientWidth / canvas.clientHeight;
      //   camera.updateProjectionMatrix();
      // }

      // cube.rotation.x = time;
      // cube.rotation.y = time;

      // renderer.render(scene, camera);

      cube.rotation.y += (targetRotation - cube.rotation.y) * 0.05;
      cube.rotation.x += (targetRotation - cube.rotation.x) * 0.05;

      // camera.lookAt(cameraTarget);

      renderer.clear();
      renderer.render(scene, camera);

      requestAnimationFrame(updateFrame);
    }

    requestAnimationFrame(updateFrame);
  }

  init() {
    // this.cube();
    let downY;
    let currentY;

    this.elem.addEventListener("pointerup", (event) => {console.log('pointerup')
      currentY = event.clientY;

      this.counter = currentY < downY ? this.counter + 1 : this.counter - 1;
      this.box.style.transform = `translateZ(-215px) rotateX(${this.counter * 90}deg)`;
    })

    this.elem.addEventListener("pointerdown", (event) => {console.log('pointerdown', event.clientY)
      downY = event.clientY;
    })

  }
}
