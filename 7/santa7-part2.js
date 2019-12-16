const fs = require('fs')
const { permutateWithoutRepetitions } = require('./permuations')

const program = fs
	.readFileSync('input.txt', { encoding: 'utf-8' })
	.split(',')
	.map(input => Number(input))

class Amplifier {
	constructor(program, phase) {
		this.program = [...program]
		this.phase = phase
		this.inputCount = 0
		this.input = undefined
		this.output = 0
		this.pointer = 0
		this.isRunning = true
	}

	getInput(output) {
		this.input = output
	}

	runProgram() {
		let stepSize = 1

		for (let i = this.pointer; i < this.program.length; i = i + stepSize) {
			const instArr = this.program[i].toString().split('')
			const instLength = instArr.length
			const opCode = instArr[instLength - 1]

			let a = '0'
			let b = '0'
			let c = '0'

			if (instLength === 3) {
				c = instArr[0]
			} else if (instLength === 4) {
				b = instArr[0]
				c = instArr[1]
			} else if (instLength === 5) {
				a = instArr[0]
				b = instArr[1]
				c = instArr[2]
			}

			const par1Value = c === '0' ? this.program[this.program[i + 1]] : this.program[i + 1]
			const par2Value = b === '0' ? this.program[this.program[i + 2]] : this.program[i + 2]
			const par3Value = a === '0' ? this.program[i + 3] : i + 3

			let exit = false

			switch (opCode) {
				case '1':
					this.program[this.program[i + 3]] = par1Value + par2Value
					stepSize = 4
					break
				case '2':
					this.program[this.program[i + 3]] = par1Value * par2Value
					stepSize = 4
					break
				case '3':
					if (this.input != undefined) {
						this.program[this.program[i + 1]] = this.inputCount === 0 ? this.phase : this.input
						if (this.inputCount > 0) {
							this.input = undefined
						}
						this.inputCount++
						stepSize = 2
					} else {
						this.pointer = i
						return
					}

					break
				case '4':
					this.output = par1Value
					stepSize = 2
					break
				case '5':
					if (par1Value != 0) {
						stepSize = par2Value - i
					} else {
						stepSize = 3
					}
					break
				case '6':
					if (par1Value === 0) {
						stepSize = par2Value - i
					} else {
						stepSize = 3
					}
					break
				case '7':
					if (par1Value < par2Value) {
						this.program[par3Value] = 1
					} else {
						this.program[par3Value] = 0
					}
					stepSize = 4
					break
				case '8':
					if (this.program[par1Value] === this.program[par2Value]) {
						this.program[par3Value] = 1
					} else {
						this.program[par3Value] = 0
					}
					stepSize = 4
					break
				case '9':
					exit = true
					break
				default:
					console.log('False instruction')
			}

			if (exit || instArr[instLength - 2] === '9') {
				this.isRunning = false
				return
			}
		}
	}
}

const phaseArr = permutateWithoutRepetitions([5, 6, 7, 8, 9])
let maxThruster = 0

//const phase = [9, 7, 8, 5, 6]

phaseArr.forEach(phase => {
	const ampA = new Amplifier(program, phase[0])
	const ampB = new Amplifier(program, phase[1])
	const ampC = new Amplifier(program, phase[2])
	const ampD = new Amplifier(program, phase[3])
	const ampE = new Amplifier(program, phase[4])

	do {
		ampA.getInput(ampE.output)
		ampA.runProgram()
		ampB.getInput(ampA.output)
		ampB.runProgram()
		ampC.getInput(ampB.output)
		ampC.runProgram()
		ampD.getInput(ampC.output)
		ampD.runProgram()
		ampE.getInput(ampD.output)
		ampE.runProgram()
		if (ampE.output > maxThruster) {
			maxThruster = ampE.output
		}
	} while (ampE.isRunning)
})

console.log(maxThruster)
