import React from 'react'
import { useFrame } from '@react-three/fiber'
import Ball from './Ball'
import Bowl from './Bowl'
import { Color, Mesh, Vector3 } from 'three'

function CollisionSim(props: { position?: Vector3; gravity?: number }) {
	const gravityPull = props.gravity || 0.0002
	const bowlRadius = 3.5
	const ballRadius = 0.2
	const centerPos = props.position || new Vector3(0, 0, 0)

	let colors = Object.keys(Color.NAMES) as Array<keyof typeof Color.NAMES>
	const ballColors = Array(20)
		.fill('')
		.map((el) => colors[Math.floor(Math.random() * colors.length)])

	useFrame((state, delta) => {
		let balls: Mesh[] = state.scene.children.filter((el: any) => el?.userData?.customType === 'collisionSim-ball') as Mesh[]

		for (let ball of balls) {
			// set up new object
			if (!ball.userData.velocity) {
				ball.userData.velocity = new Vector3(...Array(2).fill(0.01 - Math.random() * 0.02), 0) // random starting velocity

				continue
			}

			// gravity
			ball.userData.velocity.y -= gravityPull

			// collision with bowl
			if (ball.position.distanceTo(centerPos) >= bowlRadius - ballRadius) {
				let collisionPoint = ball.position.clone().sub(centerPos).setLength(bowlRadius).add(ball.position)
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
				let dist = ball1.position.distanceTo(ball2.position)

				// balls not colliding
				if (dist > ballRadius * 2) continue

				// calculate velocities after collision
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

				// reposition balls to touching points - prevents clipping or getting stuck into each other
				let pos_center = ball1.position.clone().add(ball2.position).divideScalar(2)
				let v1 = ball1.position.clone().sub(pos_center).setLength(ballRadius)
				let v2 = ball2.position.clone().sub(pos_center).setLength(ballRadius)
				ball1.position.copy(pos_center.clone().add(v1))
				ball2.position.copy(pos_center.clone().add(v2))

				break
			}
		}
	})

	return (
		<>
			{ballColors.map((color, i) => (
				<Ball key={i} ballRadius={ballRadius} bowlRadius={bowlRadius} bowlCenter={centerPos} color={color} />
			))}
			<Bowl scale={bowlRadius} center={centerPos} />
		</>
	)
}

export default CollisionSim
