import * as THREE from 'three'
import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

function Ball(props: { ballRadius: number; bowlRadius: number }) {
	const mesh = useRef<THREE.Mesh>(null!)
	const velocity = useRef<THREE.Vector3>(new THREE.Vector3(...Array(2).fill((Math.random() - 0.5) * 0.01), 0))

	useFrame((state, delta) => {
		mesh.current.position.add(velocity.current)

		// gravity
		velocity.current.y -= 0.0001

		// collision with bowl
		if (mesh.current.position.distanceTo(new THREE.Vector3(0, 0, 0)) >= props.bowlRadius - props.ballRadius) {
			velocity.current = velocity.current.negate()
		}
	})

	return (
		<mesh position={[0, 0, 0]} ref={mesh} scale={props.ballRadius}>
			<circleGeometry args={[1, 32]} />
			<meshStandardMaterial color={THREE.Color.NAMES.hotpink} />
		</mesh>
	)
}

export default Ball
