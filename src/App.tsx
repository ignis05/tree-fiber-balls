import React, { useRef } from 'react'
import { Canvas, ThreeElements, useFrame } from '@react-three/fiber'
import Ball from './components/Ball'
import Bowl from './components/Bowl'
import * as THREE from 'three'
import { Mesh, Vector3 } from 'three'

function App(props: ThreeElements['mesh']) {
	const bowlRadius = 3.5
	const ballRadius = 0.2

	useFrame((state, delta) => {
		let balls: Mesh[] = state.scene.children.filter((el: any) => el?.userData?.customType === 'ball') as Mesh[]

		for (let ball of balls) {
			// set up new object
			if (!ball.userData.velocity) {
				ball.userData.velocity = new Vector3(...Array(2).fill(0.01 - Math.random() * 0.02), 0) // random starting velocity

				continue
			}

			// gravity
			ball.userData.velocity.y -= 0.0001

			// collision with bowl
			if (ball.position.distanceTo(new Vector3(0, 0, 0)) >= bowlRadius - ballRadius) {
				let collisionPoint = ball.position.clone().sub(new Vector3(0, 0, 0)).setLength(bowlRadius).add(ball.position)
				let directionVector = ball.position.clone().sub(collisionPoint).setLength(ball.userData.velocity.length())
				ball.userData.velocity = directionVector
			}

			ball.position.add(ball.userData.velocity)
		}

		// check ball collisions
		for (let i = 0; i < balls.length; i++) {
			for (let j = i + 1; j < balls.length; j++) {
				let ball1 = balls[i]
				let ball2 = balls[j]
				let distSq = ball1.position.distanceToSquared(ball2.position)

				// balls not colliding
				if (distSq > (ballRadius * 2) ** 2) continue

				let normal = ball1.position.clone().sub(ball2.position).normalize()
				let tangent = new Vector3(-normal.y, normal.x, 0)
				let vel_center = ball1.userData.velocity.clone().add(ball2.userData.velocity).divideScalar(2)
				let vel_difference = ball1.userData.velocity.clone().sub(ball2.userData.velocity).divideScalar(2)
				// resolve in two directions
				var a = vel_difference.x * normal.x + vel_difference.y * normal.y
				var b = vel_difference.x * tangent.x + vel_difference.y * tangent.y
				// reflect difference in normal
				var cx = -a * normal.x + b * tangent.x
				var cy = -a * normal.y + b * tangent.y
				// set calculated velocities for both balls
				ball1.userData.velocity.set(vel_center.x + cx, vel_center.y + cy, 0)
				ball2.userData.velocity.set(vel_center.x - cx, vel_center.y - cy, 0)

				// balls crammed deep into eachother - push them apart
				if (distSq < (ballRadius * 0.5) ** 2) {
					const unstuckPower = ((ballRadius * 2) ** 2 - distSq) * 0.1
					const unstuckDist = ballRadius * 2
					let v1 = ball1.position.clone().sub(ball2.position).setLength(unstuckPower)
					let v2 = ball2.position.clone().sub(ball1.position).setLength(unstuckPower)
					let p1 = ball1.position.clone().sub(ball2.position).setLength(unstuckDist)
					let p2 = ball2.position.clone().sub(ball1.position).setLength(unstuckDist)
					ball1.position.add(p1)
					ball2.position.add(p2)
					ball1.userData.velocity.add(v1)
					ball2.userData.velocity.add(v2)
				}

				// balls hardstuck or spawned into each other - tp one of them
				if (distSq < (ballRadius * 0.1) ** 2) {
					ball2.position.set(Math.floor(Math.random() * (1 * 2)) - 1, Math.floor(Math.random() * (1 * 2)) - 1, 0)
				}

				break
			}
		}
	})

	return (
		<>
			<axesHelper args={[10]} />
			<ambientLight />
			<pointLight position={[10, 10, 10]} />
			<Ball ballRadius={ballRadius} bowlRadius={bowlRadius} />
			<Ball ballRadius={ballRadius} bowlRadius={bowlRadius} />
			<Ball ballRadius={ballRadius} bowlRadius={bowlRadius} />
			<Ball ballRadius={ballRadius} bowlRadius={bowlRadius} />
			<Ball ballRadius={ballRadius} bowlRadius={bowlRadius} />
			<Bowl scale={bowlRadius} />
		</>
	)
}

export default App
