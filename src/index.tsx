import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import CollisionSim from './components/CollisionSim'
import reportWebVitals from './reportWebVitals'
import { Canvas } from '@react-three/fiber'
import { Vector3 } from 'three'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<React.StrictMode>
		<Canvas style={{ border: '1px solid black', width: '600px', height: '600px' }}>
			<axesHelper args={[10]} />
			<ambientLight />

			<CollisionSim position={new Vector3(0, 0, 0)} gravity={0.0003} />
		</Canvas>
	</React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
