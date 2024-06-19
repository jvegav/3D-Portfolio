import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

import skyScene from "../assets/3d/night_sky.glb";

// 3D Model from: https://sketchfab.com/3d-models/phoenix-bird-844ba0cf144a413ea92c779f18912042
export default function Sky({ isRotating ,...props}) {

  const sky = useGLTF(skyScene);
  const skyRef = useRef();

 
  useFrame((_, delta) => {
    if (isRotating) {
      skyRef.current.rotation.y += 0.3 * delta; 
    }
  });

  return (
    <mesh ref={skyRef} {...props}>
      
      <primitive object={sky.scene} />
    </mesh>
  );
}