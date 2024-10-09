import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const TufekParcalari = () => {
  const mountRef = useRef(null); // Reference to the DOM element where we attach the renderer
  let scene, camera, renderer, controls, weaponGroup, body; // Variables for the Three.js scene

  // Function to initialize the scene and load the body model
  useEffect(() => {
    // 1. Create the Three.js scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xaaaaaa); // Set background color

    // 2. Setup the camera
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 5); // Position the camera

    // 3. Setup the renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight); // Match the size to the window
    mountRef.current.appendChild(renderer.domElement); // Attach the renderer to the DOM

    // 4. Setup OrbitControls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Smooth movement
    controls.minDistance = 1; // Minimum zoom
    controls.maxDistance = 10; // Maximum zoom

    // 5. Setup lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8); // Global light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Light from one direction
    directionalLight.position.set(5, 10, 7.5); // Position the light
    scene.add(directionalLight);

    // 6. Create a group to hold all weapon parts
    weaponGroup = new THREE.Group();
    scene.add(weaponGroup);

    // 7. Load the body model and add it to the group
    const loader = new GLTFLoader();
    loader.load("/models/body.glb", (gltf) => {
      body = gltf.scene;
      weaponGroup.add(body); // Add body to the weaponGroup
    });

    // 8. Animation loop: render the scene and camera repeatedly
    const animate = () => {
      requestAnimationFrame(animate); // Loop the function
      controls.update(); // Update OrbitControls
      renderer.render(scene, camera); // Render the scene from the camera's point of view
    };
    animate(); // Start the animation

    // 9. Cleanup when the component is unmounted
    return () => {
      mountRef.current.removeChild(renderer.domElement); // Remove the renderer on component unmount
    };
  }, []); // The effect runs once when the component is mounted

  // Function to load and add Kabza1 to the group
  const loadKabza1 = () => {
    const loader = new GLTFLoader();
    loader.load("/models/Kabza_V1.glb", (gltf) => {
      const kabza1 = gltf.scene;
      weaponGroup.add(kabza1); // Add Kabza1 to the weaponGroup
    });
  };

  // Function to load and add Kabza2 to the group
  const loadKabza2 = () => {
    const loader = new GLTFLoader();
    loader.load("/models/Kabza_V2.glb", (gltf) => {
      const kabza2 = gltf.scene;
      weaponGroup.add(kabza2); // Add Kabza2 to the weaponGroup
    });
  };

  // Function to load and add KabzaPlastik1 to the group
  const loadKabzaPlastik1 = () => {
    const loader = new GLTFLoader();
    loader.load("/models/Kabza_Plastik_V1.glb", (gltf) => {
      const kabzaPlastik1 = gltf.scene;
      weaponGroup.add(kabzaPlastik1); // Add KabzaPlastik1 to the weaponGroup
    });
  };

  // Function to load and add KabzaPlastik2 to the group
  const loadKabzaPlastik2 = () => {
    const loader = new GLTFLoader();
    loader.load("/models/Kabza_Plastik_V2.glb", (gltf) => {
      const kabzaPlastik2 = gltf.scene;
      weaponGroup.add(kabzaPlastik2); // Add KabzaPlastik2 to the weaponGroup
    });
  };

  // Function to load and add Tetik to the group
  const loadTetik = () => {
    const loader = new GLTFLoader();
    loader.load("/models/Tetik.glb", (gltf) => {
      const tetik = gltf.scene;
      weaponGroup.add(tetik); // Add Tetik to the weaponGroup
    });
  };

  // Function to load and add Surgu Kolu to the group
  const loadSurguKolu = () => {
    const loader = new GLTFLoader();
    loader.load("/models/Surgu_Kolu.glb", (gltf) => {
      const surguKolu = gltf.scene;
      weaponGroup.add(surguKolu); // Add Surgu Kolu to the weaponGroup
    });
  };

  // Function to load and add Namlu to the group
  const loadNamlu = () => {
    const loader = new GLTFLoader();
    loader.load("/models/Namlu.glb", (gltf) => {
      const namlu = gltf.scene;
      weaponGroup.add(namlu); // Add Namlu to the weaponGroup
    });
  };

  return (
    <div className="flex gap-2">
      <div ref={mountRef} className="w-[80%] h-screen" />
      {/* 3D scene container */}
      <div className="w-[20%] flex flex-col gap-2 mt-4 mr-4">
        {/* Buttons to add specific parts */}
        <button
          onClick={loadKabza1}
          className="bg-gray-600 rounded-lg px-4 py-2 hover:bg-gray-500 text-white font-semibold"
        >
          Add Kabza1
        </button>
        <button
          onClick={loadKabza2}
          className="bg-gray-600 rounded-lg px-4 py-2 hover:bg-gray-500 text-white font-semibold"
        >
          Add Kabza2
        </button>
        <button
          onClick={loadKabzaPlastik1}
          className="bg-gray-600 rounded-lg px-4 py-2 hover:bg-gray-500 text-white font-semibold"
        >
          Add KabzaPlastik1
        </button>
        <button
          onClick={loadKabzaPlastik2}
          className="bg-gray-600 rounded-lg px-4 py-2 hover:bg-gray-500 text-white font-semibold"
        >
          Add KabzaPlastik2
        </button>
        <button
          onClick={loadTetik}
          className="bg-gray-600 rounded-lg px-4 py-2 hover:bg-gray-500 text-white font-semibold"
        >
          Add Tetik
        </button>
        <button
          onClick={loadSurguKolu}
          className="bg-gray-600 rounded-lg px-4 py-2 hover:bg-gray-500 text-white font-semibold"
        >
          Add Surgu Kolu
        </button>
        <button
          onClick={loadNamlu}
          className="bg-gray-600 rounded-lg px-4 py-2 hover:bg-gray-500 text-white font-semibold"
        >
          Add Namlu
        </button>
      </div>
    </div>
  );
};

export default TufekParcalari;
