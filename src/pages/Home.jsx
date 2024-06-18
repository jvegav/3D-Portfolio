
import { useState } from "react"

import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import Loader from "../components/Loader"

import Island from '../models/Island2'
import Sky from "../models/Sky"
import Bird from "../models/Bird"
import Plane from "../models/Plane"
import HomeInfo from "../components/HomeInfo"

const Home = () => {

  const adjustIslandForScreenSize = () => {
    let screenScale = null, 
    screenPosition = [0, -26, -39], 
    rotation = [5, 0, 4.25];

    if (window.innerWidth < 768){
      screenScale = [7, 7, 7];
      
    } else {
      screenScale = [7, 7, 7];
      
    }

    return [screenScale, screenPosition, rotation];
  }


  const adjustPlaneForScreenSize = () => {
    let screenScale , screenPosition;
    

    if (window.innerWidth < 768) {
      screenScale = [2, 2, 2];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [2, 2, 2];
      screenPosition = [0, -1.5, 0];
    }


    return [screenScale, screenPosition];
  }

  const[islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize()


  const[planeScale , planePosition] = adjustPlaneForScreenSize();

  const [currentStage, setCurrentStage] = useState(1);

  const [ isRotating , setIsRotating] = useState(false);

  return (
    <section className="w-full h-screen relative">
      <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        {currentStage && <HomeInfo currentStage={currentStage}/>}
      </div>


        <Canvas 
        className={`w-full h-screen bg-indigo-300 ${isRotating ? 'cursor-grabbing': 'cursor-grab'}`}
        camera={{near:0.1, far:100}}>

        <Suspense fallback={<Loader/>}>
          <directionalLight position={[1,1,1]} intensity={0.2}/>
          <ambientLight intensity={0.5}/>
          <spotLight/>
          <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1}/>

          
          <Sky
          isRotating={isRotating}/>
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
          scale = {planeScale}
          position={planePosition}
          rotation={[0.2,1.2,0]}/>

          

        </Suspense>

        </Canvas>
       </section>
  )
}

export default Home