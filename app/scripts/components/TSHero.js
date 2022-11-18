import * as THREE from "three";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";

export default class TSHero {
  constructor(elem, APP) {
    this.App = APP;
    this.elem = elem;
    this.canvases = this.elem.querySelectorAll(".js-canvas");
    this.data = [
      //repeat //smaller number, increase size // ratio 1.14453125
      {
        letter: "S",
        font_size: 270,
        height: 18,
        video_center_x: 0.017,
        video_center_y: 0.628,
        video_repeat_x: 0.000715,
        video_repeat_y: 0.00063,
        group_x: -3,
        group_y: 0,
        direction: "L",
      },
      {
        letter: "c",
        font_size: 363,
        height: 28,
        video_center_x: 0.146,
        video_center_y: 0.628,
        video_repeat_x: 0.000536,
        video_repeat_y: 0.000466,
        group_x: -3,
        group_y: 3,
        direction: "B",
      },
      {
        letter: "i",
        font_size: 363,
        height: 28,
        video_center_x: 0.2697,
        video_center_y: 0.628,
        video_repeat_x: 0.000536,
        video_repeat_y: 0.000466,
        group_x: -10,
        group_y: 49,
        direction: "R",
      },
      {
        letter: "e",
        font_size: 363,
        height: 28,
        video_center_x: 0.3195,
        video_center_y: 0.628,
        video_repeat_x: 0.000536,
        video_repeat_y: 0.000466,
        group_x: -3,
        group_y: 3,
        direction: "T",
      },
      {
        letter: "n",
        font_size: 363,
        height: 28,
        video_center_x: 0.4465,
        video_center_y: 0.628,
        video_repeat_x: 0.000536,
        video_repeat_y: 0.000466,
        group_x: -15,
        group_y: 3,
        direction: "L",
      },
      {
        letter: "c",
        font_size: 363,
        height: 28,
        video_center_x: 0.5775,
        video_center_y: 0.628,
        video_repeat_x: 0.000536,
        video_repeat_y: 0.000466,
        group_x: -3,
        group_y: 3,
        direction: "R",
      },
      {
        letter: "e",
        font_size: 363,
        height: 28,
        video_center_x: 0.7013,
        video_center_y: 0.628,
        video_repeat_x: 0.000536,
        video_repeat_y: 0.000466,
        group_x: -3,
        group_y: 3,
        direction: "L",
      },
      {
        letter: "s",
        font_size: 363,
        height: 28,
        video_center_x: 0.8278,
        video_center_y: 0.628,
        video_repeat_x: 0.000536,
        video_repeat_y: 0.000466,
        group_x: -3,
        group_y: 3,
        direction: "T",
      },
    ];
  }

  setCanvas(canvas) {
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    const i = parseInt(canvas.dataset.id);
    console.log(w, h);

    // scene
    const scene = new THREE.Scene();

    // camera
    const fov = 20;
    const aspect = w / h; // the canvas default
    const near = 1;
    const far = 3000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 715); //825

    // light
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(0, 0, 1).normalize();
    scene.add(dirLight);

    // front texture
    const video = document.getElementById("tshero-video");
    const texture_front = new THREE.VideoTexture(video);
    texture_front.wrapS = THREE.RepeatWrapping;
    texture_front.wrapT = THREE.RepeatWrapping;
    texture_front.center.set(
      this.data[i].video_center_x,
      this.data[i].video_center_y
    );
    texture_front.repeat.set(
      this.data[i].video_repeat_x,
      this.data[i].video_repeat_y
    ); //smaller number, increase size // ratio 1.14453125

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
      new THREE.MeshPhongMaterial({ color: 0xeeeeee }), // side
    ];

    // group
    let group = new THREE.Group();

    // font
    let font;
    const text = this.data[i].letter;
    const size = this.data[i].font_size;
    const height = this.data[i].height / 2;

    function createText() {
      const curveSegments = 24;

      const textGeo = new TextGeometry(text, {
        font: font,
        size: size,
        height: height,
        curveSegments: curveSegments,
        bevelThickness: 0,
        bevelSize: 0,
        bevelEnabled: false,
      });

      textGeo.computeBoundingBox();

      const centerOffset =
        -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x) - height;

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
          height: height,
          curveSegments: curveSegments,
          bevelThickness: 0,
          bevelSize: 0,
          bevelEnabled: false,
        }),
        materials_front
      );

      mesh_front.position.x = centerOffset;
      mesh_front.position.y = centerOffsetY;
      mesh_front.position.z = height;
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
    group.position.x = this.data[i].group_x;
    group.position.y = this.data[i].group_y;
    group.position.z = 0;
    scene.add(group);

    // render
    // const canvas = this.elem.querySelector(".js-canvas-1");
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(w, h);
    renderer.setClearColor(0xffffff, 1);
    renderer.render(scene, camera);

    // mouse event
    let targetRotation = 0;
    let targetRotationOnPointerDown = 0;
    let pointerX = 0;
    let pointerXOnPointerDown = 0;
    let windowHalfX = w / 2;

    let targetRotationY = 0;
    let targetRotationYOnPointerDown = 0;
    let pointerY = 0;
    let pointerYOnPointerDown = 0;
    let windowHalfY = h / 2;

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

    const direction = this.data[i].direction;
    // animation
    function updateFrame() {
      if (direction === "L" || direction === "R") {
        group.rotation.y += (targetRotation - group.rotation.y) * 0.05; // left right
      } else {
        group.rotation.x += (targetRotationY - group.rotation.x) * 0.05; // up down
      }

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
