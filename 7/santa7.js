const fs = require('fs')

const program = fs
	.readFileSync('input.txt', { encoding: 'utf-8' })
	.split(',')
	.map(input => Number(input))

const test = [3, 15, 3, 16, 1002, 16, 10, 16, 1, 16, 15, 15, 4, 15, 99, 0, 0]

const output = [0]

const runProgram = (array, amp, phase) => {
	let stepSize = 1
	let inputCount = 0

	for (let i = 0; i < array.length; i = i + stepSize) {
		const instArr = array[i].toString().split('')
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

		const par1Value = c === '0' ? array[array[i + 1]] : array[i + 1]
		const par2Value = b === '0' ? array[array[i + 2]] : array[i + 2]
		const par3Value = a === '0' ? array[i + 3] : i + 3

		let exit = false
		console.log('opcode', opCode)
		switch (opCode) {
			case '1':
				array[array[i + 3]] = par1Value + par2Value
				stepSize = 4
				break
			case '2':
				array[array[i + 3]] = par1Value * par2Value
				stepSize = 4
				break
			case '3':
				array[array[i + 1]] = inputCount === 0 ? phase[amp] : output[amp]
				console.log(array[array[i + 1]])
				stepSize = 2
				inputCount++
				break
			case '4':
				output.push(par1Value)
				console.log('output', output)
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
					array[par3Value] = 1
				} else {
					array[par3Value] = 0
				}
				stepSize = 4
				break
			case '8':
				if (array[par1Value] === array[par2Value]) {
					array[par3Value] = 1
				} else {
					array[par3Value] = 0
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
			return output
		}
	}
}

function permutateWithoutRepetitions(permutationOptions) {
	if (permutationOptions.length === 1) {
		return [permutationOptions]
	}

	// Init permutations array.
	const permutations = []

	// Get all permutations for permutationOptions excluding the first element.
	const smallerPermutations = permutateWithoutRepetitions(permutationOptions.slice(1))

	// Insert first option into every possible position of every smaller permutation.
	const firstOption = permutationOptions[0]

	for (let permIndex = 0; permIndex < smallerPermutations.length; permIndex += 1) {
		const smallerPermutation = smallerPermutations[permIndex]

		// Insert first option into every possible position of smallerPermutation.
		for (let positionIndex = 0; positionIndex <= smallerPermutation.length; positionIndex += 1) {
			const permutationPrefix = smallerPermutation.slice(0, positionIndex)
			const permutationSuffix = smallerPermutation.slice(positionIndex)
			permutations.push(permutationPrefix.concat([firstOption], permutationSuffix))
		}
	}

	return permutations
}

const phaseArr = permutateWithoutRepetitions([0, 1, 2, 3, 4])
// const outputArr = [0]

for (let amp = 0; amp <= 4; amp++) {
	console.log(runProgram(test, amp, [4, 3, 2, 1, 0]))
}
// console.log(outputArr)

// console.log(runProgram(test, 0, [4, 3, 2, 1, 0], [0]))
