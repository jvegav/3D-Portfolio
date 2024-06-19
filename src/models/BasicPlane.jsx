import  { useEffect, useRef } from 'react'


import planeScene from '../assets/3d/basic_plane.glb'
import { useAnimations, useGLTF } from '@react-three/drei'


const BasicPlane = ({isRotating, ...props}) => {

    const ref = useRef()
    const {scene,animations} = useGLTF(planeScene)
    const {actions} = useAnimations(animations, ref)


    useEffect(()=>{
        if (isRotating) {
            actions["basic_plane_bones|basic_plane_bones|basic_plane_bones|ArmatureAction|basic_plane_"].play();
          } else {
            actions["basic_plane_bones|basic_plane_bones|basic_plane_bones|ArmatureAction|basic_plane_"].stop();
            
          }
    },[actions,isRotating])

  return (
    <mesh {...props} ref = {ref}>

        <primitive object={scene}></primitive>
    </mesh>
  )
}

export default BasicPlane