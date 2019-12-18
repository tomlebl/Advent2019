const fs = require('fs')

const program = fs
	.readFileSync('input.txt', { encoding: 'utf-8' })
	.split(',')
	.map(input => Number(input))

const test = [99]

class Computer {
	constructor(program) {
		this.program = [...program]
		this.output = 0
	}

	runProgram(input) {
		let stepSize = 1

		for (let i = 0; i < this.program.length; i = i + stepSize) {
			const instStr = this.program[i].toString()
			const instLength = instStr.length
			let opCode
			if (instLength <= 2) {
				opCode = Number(instStr)
			} else {
				opCode = Number(instStr.slice(instStr.length - 2))
			}

			let a = '0'
			let b = '0'
			let c = '0'

			if (instLength === 3) {
				c = instStr[0]
			} else if (instLength === 4) {
				b = instStr[0]
				c = instStr[1]
			} else if (instLength === 5) {
				a = instStr[0]
				b = instStr[1]
				c = instStr[2]
			}

			const par1Value = c === '0' ? this.program[this.program[i + 1]] : this.program[i + 1]
			const par2Value = b === '0' ? this.program[this.program[i + 2]] : this.program[i + 2]
			const par3Value = a === '0' ? this.program[i + 3] : i + 3

			let exit = false

			switch (opCode) {
				case 1:
					this.program[this.program[i + 3]] = par1Value + par2Value
					stepSize = 4
					break
				case 2:
					this.program[this.program[i + 3]] = par1Value * par2Value
					stepSize = 4
					break
				case 3:
					this.program[this.program[i + 1]] = input
					stepSize = 2
					break
				case 4:
					this.output = par1Value
					stepSize = 2
					break
				case 5:
					if (par1Value != 0) {
						stepSize = par2Value - i
					} else {
						stepSize = 3
					}
					break
				case 6:
					if (par1Value === 0) {
						stepSize = par2Value - i
					} else {
						stepSize = 3
					}
					break
				case 7:
					if (par1Value < par2Value) {
						this.program[par3Value] = 1
					} else {
						this.program[par3Value] = 0
					}
					stepSize = 4
					break
				case 8:
					if (this.program[par1Value] === this.program[par2Value]) {
						this.program[par3Value] = 1
					} else {
						this.program[par3Value] = 0
					}
					stepSize = 4
					break
				case 9:
					console.log('base ofset')
					break
				case 99:
					return 'EXIT'
				default:
					console.log('False instruction')
			}
		}
	}
}

const comp = new Computer(test)

console.log(comp.runProgram())
