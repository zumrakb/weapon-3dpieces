import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { motion } from "framer-motion";

function TufekGoruntule() {
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const modelRef = useRef(null);
  const clock = useRef(new THREE.Clock());
  let renderer;

  // Visibility state for all groups and meshes
  const [previews, setPreviews] = useState({});
  const [visibility, setVisibility] = useState({
    Govde: true,
    Kabza_Plastik: true,
    Kaydırma_Kolu: true,
    Üst_Namlu: true,
    Alt_Namlu: true,
    Tetik: true,
  });

  useEffect(() => {
    // Renderer setup and adding it to the DOM
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      physicallyCorrectLights: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 3);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controlsRef.current = controls;

    const ambient = new THREE.AmbientLight(0xffffff, 0.7);
    const directLight = new THREE.DirectionalLight(0xffffff, 1);
    directLight.position.set(5, 5, 7.5);
    scene.add(directLight, ambient);

    // Loading the GLTF model
    const loader = new GLTFLoader();
    loader.load(
      "/models/tufek3.glb",

      (gltf) => {
        const model = gltf.scene;
        model.position.set(0, 0, 0);
        model.scale.set(1, 1, 1);
        scene.add(model);
        modelRef.current = model;

        const newPreviews = {};
        model.traverse((child) => {
          console.log(child, "child");
          if (child.isMesh || child.isGroup) {
            createPreview(renderer, scene, camera, child, newPreviews);
          }
        });
        setPreviews(newPreviews);
      },
      undefined,
      (error) => {
        console.error("GLTF loading error:", error);
      }
    );

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      // Cleanup resources on component unmount
      renderer.dispose();
      if (renderer.domElement) {
        rendererRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  const toggleVisibility = (objectName) => {
    if (!modelRef.current) return;

    modelRef.current.traverse((child) => {
      if (child.name === objectName) {
        if (visibility[objectName]) {
          hideWithAnimation(child);
        } else {
          showWithAnimation(child);
        }
      }
    });

    setVisibility((prev) => ({
      ...prev,
      [objectName]: !prev[objectName],
    }));
  };

  const showWithAnimation = (object) => {
    object.visible = true;
    const modelScale = new THREE.Vector3();
    modelRef.current.getWorldScale(modelScale);
    const targetScale = new THREE.Vector3(1, 1, 1).multiply(modelScale);
    object.scale.set(0.01, 0.01, 0.01);

    const animate = () => {
      const delta = clock.current.getDelta();
      object.scale.lerp(targetScale, delta * 2);
      if (object.scale.x < targetScale.x - 0.01) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  };

  const hideWithAnimation = (object) => {
    const targetScale = new THREE.Vector3(0.01, 0.01, 0.01);

    const animate = () => {
      const delta = clock.current.getDelta();
      object.scale.lerp(targetScale, delta * 2);
      if (object.scale.x > targetScale.x + 0.01) {
        requestAnimationFrame(animate);
      } else {
        object.visible = false;
      }
    };

    animate();
  };

  const createPreview = (renderer, scene, camera, object, previews) => {
    const miniRenderer = new THREE.WebGLRenderer({ alpha: true });
    miniRenderer.setSize(50, 50);
    const miniScene = new THREE.Scene();
    miniScene.add(object.clone());
    miniRenderer.render(miniScene, camera);

    previews[object.name] = miniRenderer.domElement.toDataURL();
    miniRenderer.dispose();
  };

  return (
    <div className="flex gap-2 px-2">
      <div
        ref={rendererRef}
        className="w-[1000px] border-2 border-purple-500 rounded-lg mt-3 overflow-hidden h-[670px] bg-slate-200 flex justify-center items-center"
      />
      {/*     <div className="flex gap-4 pt-4">
        <div className="flex flex-col gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => toggleVisibility("Govde")}
            className="bg-blue-500 text-white font-semibold px-2 py-2 rounded"
          >
            {visibility.Govde ? "Hide Govde" : "Show Govde"}
          </motion.button>

          {previews.Govde && (
            <img
              src={previews.Govde}
              alt="Govde Preview"
              className="border border-pink-300 "
            />
          )}

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => toggleVisibility("Kabza_Plastik")}
            className="bg-green-500 text-white font-semibold px-2 py-2 rounded"
          >
            {visibility.Kabza_Plastik
              ? "Hide Kabza_Plastik"
              : "Show Kabza_Plastik"}
          </motion.button>

          {previews.Kabza_Plastik && (
            <img
              src={previews.Kabza_Plastik}
              alt="Kabza_Plastik Preview"
              className="border border-pink-300"
            />
          )}

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => toggleVisibility("Kaydırma_Kolu")}
            className="bg-red-500 text-white font-semibold px-2 py-2 rounded"
          >
            {visibility.Kaydırma_Kolu
              ? "Hide Kaydırma_Kolu"
              : "Show Kaydırma_Kolu"}
          </motion.button>

          {previews.Kaydırma_Kolu && (
            <img
              src={previews.Kaydırma_Kolu}
              alt="Kaydırma_Kolu Preview"
              className="border border-pink-300"
            />
          )}
        </div>
        <div className="flex flex-col gap-2">
       
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => toggleVisibility("Üst_Namlu")}
            className="bg-yellow-500 text-white font-semibold px-2 py-2 rounded"
          >
            {visibility.Üst_Namlu ? "Hide Üst_Namlu" : "Show Üst_Namlu"}
          </motion.button>
          {previews.Üst_Namlu && (
            <img
              src={previews.Üst_Namlu}
              alt="Üst_Namlu Preview"
              className="border border-pink-300"
            />
          )}

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => toggleVisibility("Alt_Namlu")}
            className="bg-purple-500 text-white font-semibold px-2 py-2 rounded"
          >
            {visibility.Alt_Namlu ? "Hide Alt_Namlu" : "Show Alt_Namlu"}
          </motion.button>
          {previews.Alt_Namlu && (
            <img
              src={previews.Alt_Namlu}
              alt="Alt_Namlu Preview"
              className="border border-pink-300"
            />
          )}

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => toggleVisibility("Tetik")}
            className="bg-orange-500 text-white font-semibold px-2 py-2 rounded"
          >
            {visibility.Tetik ? "Hide Tetik" : "Show Tetik"}
          </motion.button>
          {previews.Tetik && (
            <img
              src={previews.Tetik}
              alt="Tetik Preview"
              className="border border-pink-300"
            />
          )}
        </div>
      </div> */}
    </div>
  );
}

export default TufekGoruntule;
