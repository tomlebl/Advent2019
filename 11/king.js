const fs = require('fs')
let input = fs.readFileSync('./input.txt').toString()
input = input.split(',').map(n => Number(n))

const ParamMode = Object.freeze({ position: '0', immediate: '1', relative: '2' })

const nextInstIndex = (instIndex, diagProg) => {
	let res = instIndex
	const inst = diagProg[instIndex].toString().padStart(5, '0')
	const opCode = inst[3].toString() + inst[4].toString()

	if (opCode === '01' || opCode === '02' || opCode === '07' || opCode === '08') {
		res += 4
	} else if (opCode === '03' || opCode === '04' || opCode === '09') {
		res += 2
	} else if (opCode === '05' || opCode === '06') {
		res += 3
	}

	return res
}

const undefinedToZero = val => {
	return val === undefined ? 0 : val
}

const calcIndexWithParamMode = (modeParam, positionArgValue, immediateArgValue, relativeBase, diagProg) => {
	switch (modeParam) {
		case ParamMode.position:
			return positionArgValue
		case ParamMode.immediate:
			return immediateArgValue
		case ParamMode.relative:
			return relativeBase + diagProg[immediateArgValue]
		default:
			break
	}
}

const runOpCode = (instIndex, diagProg, arrayInputInst, logOutputsYN = true, relativeBase = 0) => {
	const inst = diagProg[instIndex].toString().padStart(5, '0')
	const opCode = inst[3].toString() + inst[4].toString()
	const modeFirstParam = inst[2].toString()
	const modeSecondParam = inst[1].toString()
	const modeThirdParam = inst[0].toString()

	let jumpToIndex = null
	let output = null

	if (opCode === '99') {
		return { success: false, jumpToIndex: jumpToIndex, output: output, relativeBase: relativeBase }
	} else {
		const auxArg1 = diagProg[instIndex + 1]
		const indexArg1 = undefinedToZero(
			calcIndexWithParamMode(modeFirstParam, auxArg1, instIndex + 1, relativeBase, diagProg)
		)
		const arg1 = diagProg[indexArg1]
		const auxArg2 = diagProg[instIndex + 2]
		const arg2 =
			diagProg[undefinedToZero(calcIndexWithParamMode(modeSecondParam, auxArg2, instIndex + 2, relativeBase, diagProg))]
		const auxindexArg3 = diagProg[instIndex + 3]
		const indexArg3 = undefinedToZero(
			calcIndexWithParamMode(modeThirdParam, auxindexArg3, instIndex + 3, relativeBase, diagProg)
		)

		switch (opCode) {
			case '01':
				diagProg[indexArg3] = arg1 + arg2
				break
			case '02':
				diagProg[indexArg3] = arg1 * arg2
				break
			case '03':
				if (arrayInputInst.length === 0) {
					return {
						success: true,
						jumpToIndex: null,
						output: null,
						relativeBase: relativeBase,
						isWaitingInst: instIndex
					}
				}

				diagProg[indexArg1] = arrayInputInst[0]
				arrayInputInst.length >= 1 && arrayInputInst.shift()
				break
			case '04':
				logOutputsYN && console.log(arg1)
				output = arg1
				break
			case '05':
				jumpToIndex = arg1 !== 0 ? arg2 : null
				break
			case '06':
				jumpToIndex = arg1 === 0 ? arg2 : null
				break
			case '07':
				diagProg[indexArg3] = arg1 < arg2 ? 1 : 0
				break
			case '08':
				diagProg[indexArg3] = arg1 === arg2 ? 1 : 0
				break
			case '09':
				relativeBase += arg1
				break
			default:
				break
		}
	}

	if (jumpToIndex < 0) {
		return { success: false, jumpToIndex: jumpToIndex, output: null, relativeBase: relativeBase, isWaitingInst: null }
	} else {
		return { success: true, jumpToIndex: jumpToIndex, output: output, relativeBase: relativeBase, isWaitingInst: null }
	}
}

