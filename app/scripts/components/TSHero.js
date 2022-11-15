import * as THREE from "three";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import Stats from "three/addons/libs/stats.module.js";

export default class TSHero {
  constructor(elem, APP) {
    this.App = APP;
    this.elem = elem;
  }

  init() {
    // const canvas = this.elem.querySelector(".js-canvas");
    // const renderer = new THREE.WebGLRenderer({ canvas });

    // scene
    const scene = new THREE.Scene();

    // camera
    const fov = 45;
    const aspect = 165 / 260; // the canvas default
    const near = 1;
    const far = 1500;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    // camera.position.z = 360;
    // camera.position.set(0, 210, 370);
    camera.position.set(13, 215, 360);
    const cameraTarget = new THREE.Vector3(0, 150, 0);

    // light
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(0, 0, 1).normalize();
    scene.add(dirLight);

    // const pointLight = new THREE.PointLight(0xeeeeee, 1.5);
    // pointLight.position.set(0, 100, 90);
    // scene.add(pointLight);

    // image texture
    const texture = new THREE.TextureLoader().load(
      "assets/img/pic/face.jpg"
    );
    // texture.center.set(0.5, 0.5);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(0.004, 0.004);

    const texture2 = new THREE.TextureLoader().load(
      "assets/img/pic/unsplash-02.jpg"
    );
    texture2.center.set(0.5, 0.5);
    texture2.repeat.set(0.005, 0.005);

    // video texture
    const video = document.getElementById("tshero-video");
    const videoTexture = new THREE.VideoTexture(video);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    videoTexture.center.set(0.018, 0.628);
    videoTexture.repeat.set(0.00070, 0.00063);//smaller number, increase size // ratio 1.14453125

    // material
    const materials = [
      new THREE.MeshPhongMaterial({ color: 0xffffff, map: videoTexture }),
      new THREE.MeshPhongMaterial({ color: 0xeeeeee }), // side
    ];

    const materialsBack = [
      new THREE.MeshPhongMaterial({ color: 0xffffff, map: texture }),
      new THREE.MeshPhongMaterial({ color: 0xff0000 }), // side
    ];

    // MeshBasicMaterial

    // group
    group = new THREE.Group();
    group.position.y = 100;

    scene.add(group);

    // load font
    let group, font, textGeo, textMesh1, textMesh2;
    const height = 1,
      size = 270,
      hover = 30,
      curveSegments = 24,
      bevelThickness = 0,
      bevelSize = 0,
      text = "S";

    function createText() {
      textGeo = new TextGeometry(text, {
        font: font,
        size: size,
        height: height,
        curveSegments: curveSegments,
        bevelThickness: bevelThickness,
        bevelSize: bevelSize,
        bevelEnabled: false,
      });

      textGeo.computeBoundingBox();

      const centerOffset =
        -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);

      textMesh1 = new THREE.Mesh(textGeo, materialsBack);

      textMesh1.position.x = centerOffset;
      textMesh1.position.y = 0;
      textMesh1.position.z = 0;

      textMesh1.rotation.x = 0;
      textMesh1.rotation.y = Math.PI * 2;

      textMesh2 = new THREE.Mesh(new TextGeometry(text, {
        font: font,

        size: size,
        height: 20,
        curveSegments: curveSegments,

        bevelThickness: bevelThickness,
        bevelSize: bevelSize,
        bevelEnabled: false,
      }), materials );

      textMesh2.position.x = centerOffset;
      textMesh2.position.y = 0;
      textMesh2.position.z = 1;

      textMesh2.rotation.x = 0;
      textMesh2.rotation.y = Math.PI * 2;

      group.add(textMesh1);
      group.add(textMesh2);
    }

    const loader = new FontLoader();
    loader.load("assets/json/ttc_bold.typeface.json", (response) => {
      font = response;
      createText();
    });

    const canvas = this.elem.querySelector(".js-canvas-1");
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(165, 260);
    renderer.setClearColor( 0xffffff, 1 );

    // camera.lookAt(cameraTarget);
    renderer.render(scene, camera);

    // mouse event
    let targetRotation = 0;
    let targetRotationOnPointerDown = 0;
    let pointerX = 0;
    let pointerXOnPointerDown = 0;
    let windowHalfX = 200 / 2;

    canvas.addEventListener("pointerdown", onPointerDown);

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

    // animation
    function updateFrame() {
      group.rotation.y += (targetRotation - group.rotation.y) * 0.05;

      // camera.lookAt(cameraTarget);

      renderer.clear();
      renderer.render(scene, camera);
      requestAnimationFrame(updateFrame);
    }

    requestAnimationFrame(updateFrame);
  }
}
