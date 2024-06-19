import  { useEffect, useRef } from 'react'


import planeScene from '../assets/3d/pixel_plane.glb'
import { useAnimations, useGLTF } from '@react-three/drei'


const PixelPlane = ({isRotating, ...props}) => {

    const ref = useRef()
    const {scene,animations} = useGLTF(planeScene)
    const {actions} = useAnimations(animations, ref)


    useEffect(()=>{
        if (isRotating) {
            actions["ArmatureAction.001"].play();
          } else {
            actions["ArmatureAction.001"].stop();
          }
    },[actions,isRotating])

  return (
    <mesh {...props} ref = {ref}>

        <primitive object={scene}></primitive>
    </mesh>
  )
}

export default PixelPlane