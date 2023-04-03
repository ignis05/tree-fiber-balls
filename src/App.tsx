import React from 'react'
import { Canvas, ThreeElements } from '@react-three/fiber'
import Box from './components/Box'

function App(props: ThreeElements['mesh']) {
	return (
		<Canvas style={{ border: '1px solid black', width: '600px', height: '600px' }}>
			<ambientLight />
			<pointLight position={[10, 10, 10]} />
			<Box position={[-1.2, 0, 0]} />
			<Box position={[1.2, 0, 0]} />
		</Canvas>
	)
}

export default App
