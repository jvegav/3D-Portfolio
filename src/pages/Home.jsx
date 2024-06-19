import { useState } from "react";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Loader from "../components/Loader";

import Island from "../models/Island2";
import Sky from "../models/Sky";
import Bird from "../models/Bird";
import Plane from "../models/Plane";
import HomeInfo from "../components/HomeInfo";
import PixelPlane from "../models/PixelPlane";

const Home = () => {
  const adjustIslandForScreenSize = () => {
    let screenScale = null,
      screenPosition = [0, -26, -39],
      rotation = [5, 0, 4.25];

    if (window.innerWidth < 768) {
      screenScale = [7, 7, 7];
    } else {
      screenScale = [7, 7, 7];
    }

    return [screenScale, screenPosition, rotation];
  };

  const adjustBasicPlaneForScreenSize = () => {
    let screenScale, screenPosition;
    let rotation = [3.5, -1.5, -0.1];

    if (window.innerWidth < 768) {
      screenScale = [-0.5, -0.5, -0.5];
      screenPosition = [1, -1, -10];
    } else {
      screenScale = [-0.5, -0.5, -0.5];
      screenPosition = [1, -1, -10];
    }

    return [screenScale, screenPosition, rotation];
  };

  const adjustPixelPlaneForScreenSize = () => {
    let screenScale, screenPosition;
    let rotation = [0.2, -1.5, -0.1];

    if (window.innerWidth < 768) {
      screenScale = [0.004, 0.004, 0.004];
      screenPosition = [2.7, -2, -8];
    } else {
      screenScale = [0.004, 0.004, 0.004];
      screenPosition = [2.7, -2, -8];
    }

    return [screenScale, screenPosition, rotation];
  };

  const [islandScale, islandPosition, islandRotation] =
    adjustIslandForScreenSize();

  const [pixelPlaneScale, pixelPlanePosition, pixelPlaneRotation] =
    adjustPixelPlaneForScreenSize();
  const [basicPlaneScale, basicPlanePosition, basicPlaneRotation] =
    adjustBasicPlaneForScreenSize();

  const [currentStage, setCurrentStage] = useState(1);

  const [isRotating, setIsRotating] = useState(false);

  return (
    <section className="w-full h-screen relative bg-slate-950">
      <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div>

      <Canvas
        className={`w-full h-screen bg-slate-950 ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{ near: 0.1, far: 100 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={0.2} />
          <ambientLight intensity={0.5} />
          <spotLight />
          <hemisphereLight
            skyColor="#b1e1ff"
            groundColor="#000000"
            intensity={1}
          />

          <Sky
          isRotating={isRotating}
          position={[0,0,-20]} 
          />

          <Island
            position={islandPosition}
            scale={islandScale}
            rotation={islandRotation}
            isRotating={isRotating}
            setCurrentStage={setCurrentStage}
            setIsRotating={setIsRotating}
          />

          <PixelPlane
            isRotating={isRotating}
            scale={pixelPlaneScale}
            position={pixelPlanePosition}
            rotation={pixelPlaneRotation}
          />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Home;

{
  /* 
<Island
  position = {islandPosition}
  scale = {islandScale}
  rotation = {islandRotation}
  isRotating = {isRotating}
  setCurrentStage={setCurrentStage}
  setIsRotating={setIsRotating}
/> 

<Plane
          isRotating={isRotating}
          scale = {basicPlaneScale}
          position={basicPlanePosition}
          rotation={basicPlaneRotation}/>
*/
}
