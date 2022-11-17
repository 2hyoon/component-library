import * as THREE from "three";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";

export default class TSHero {
  constructor(elem, APP) {
    this.App = APP;
    this.elem = elem;
    this.canvases = this.elem.querySelectorAll(".js-canvas");
    this.data = [
      {
        // S
        letter: "S",
        video_pos_x: 0.017,
        video_pos_y: 0.628,
        video_repeat_x: 0.000715,
        video_repeat_y: 0.00063,
        direction: 'L',
      },
    ];
  }

  setCanvas(canvas) {
    // scene
    const scene = new THREE.Scene();

    // camera
    const fov = 20;
    const aspect = 165 / 260; // the canvas default
    const near = 1;
    const far = 3000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 825);

    // light
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(0, 0, 1).normalize();
    scene.add(dirLight);

    // front texture
    const video = document.getElementById("tshero-video");
    const texture_front = new THREE.VideoTexture(video);
    texture_front.wrapS = THREE.RepeatWrapping;
    texture_front.wrapT = THREE.RepeatWrapping;
    texture_front.center.set(0.017, 0.628);
    texture_front.repeat.set(0.000715, 0.00063); //smaller number, increase size // ratio 1.14453125

    // front materials
    const materials_front = [
      new THREE.MeshPhongMaterial({ color: 0xffffff, map: texture_front }),
      new THREE.MeshPhongMaterial({ color: 0xeeeeee }), // side
    ];

    // back texture
    const texture_back = new THREE.TextureLoader().load(
      "assets/img/pic/face.jpg"
    );
    texture_back.wrapS = THREE.RepeatWrapping;
    texture_back.wrapT = THREE.RepeatWrapping;
    texture_back.repeat.set(0.004, 0.004);
    // texture_back.center.set(0.5, 0.5);

    // back materials
    const materials_back = [
      new THREE.MeshPhongMaterial({ color: 0xffffff, map: texture_back }),
      new THREE.MeshPhongMaterial({ color: 0xff0000 }), // side
    ];

    // group
    let group = new THREE.Group();

    // font
    let font;

    function createText() {
      const size = 270;
      const curveSegments = 24;
      const text = "S";

      const textGeo = new TextGeometry(text, {
        font: font,
        size: size,
        height: 1,
        curveSegments: curveSegments,
        bevelThickness: 0,
        bevelSize: 0,
        bevelEnabled: false,
      });

      textGeo.computeBoundingBox();

      const centerOffset =
        -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x) - 11;

      const centerOffsetY =
        -0.5 * (textGeo.boundingBox.max.y - textGeo.boundingBox.min.y);

      // back
      const mesh_back = new THREE.Mesh(textGeo, materials_back);

      mesh_back.position.x = centerOffset;
      mesh_back.position.y = centerOffsetY;
      mesh_back.position.z = 0;
      mesh_back.rotation.x = 0;
      mesh_back.rotation.y = Math.PI * 2;

      // front
      const mesh_front = new THREE.Mesh(
        new TextGeometry(text, {
          font: font,
          size: size,
          height: 20,
          curveSegments: curveSegments,
          bevelThickness: 0,
          bevelSize: 0,
          bevelEnabled: false,
        }),
        materials_front
      );

      mesh_front.position.x = centerOffset;
      mesh_front.position.y = centerOffsetY;
      mesh_front.position.z = 1;
      mesh_front.rotation.x = 0;
      mesh_front.rotation.y = Math.PI * 2;

      group.add(mesh_back);
      group.add(mesh_front);
    }

    // font loader
    const loader = new FontLoader();

    loader.load("assets/json/ttc_bold.typeface.json", (response) => {
      font = response;
      createText();
    });

    // group
    group.position.x = 0;
    group.position.y = 0;
    group.position.z = 0;
    scene.add(group);

    // render
    // const canvas = this.elem.querySelector(".js-canvas-1");
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(165, 260);
    renderer.setClearColor(0xff0000, 0.2);
    renderer.render(scene, camera);

    // mouse event
    let targetRotation = 0;
    let targetRotationOnPointerDown = 0;
    let pointerX = 0;
    let pointerXOnPointerDown = 0;
    let windowHalfX = 165 / 2;

    let targetRotationY = 0;
    let targetRotationYOnPointerDown = 0;
    let pointerY = 0;
    let pointerYOnPointerDown = 0;
    let windowHalfY = 260 / 2;

    canvas.addEventListener("pointerdown", onPointerDown);

    function onPointerDown(event) {
      if (event.isPrimary === false) return;

      pointerXOnPointerDown = event.clientX - windowHalfX;
      targetRotationOnPointerDown = targetRotation;

      pointerYOnPointerDown = event.clientY - windowHalfY;
      targetRotationYOnPointerDown = targetRotationY;

      document.addEventListener("pointermove", onPointerMove);
      document.addEventListener("pointerup", onPointerUp);
    }

    function onPointerMove(event) {
      if (event.isPrimary === false) return;

      pointerX = event.clientX - windowHalfX;
      pointerY = event.clientY - windowHalfY;

      // target rotation
      targetRotation =
        targetRotationOnPointerDown + (pointerX - pointerXOnPointerDown) * 0.02;

      targetRotationY =
        targetRotationYOnPointerDown +
        (pointerY - pointerYOnPointerDown) * 0.02;
    }

    function onPointerUp(event) {
      if (event.isPrimary === false) return;

      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", onPointerUp);
    }

    // animation
    function updateFrame() {
      group.rotation.y += (targetRotation - group.rotation.y) * 0.05; // left right
      // group.rotation.x += (targetRotationY - group.rotation.x) * 0.05; // up down

      renderer.clear();
      renderer.render(scene, camera);
      requestAnimationFrame(updateFrame);
    }

    requestAnimationFrame(updateFrame);
  }

  init() {
    // this.setCanvas();

    this.canvases.forEach((canvas) => {
      this.setCanvas(canvas);
    });
  }
}
