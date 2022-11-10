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
    const aspect = window.innerWidth / window.innerHeight; // the canvas default
    const near = 1;
    const far = 1500;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    // camera.position.z = 2;
    camera.position.set(0, 210, 600);
    const cameraTarget = new THREE.Vector3(0, 150, 0);

    // light
    const dirLight = new THREE.DirectionalLight(0xff0000, 0.125);
    dirLight.position.set(0, 0, 1).normalize();
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0xffffff, 1.5);
    pointLight.position.set(0, 100, 90);
    scene.add(pointLight);

    // image texture
    const texture = new THREE.TextureLoader().load(
      "assets/img/pic/unsplash-01.jpg"
    );
    texture.center.set(0.5, 0.5);
    texture.repeat.set(0.005, 0.005);

    const texture2 = new THREE.TextureLoader().load(
      "assets/img/pic/unsplash-02.jpg"
    );
    texture2.center.set(0.5, 0.5);
    texture2.repeat.set(0.005, 0.005);

    // video texture
    // const video = document.getElementById("tshero-video");
    // const videoTexture = new THREE.VideoTexture(video);
    // videoTexture.center.set(0.5, 0.5);
    // videoTexture.repeat.set(0.005, 0.005);

    // material
    const materials = [
      new THREE.MeshBasicMaterial({ color: 0xff0000, map: texture }), // front
      new THREE.MeshBasicMaterial({ color: 0xdddddd }), // side
    ];

    const materialsBack = [
      new THREE.MeshBasicMaterial({ color: 0xffff00, map: texture2 }), // front
      new THREE.MeshBasicMaterial({ color: 0xdddddd }), // side
    ];

    // group
    group = new THREE.Group();
    group.position.y = 100;

    scene.add(group);

    // load font
    let group, font, textGeo, textMesh1, textMesh2;
    const height = 1,
      size = 200,
      hover = 30,
      curveSegments = 4,
      bevelThickness = 0,
      bevelSize = 0,
      text = "S";

    function createText() {
      console.log('createtext');
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
        -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);console.log(centerOffset);

      textMesh1 = new THREE.Mesh(textGeo, materials);

      textMesh1.position.x = centerOffset;
      textMesh1.position.y = hover;
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
      }), materialsBack );

      textMesh2.position.x = centerOffset;
      textMesh2.position.y = hover;
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

    // const container = document.createElement("div");
    // document.body.appendChild(container);

    // const renderer = new THREE.WebGLRenderer({ antialias: true });
    // renderer.setPixelRatio(window.devicePixelRatio);
    // renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.setClearColor(0x0000ff, 0.3);
    // container.appendChild(renderer.domElement);

    const canvas = this.elem.querySelector(".js-canvas");
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor( 0x0000ff, 0.3 );

    camera.lookAt(cameraTarget);
    renderer.render(scene, camera);

    // animation
    function updateFrame() {
      group.rotation.y += (0 - group.rotation.y) * 0.05;

      camera.lookAt(cameraTarget);

      renderer.clear();
      renderer.render(scene, camera);
      requestAnimationFrame(updateFrame);
    }

    requestAnimationFrame(updateFrame);
  }
}
