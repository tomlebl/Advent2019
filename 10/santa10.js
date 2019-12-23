const fs = require('fs')

const spaceMatrix = fs.readFileSync('input.txt', { encoding: 'utf-8' }).split('\n')

const asteroidArr = []

spaceMatrix.forEach((row, index) => {
	for (let i = 0; i < row.length; i++) {
		if (row[i] === '#') {
			asteroidArr.push({ x: i, y: index })
		}
	}
})

// PART 1

const findBase = asteroidArr => {
	let base = {
		x: 0,
		y: 0,
		canDetect: 0,
		index: 0
	}
	asteroidArr.forEach((asteroid, index) => {
		let angleSet = new Set()

		for (let i = 0; i < asteroidArr.length; i++) {
			asteroidArr[i].index = i

			if (i != index) {
				angleSet.add(Math.atan2(asteroidArr[i].x - asteroid.x, asteroidArr[i].y - asteroid.y))
			}
		}

		if (angleSet.size > base.canDetect) {
			Object.assign(base, asteroid)
			base.canDetect = angleSet.size
		}
	})
	return base
}

const base = findBase(asteroidArr)
console.log(base)

//PART 2

asteroidArr.forEach(asteroid => {
	asteroid.distance = Math.sqrt(Math.pow(base.x - asteroid.x, 2) + Math.pow(base.y - asteroid.y, 2))
	asteroid.angle = (Math.atan2(asteroid.x - base.x, asteroid.y - base.y) * 180) / Math.PI
})

asteroidArr.sort((a, b) => b.angle - a.angle)

const asteroidMap = new Map()
asteroidArr.forEach(asteroid => {
	if (asteroid.index != base.index) {
		if (asteroidMap.has(asteroid.angle)) {
			asteroidMap.get(asteroid.angle).push(asteroid)
		} else {
			asteroidMap.set(asteroid.angle, [asteroid])
		}
	}
})

const anglesAsterArr = Array.from(asteroidMap.values())

anglesAsterArr.map(angle => {
	angle.sort((a, b) => a.distance - b.distance)
})

const targetArr = []
let angleCount = 0
let distanceCount = 0

console.log(anglesAsterArr.length)

do {
	// console.log(angleCount, distanceCount)
	if (anglesAsterArr[angleCount][distanceCount]) {
		targetArr.push(anglesAsterArr[angleCount][distanceCount])
	}
	angleCount++
	if (angleCount === anglesAsterArr.length) {
		distanceCount++
		angleCount = 0
	}
} while (targetArr.length < asteroidArr.length - 1)

console.log(targetArr[199].x * 100 + targetArr[199].y)
