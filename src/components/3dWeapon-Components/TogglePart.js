/* import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export const togglePart = (
  partName,
  modelPath,
  parts,
  setParts,
  weaponGroupRef
) => {
  const loader = new GLTFLoader();
  const currentPart = parts[partName];

  if (!weaponGroupRef.current) {
    console.error("weaponGroup is not initialized yet.");
    return;
  }

  if (currentPart) {
    // If part exists in the scene, remove it
    weaponGroupRef.current.remove(currentPart);
    setParts((prevParts) => ({ ...prevParts, [partName]: null }));
  } else {
    // Load and add part
    loader.load(modelPath, (gltf) => {
      const newPart = gltf.scene;
      weaponGroupRef.current.add(newPart);
      setParts((prevParts) => ({ ...prevParts, [partName]: newPart }));
    });
  }
};
 */

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export const togglePart = (
  partName,
  modelPath,
  parts,
  setParts,
  weaponGroupRef
) => {
  const loader = new GLTFLoader();
  const currentPart = parts[partName];

  // Ensure weaponGroupRef is initialized
  if (!weaponGroupRef.current) {
    console.error("weaponGroup is not initialized yet.");
    return;
  }

  if (currentPart) {
    // Eğer parça sahnedeyse, sahneden kaldır
    weaponGroupRef.current.remove(currentPart);
    setParts((prevParts) => ({ ...prevParts, [partName]: null }));
  } else {
    // Eğer parça sahnede yoksa, yükle ve sahneye ekle
    loader.load(modelPath, (gltf) => {
      const newPart = gltf.scene;
      weaponGroupRef.current.add(newPart);
      setParts((prevParts) => ({ ...prevParts, [partName]: newPart }));
    });
  }
};
