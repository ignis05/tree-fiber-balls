import * as THREE from 'three'
import React, { useRef } from 'react'

function Ball(props: {
	ballRadius: number
	bowlRadius: number
	color: keyof typeof THREE.Color.NAMES
	bowlCenter?: THREE.Vector3
	spawnRange?: number
}) {
	const bowlCenter = props.bowlCenter || new THREE.Vector3(0, 0, 0)
	const spawnRange = props.spawnRange || 1
	const mesh = useRef<THREE.Mesh>(null!)

	// spawn pos vector - [-range, +range] on x and y coords of bowl centre
	const spawnVector = new THREE.Vector3(spawnRange - Math.random() * 2 * spawnRange, 1 - Math.random() * 2, 0).add(bowlCenter)

	return (
		<mesh position={spawnVector} ref={mesh} scale={props.ballRadius} userData={{ customType: 'collisionSim-ball' }}>
			<circleGeometry args={[1, 32]} />
			<meshStandardMaterial color={props.color} />
		</mesh>
	)
}

export default Ball
