/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame } from '@react-three/fiber'
import './App.css'
import { OrbitControls } from '@react-three/drei'
import { Suspense } from 'react'
import * as THREE from 'three'
import tex from './assets/sphereTex2.png'

function App() {

  return (
    <>
      <Canvas
            gl={{ alpha: true}}
            camera={{ position: [0, 15, 20], fov: 32.5, near: 1, far: 100 }}
            className='h-full w-full'
        >
            <ambientLight intensity={1.8} />
            <directionalLight position={[0, 5, -4]} intensity={4} />
            <AnimatedSphere/>
            <Suspense fallback={null}>
                <OrbitControls dampingFactor={0.2} enableZoom={false}/>
            </Suspense>
        </Canvas>
    </>
  )
}

export default App

function AnimatedSphere() {
  const texture = new THREE.TextureLoader().load(tex);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set( 2, 2 );

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime()
    // texture.offset.y += 0.15;
    // texture.offset.y += 0.15;
    texture.offset.y =  a * 0.25;
})

  return (
    <mesh position={[0,-1,0]}>
        <sphereGeometry args={[5, 50, 50]} />
        <meshStandardMaterial map={texture} transparent />
    </mesh>
)
}
