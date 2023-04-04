import { extend, ReactThreeFiber } from '@react-three/fiber'
import React from 'react'
import * as THREE from 'three'

// alias three line, because otherwise it defaults to JSX.IntrinsicElements.line
extend({ Line_: THREE.Line })
declare global {
	namespace JSX {
		interface IntrinsicElements {
			line_: ReactThreeFiber.Object3DNode<THREE.Line, typeof THREE.Line>
		}
	}
}

function Bowl(props: { scale?: number; center?: THREE.Vector3 }) {
	const scale = props.scale || 1
	const center = props.center || new THREE.Vector3(0, 0, 0)
	let g = new THREE.BufferGeometry().setFromPoints(new THREE.Path().absarc(0, 0, 1, 0, Math.PI * 2, true).getSpacedPoints(128))
	let m = new THREE.LineBasicMaterial({ color: 'black' })

	return <line_ args={[g, m]} scale={scale} position={center} />
}

export default Bowl
