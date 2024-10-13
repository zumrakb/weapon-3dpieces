import React, { useEffect, useRef, useState } from "react";
import { setupScene } from "../components/3dWeapon-Components/SceneSetup";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { createPreview } from "../components/3dWeapon-Components/CreatePreview";

const TufekParcalari = () => {
  const mountRef = useRef(null);
  const weaponGroupRef = useRef(null);
  const previewRefs = useRef({});

  const [parts, setParts] = useState({
    defaultKabza: null,
    defaultKabzaPlastik: null,
    kabza2: null,
    kabzaPlastik2: null,
    tetik: null,
    surguKolu: null,
    namlu: null,
  });

  useEffect(() => {
    const cleanupScene = setupScene(mountRef, weaponGroupRef);
    const loader = new GLTFLoader();

    // Body.glb will be permanent and cannot be removed
    loader.load("/models/Body.glb", (gltf) => {
      const body = gltf.scene;
      weaponGroupRef.current.add(body); // Body remains on the scene
    });

    // Load default parts on refresh, but still removable
    loader.load("/models/Kabza_V1.glb", (gltf) => {
      const defaultKabza = gltf.scene;
      weaponGroupRef.current.add(defaultKabza); // Add to scene
      setParts((prevParts) => ({ ...prevParts, defaultKabza })); // Save state
    });

    loader.load("/models/Kabza_Plastik_V1.glb", (gltf) => {
      const defaultKabzaPlastik = gltf.scene;
      weaponGroupRef.current.add(defaultKabzaPlastik); // Add to scene
      setParts((prevParts) => ({ ...prevParts, defaultKabzaPlastik })); // Save state
    });

    loader.load("/models/Tetik.glb", (gltf) => {
      const tetik = gltf.scene;
      weaponGroupRef.current.add(tetik);
      setParts((prevParts) => ({ ...prevParts, tetik }));
    });

    loader.load("/models/Surgu_Kolu.glb", (gltf) => {
      const surguKolu = gltf.scene;
      weaponGroupRef.current.add(surguKolu);
      setParts((prevParts) => ({ ...prevParts, surguKolu }));
    });

    loader.load("/models/Namlu.glb", (gltf) => {
      const namlu = gltf.scene;
      weaponGroupRef.current.add(namlu);
      setParts((prevParts) => ({ ...prevParts, namlu }));
    });

    // Previews (small images) are created
    createPreview("defaultKabza", "/models/Kabza_V1.glb", previewRefs);
    createPreview(
      "defaultKabzaPlastik",
      "/models/Kabza_Plastik_V1.glb",
      previewRefs
    );
    createPreview("kabza2", "/models/Kabza_V2.glb", previewRefs);
    createPreview("kabzaPlastik2", "/models/Kabza_Plastik_V2.glb", previewRefs);
    createPreview("tetik", "/models/Tetik.glb", previewRefs);
    createPreview("surguKolu", "/models/Surgu_Kolu.glb", previewRefs);
    createPreview("namlu", "/models/Namlu.glb", previewRefs);

    return cleanupScene;
  }, []);

  // Function to toggle the visibility of parts (for all parts including defaults)
  const togglePart = (partName, modelPath) => {
    const loader = new GLTFLoader();
    const currentPart = parts[partName];

    // Ensure weaponGroupRef is initialized
    if (!weaponGroupRef.current) {
      console.error("weaponGroup is not initialized yet.");
      return;
    }

    if (currentPart) {
      // If part exists in the scene, remove it
      weaponGroupRef.current.remove(currentPart);
      setParts((prevParts) => ({ ...prevParts, [partName]: null }));
    } else {
      // If part is not in the scene, load it and add it
      loader.load(modelPath, (gltf) => {
        const newPart = gltf.scene;
        weaponGroupRef.current.add(newPart);
        setParts((prevParts) => ({ ...prevParts, [partName]: newPart }));
      });
    }
  };

  return (
    <div className="flex gap-2">
      <div ref={mountRef} className="w-[60%] h-screen" />
      <div className="w-[20%] flex flex-col gap-2 mt-4 mr-4">
        <button
          onClick={() => togglePart("defaultKabza", "/models/Kabza_V1.glb")}
          className="bg-gray-600 rounded-lg px-4 py-2 hover:bg-gray-500 text-white font-semibold"
        >
          {parts.defaultKabza ? "Remove Default Kabza" : "Add Default Kabza"}
        </button>
        <div ref={(el) => (previewRefs.current.defaultKabza = el)} />

        <button
          onClick={() =>
            togglePart("defaultKabzaPlastik", "/models/Kabza_Plastik_V1.glb")
          }
          className="bg-gray-600 rounded-lg px-4 py-2 hover:bg-gray-500 text-white font-semibold"
        >
          {parts.defaultKabzaPlastik
            ? "Remove Default Kabza Plastik"
            : "Add Default Kabza Plastik"}
        </button>
        <div ref={(el) => (previewRefs.current.defaultKabzaPlastik = el)} />

        <button
          onClick={() => togglePart("kabza2", "/models/Kabza_V2.glb")}
          className="bg-gray-600 rounded-lg px-4 py-2 hover:bg-gray-500 text-white font-semibold"
        >
          {parts.kabza2 ? "Remove Kabza2" : "Add Kabza2"}
        </button>
        <div ref={(el) => (previewRefs.current.kabza2 = el)} />

        <button
          onClick={() =>
            togglePart("kabzaPlastik2", "/models/Kabza_Plastik_V2.glb")
          }
          className="bg-gray-600 rounded-lg px-4 py-2 hover:bg-gray-500 text-white font-semibold"
        >
          {parts.kabzaPlastik2 ? "Remove KabzaPlastik2" : "Add KabzaPlastik2"}
        </button>
        <div ref={(el) => (previewRefs.current.kabzaPlastik2 = el)} />
      </div>
      <div className="w-[20%] flex flex-col gap-2 mt-4 mr-4">
        <button
          onClick={() => togglePart("tetik", "/models/Tetik.glb")}
          className="bg-gray-600 rounded-lg px-4 py-2 hover:bg-gray-500 text-white font-semibold"
        >
          {parts.tetik ? "Remove Tetik" : "Add Tetik"}
        </button>
        <div ref={(el) => (previewRefs.current.tetik = el)} />

        <button
          onClick={() => togglePart("surguKolu", "/models/Surgu_Kolu.glb")}
          className="bg-gray-600 rounded-lg px-4 py-2 hover:bg-gray-500 text-white font-semibold"
        >
          {parts.surguKolu ? "Remove Surgu Kolu" : "Add Surgu Kolu"}
        </button>
        <div ref={(el) => (previewRefs.current.surguKolu = el)} />

        <button
          onClick={() => togglePart("namlu", "/models/Namlu.glb")}
          className="bg-gray-600 rounded-lg px-4 py-2 hover:bg-gray-500 text-white font-semibold"
        >
          {parts.namlu ? "Remove Namlu" : "Add Namlu"}
        </button>
        <div ref={(el) => (previewRefs.current.namlu = el)} />
      </div>
    </div>
  );
};

export default TufekParcalari;
