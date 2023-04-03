import { extend, ReactThreeFiber } from '@react-three/fiber'
import React, { useRef } from 'react'
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

function Bowl(props: { scale?: number }) {
	const line = useRef<any>(null!)

	let g = new THREE.BufferGeometry().setFromPoints(new THREE.Path().absarc(0, 0, 1, 0, Math.PI * 2, true).getSpacedPoints(50))
	let m = new THREE.LineBasicMaterial({ color: 'black' })

	return <line_ args={[g, m]} {...props} />
}

export default Bowl
