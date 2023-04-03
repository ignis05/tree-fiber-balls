import * as THREE from 'three'
import React, { useRef } from 'react'

function Ball(props: { ballRadius: number; bowlRadius: number; color: keyof typeof THREE.Color.NAMES }) {
	const mesh = useRef<THREE.Mesh>(null!)

	// returns random value from [-max, max]
	let randomCord = (max: number) => max - Math.random() * (max * 2)

	return (
		<mesh position={[randomCord(1), randomCord(1), 0]} ref={mesh} scale={props.ballRadius} userData={{ customType: 'ball' }}>
			<circleGeometry args={[1, 32]} />
			<meshStandardMaterial color={props.color} />
		</mesh>
	)
}

export default Ball
