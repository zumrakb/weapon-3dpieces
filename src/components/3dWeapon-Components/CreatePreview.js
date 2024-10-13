/* import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export const createPreview = (partName, modelPath, previewRefs) => {
  const previewScene = new THREE.Scene();
  const previewCamera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  previewCamera.position.set(0, 0, 3);

  const previewRenderer = new THREE.WebGLRenderer({ antialias: true });
  previewRenderer.setSize(150, 150);
  const canvas = previewRenderer.domElement;
  previewRefs.current[partName].appendChild(canvas);

  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  previewScene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(2, 2, 2);
  previewScene.add(directionalLight);

  const loader = new GLTFLoader();
  loader.load(modelPath, (gltf) => {
    const model = gltf.scene;

    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    model.position.x -= center.x;
    model.position.y -= center.y;
    model.position.z -= center.z;

    const maxDimension = Math.max(size.x, size.y, size.z);
    model.scale.setScalar((1 / maxDimension) * 1.5);

    previewScene.add(model);

    // Static render
    previewRenderer.render(previewScene, previewCamera);
  });
};
 */

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export const createPreview = (partName, modelPath, previewRefs) => {
  // Ensure the previewRef exists
  if (!previewRefs.current[partName]) {
    console.error(`Preview reference for ${partName} is not defined.`);
    return;
  }

  const previewScene = new THREE.Scene();
  previewScene.background = new THREE.Color(0xffffff); // White background

  const previewCamera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  previewCamera.position.set(0, 0, 3);

  const previewRenderer = new THREE.WebGLRenderer({ antialias: true });
  previewRenderer.setSize(150, 150); // Set size for the canvas
  const canvas = previewRenderer.domElement;

  // Append the canvas to the DOM (after confirming the ref exists)
  previewRefs.current[partName].appendChild(canvas);

  // Add lights to the preview scene
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  previewScene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(2, 2, 2);
  previewScene.add(directionalLight);

  const loader = new GLTFLoader();
  loader.load(
    modelPath,
    (gltf) => {
      const model = gltf.scene;
      console.log(`Model loaded successfully: ${modelPath}`);

      // Center and scale the model
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());

      model.position.x -= center.x;
      model.position.y -= center.y;
      model.position.z -= center.z;

      const maxDimension = Math.max(size.x, size.y, size.z);
      model.scale.setScalar((1 / maxDimension) * 1.5);

      previewScene.add(model);

      // Render the preview (static image)
      previewRenderer.render(previewScene, previewCamera);
    },
    undefined,
    (error) => {
      console.error(`Failed to load model: ${modelPath}`, error);
    }
  );
};
