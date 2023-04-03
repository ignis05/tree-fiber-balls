import * as THREE from 'three'
import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Vector3 } from 'three'

function Ball(props: { ballRadius: number; bowlRadius: number }) {
	const mesh = useRef<THREE.Mesh>(null!)

	// returns random value from [-max, max]
	let randomCord = (max: number) => Math.floor(Math.random() * (max * 2)) - max

	return (
		<mesh position={[randomCord(1), randomCord(1), 0]} ref={mesh} scale={props.ballRadius} userData={{ customType: 'ball' }}>
			<circleGeometry args={[1, 32]} />
			<meshStandardMaterial color={THREE.Color.NAMES.hotpink} />
		</mesh>
	)
}

export default Ball
