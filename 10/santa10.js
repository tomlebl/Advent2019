const fs = require('fs')

const spaceMatrix = fs.readFileSync('test1.txt', { encoding: 'utf-8' }).split('\n')

const asteroidArr = []

spaceMatrix.forEach((row, index) => {
	for (let i = 0; i < row.length; i++) {
		if (row[i] === '#') {
			asteroidArr.push({ x: i, y: index })
		}
	}
})

const findBase = asteroidArr => {
	let base = {
		x: 0,
		y: 0,
		canDetect: 0,
		index: 0
	}
	asteroidArr.forEach((asteroid, index) => {
		let slopeSet1 = new Set()
		let slopeSet2 = new Set()

		for (let i = 0; i < asteroidArr.length; i++) {
			asteroidArr[i].index = i
			const slope = (asteroidArr[i].x - asteroid.x) / (asteroidArr[i].y - asteroid.y)

			if (i < index) {
				slopeSet1.add(slope)
			} else if (i > index) {
				slopeSet2.add(slope)
			}
		}
		let asteroidsDetected = slopeSet1.size + slopeSet2.size
		if (asteroidsDetected > base.canDetect) {
			Object.assign(base, asteroid)
			base.canDetect = asteroidsDetected
		}
	})
	return base
}

const base = findBase(asteroidArr)
console.log(base)

asteroidArr.forEach(asteroid => {
	asteroid.distance = Math.sqrt(Math.pow(base.x - asteroid.x, 2) + Math.pow(base.y - asteroid.y, 2))
	asteroid.angle = (Math.atan((base.x - asteroid.x) / Math.abs(base.y - asteroid.y)) * 180) / Math.PI
})

asteroidArr.sort((a, b) => a.angle - b.angle)

const asteroidMap = new Map()
asteroidArr.forEach(asteroid => {
	if (asteroidMap.has(asteroid.angle)) {
		asteroidMap.get(asteroid.angle).push(asteroid)
	} else {
		asteroidMap.set(asteroid.angle, [asteroid])
	}
})

console.log(asteroidMap.size)
