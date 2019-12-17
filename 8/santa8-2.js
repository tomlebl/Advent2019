const fs = require('fs')

const inputStr = fs.readFileSync('input.txt', { encoding: 'utf-8' })

const layersArr = []

for (let i = 0; i < inputStr.length; i += 25 * 6) {
	layersArr.push(
		inputStr
			.slice(i, i + 25 * 6)
			.split('')
			.map(input => Number(input))
	)
}

const pixelsArr = []

for (let i = 0; i < 150; i++) {
	const pixel = []
	for (let j = 0; j < layersArr.length; j++) {
		pixel.push(layersArr[j][i])
	}
	pixelsArr.push(pixel)
}

const pixelsArr2 = pixelsArr.map(pixel => pixel.find(e => e != 2))

const display = []

for (let i = 0; i < 6; i++) {
	display.push(pixelsArr2.splice(0, 25).join(''))
}

console.log(display)
