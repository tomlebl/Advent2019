const fs = require('fs')

const spaceMatrix = fs.readFileSync('input.txt', { encoding: 'utf-8' }).split('\n')

class Asteroid {
	constructor(x, y) {
		this.x = x
		this.y = y
	}
}

console.log(spaceMatrix)
