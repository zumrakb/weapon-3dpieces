/* import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export const setupScene = (mountRef, weaponGroupRef, setParts) => {
  let scene, camera, renderer, controls, body;

  // Initialize scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xaaaaaa);

  // Camera setup
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 2, 5);

  // Renderer setup
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  mountRef.current.appendChild(renderer.domElement);

  // Orbit controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.minDistance = 1;
  controls.maxDistance = 10;

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 10, 7.5);
  scene.add(directionalLight);

  // Create a group for weapon parts
  weaponGroupRef.current = new THREE.Group();
  scene.add(weaponGroupRef.current);

  const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };
  animate();

  return () => {
    mountRef.current.removeChild(renderer.domElement); // Cleanup
  };
};
 */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export const setupScene = (mountRef, weaponGroupRef) => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xaaaaaa);

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 2, 5);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  mountRef.current.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.minDistance = 1;
  controls.maxDistance = 10;

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 10, 7.5);
  scene.add(directionalLight);

  weaponGroupRef.current = new THREE.Group();
  scene.add(weaponGroupRef.current);

  const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };
  animate();

  return () => {
    mountRef.current.removeChild(renderer.domElement);
  };
};
