const fs = require('fs')

const program = fs
	.readFileSync('input.txt', { encoding: 'utf-8' })
	.split(',')
	.map(input => Number(input))

const test = [3, 0, 4, 0, 99]
const test2 = [1002, 4, 3, 4, 33]
const test3 = [1101, 100, -1, 4, 0]

const runProgram = (array, input) => {
	const output = []
	let stepSize = 1
	for (let i = 0; i < array.length; i = i + stepSize) {
		console.log(array[i], i)
		if (array[i] === 3) {
			array[array[i + 1]] = input
			stepSize = 2
		} else if (array[i] === 4) {
			output.push([array[array[i + 1]], i])
			stepSize = 2
		} else if (array[i] === 1) {
			array[array[i + 3]] = array[array[i + 1]] + array[array[i + 2]]
			stepSize = 4
		} else if (array[i] === 2) {
			array[array[i + 3]] = array[array[i + 1]] * array[array[i + 2]]
			stepSize = 4
		} else if (array[i] === 99) {
			return output
		} else {
			const instLength = array[i].toString().length
			let a = '0'
			let b = '0'
			let c = '0'
			const opCode = array[i].toString().slice(instLength - 1)
			if (instLength === 3) {
				c = array[i].toString().slice(0, 1)
			} else if (instLength === 4) {
				b = array[i].toString().slice(0, 1)
				c = array[i].toString().slice(1, 2)
			} else if (instLength === 5) {
				a = array[i].toString().slice(0, 1)
				b = array[i].toString().slice(1, 2)
				c = array[i].toString().slice(2, 3)
			}

			//console.log('code', a, b, c, opCode)

			const par1Value = c === '0' ? array[array[i + 1]] : array[i + 1]
			const par2Value = b === '0' ? array[array[i + 2]] : array[i + 2]

			//console.log(par1Value, par2Value)

			if (opCode === '1') {
				array[array[i + 3]] = par1Value + par2Value
			} else if (opCode === '2') {
				array[array[i + 3]] = par1Value * par2Value
			}

			stepSize = 4

			//console.log('code', a, b, c, opCode)
		}
	}
}

console.log(runProgram(program, 1))