const runProgram = (arrayInputInst, diagProg, instIndex = 0, relativeBase = 0) => {
	let auxProg = [...diagProg]
	let executeOpCode = {}
	let output = null
	let listOutputs = []
	let isWaitingInst = null

	while (true) {
		executeOpCode = runOpCode(instIndex, auxProg, arrayInputInst, false, relativeBase)
		relativeBase = executeOpCode.relativeBase
		isWaitingInst = executeOpCode.isWaitingInst

		if (!executeOpCode.success || isWaitingInst !== null) {
			break
		}

		if (executeOpCode.output !== null) {
			output = executeOpCode.output
			listOutputs.push(output)
		}

		const jumpToIndex = executeOpCode.jumpToIndex

		if (jumpToIndex === null) {
			instIndex = nextInstIndex(instIndex, auxProg)
		} else {
			instIndex = jumpToIndex
		}
	}
	auxProg = auxProg.map(i => undefinedToZero(i))
	return {
		output: listOutputs,
		prog: auxProg,
		exit: !executeOpCode.success,
		isWaitingInst: isWaitingInst,
		relativeBase: relativeBase
	}
}

//---------------------------------------- Day11

const calcNextDirection = (bitDirection, strDirection) => {
	const arrayDirections = ['U', 'R', 'D', 'L']

	//0 goes to previous; 1 goes to next direction
	let index = arrayDirections.indexOf(strDirection)

	if (bitDirection === 0) {
		index -= 1
		index < 0 ? (index = arrayDirections.length - 1) : (index = index)
	} else {
		index += 1
		index === arrayDirections.length ? (index = 0) : (index = index)
	}
	return arrayDirections[index]
}

const getPanel = (position, listPanels) => {
	for (const panel of listPanels) {
		if (panel.position[0] === position[0] && panel.position[1] === position[1]) {
			return panel
		}
	}
	return null
}

const getColorPanel = (position, listPaintedPanels) => {
	const panel = getPanel(position, listPaintedPanels)

	// 0 means to paint the panel black, and 1 means to paint the panel white.
	if (panel === null) {
		return 0
	} else {
		return panel.color
	}
}

const savePanel = (position, listPaintedPanels, colorPanel) => {
	let editedList = [...listPaintedPanels]
	const panel = getPanel(position, editedList)

	if (panel === null) {
		editedList.push({ position: position, color: colorPanel })
	} else {
		panel.color = colorPanel
	}

	return editedList
}

const nextPosition = (position, strDirection) => {
	let x = position[0]
	let y = position[1]

	switch (strDirection) {
		case 'U':
			y += 1
			break
		case 'D':
			y -= 1
			break
		case 'L':
			x -= 1
			break
		case 'R':
			x += 1
			break
		default:
			break
	}

	return [x, y]
}

const countPaintedPanels = (diagProg, inputIntCode = 0) => {
	let auxProg = [...diagProg]
	let listPaintedPanels = []
	let position = [0, 5]
	let instructionIndex = 0
	let relativeBase = 0
	let direction = 'U'
	let colorPanel = 0
	let progOutput = null

	let isFirstCycle = true
	while (true) {
		// input instructions 0 if the robot is over a black panel or 1 if the robot is over a white panel.
		if (!isFirstCycle) {
			colorPanel = getColorPanel(position, listPaintedPanels)
			inputIntCode = colorPanel
		} else {
			isFirstCycle = false
		}

		// run prog with specific input color
		executeProg = runProgram([inputIntCode], auxProg, instructionIndex, relativeBase)
		progOutput = executeProg.output
		instructionIndex = executeProg.isWaitingInst
		relativeBase = executeProg.relativeBase
		auxProg = executeProg.prog
		colorPanel = progOutput[0]
		listPaintedPanels = savePanel(position, listPaintedPanels, colorPanel)
		direction = calcNextDirection(progOutput[1], direction)
		position = nextPosition(position, direction)

		if (executeProg.exit === true) {
			break
		}
	}

	return {
		count: listPaintedPanels.length,
		list: listPaintedPanels
	}
}

const printRegistrationID = input => {
	const listPaintedPanels = countPaintedPanels(input, 1).list
	let listToPrint = []

	//looked at list and saw that max X was 40 and max Y was 5
	for (let i = 5; i >= 0; i--) {
		let line = ''
		for (let j = 0; j < 41; j++) {
			const panel = getPanel([j, i], listPaintedPanels)

			if (panel === null) {
				line += ' '
			} else {
				const strColor = panel.color === 0 ? ' ' : '#'
				line += strColor
			}
		}
		listToPrint.push(line)
	}

	return listToPrint
}

console.time('part1')
console.log(countPaintedPanels(input, 1).count)
console.timeEnd('part1')
console.time('part2')
console.log(printRegistrationID(input))
console.timeEnd('part2')
