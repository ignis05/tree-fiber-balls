import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { useFrame, ThreeElements } from '@react-three/fiber'

function Ball(props: ThreeElements['mesh']) {
	const mesh = useRef<THREE.Mesh>(null!)
	// useFrame((state, delta) => (mesh.current.rotation.x += delta))
	return (
		<mesh {...props} ref={mesh} scale={0.2}>
			<circleGeometry args={[1, 32]} />
			<meshStandardMaterial color={THREE.Color.NAMES.hotpink} />
		</mesh>
	)
}

export default Ball
