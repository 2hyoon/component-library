import * as THREE from "three";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import Stats from "three/addons/libs/stats.module.js";

export default class Test {
  constructor(elem, APP) {
    this.App = APP;
    this.elem = elem;
    this.target_canvas = this.elem.querySelector(".js-canvas");
  }

  init() {
    // const t_canvas = this.target_canvas;

    const canvas = this.elem.querySelector(".js-canvas");
    const renderer = new THREE.WebGLRenderer({ canvas });

    // camera
    const fov = 75;
    const aspect = 2; // the canvas default
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;

    // geometry
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    // material
    const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });

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

    function updateFrame(time) {
      time *= 0.001; // convert time to seconds

      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }

      cube.rotation.x = time;
      cube.rotation.y = time;

      renderer.render(scene, camera);

      requestAnimationFrame(updateFrame);
    }

    requestAnimationFrame(updateFrame);
  }
}
