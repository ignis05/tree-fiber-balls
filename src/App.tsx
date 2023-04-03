import React from 'react'
import { Canvas, ThreeElements } from '@react-three/fiber'
import Ball from './components/Ball'
import Bowl from './components/Bowl'

function App(props: ThreeElements['mesh']) {
	const bowlRadius = 3.5
	const ballRadius = 0.2

	return (
		<Canvas style={{ border: '1px solid black', width: '600px', height: '600px' }}>
			<axesHelper args={[10]} />
			<ambientLight />
			<pointLight position={[10, 10, 10]} />
			<Ball ballRadius={ballRadius} bowlRadius={bowlRadius} />
			<Ball ballRadius={ballRadius} bowlRadius={bowlRadius} />
			<Ball ballRadius={ballRadius} bowlRadius={bowlRadius} />
			<Bowl scale={bowlRadius} />
		</Canvas>
	)
}

export default App
