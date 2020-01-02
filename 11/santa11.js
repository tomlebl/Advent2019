const fs = require('fs')

const program = fs
	.readFileSync('input.txt', { encoding: 'utf-8' })
	.split(',')
	.map(input => Number(input))

class Robot {
	constructor(program, input) {
		this.program = [...program]
		this.output = []
		this.relativeBase = 0
		this.memory = new Map()
		this.input = input
		this.coordinates = { x: 0, y: 0 }
		this.canvas = new Map()
		this.direction = 0
	}

	runProgram() {
		let stepSize = 1

		this.program.forEach((element, index) => {
			this.memory.set(index, element)
		})

		for (let i = 0; i < this.program.length; i = i + stepSize) {
			const instStr = this.memory.get(i).toString()
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

			const address1 =
				c === '0' ? this.memory.get(i + 1) : c === '1' ? i + 1 : this.memory.get(i + 1) + this.relativeBase

			const address2 =
				b === '0' ? this.memory.get(i + 2) : b === '1' ? i + 2 : this.memory.get(i + 2) + this.relativeBase

			const address3 = a === '0' ? this.memory.get(i + 3) : a === 1 ? i + 3 : this.memory.get(i + 3) + this.relativeBase

			const par1Value = this.memory.get(address1) ? this.memory.get(address1) : 0
			const par2Value = this.memory.get(address2) ? this.memory.get(address2) : 0

			switch (opCode) {
				case 1:
					this.memory.set(address3, par1Value + par2Value)
					stepSize = 4
					break
				case 2:
					this.memory.set(address3, par1Value * par2Value)
					stepSize = 4
					break
				case 3:
					this.memory.set(address1, this.input)
					stepSize = 2
					break
				case 4:
					this.output.push(par1Value)
					stepSize = 2
					if (this.output.length === 2) {
						this.moveRobot()
					}
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
						this.memory.set(address3, 1)
					} else {
						this.memory.set(address3, 0)
					}
					stepSize = 4
					break
				case 8:
					if (par1Value === par2Value) {
						this.memory.set(address3, 1)
					} else {
						this.memory.set(address3, 0)
					}
					stepSize = 4
					break
				case 9:
					this.relativeBase += par1Value
					stepSize = 2

					break
				case 99:
					return this.output
				default:
					console.log('False instruction')
			}
		}
	}

	get coordStr() {
		const { x, y } = this.coordinates
		return `${x};${y}`
	}

	moveRobot() {
		//painting panel

		this.canvas.set(this.coordStr, this.output[0])

		//setting direction
		switch (this.output[1]) {
			case 0:
				this.direction--
				break
			case 1:
				this.direction++
				break
			default:
				console.log('Error direction')
		}

		if (Math.abs(this.direction) === 4) {
			this.direction = 0
		}
		//moving to next pannel
		switch (this.direction) {
			case 0:
				this.coordinates.y++
				break
			case -3:
			case 1:
				this.coordinates.x++
				break
			case -2:
			case 2:
				this.coordinates.y--
				break
			case -1:
			case 3:
				this.coordinates.x--
				break
			default:
				console.log('Error move')
		}
		//reading new panel
		if (this.canvas.has(this.coordStr)) {
			this.input = this.canvas.get(this.coordStr)
		} else {
			this.input = 0
		}

		this.output = []
	}

	printCanvas() {
		let iterator = this.canvas.values()
		const canvasArr = Array.from(this.canvas.keys()).map(panel => {
			const newPanel = panel.split(';')
			newPanel.push(iterator.next().value)
			return newPanel
		})

		const canvasArr3D = []
		const rowCoordinates = []

		canvasArr.forEach(panel => {
			if (!rowCoordinates.includes(panel[1])) {
				rowCoordinates.push(panel[1])
			}
		})

		rowCoordinates.forEach(coordinate => {
			const row = canvasArr.filter(panel => coordinate === panel[1])
			canvasArr3D.push(row)
		})

		const print = canvasArr3D.map(row => {
			const rowPrint = []
			for (let i = 0; i < row.length; i++) {
				const currentPannel = row.find(panel => Number(panel[0]) === i)

				if (!currentPannel || currentPannel[2] === 0) {
					rowPrint.push(' ')
				} else {
					rowPrint.push('#')
				}
			}
			return rowPrint.join('')
		})

		console.log(print)
	}
}

//PART 1
const robot1 = new Robot(program, 0)
robot1.runProgram()
console.log(robot1.canvas.size)

//PART 2
const robot2 = new Robot(program, 1)
robot2.runProgram()
robot2.printCanvas()
