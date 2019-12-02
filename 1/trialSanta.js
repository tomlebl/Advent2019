const inputArr = require('fs')
	.readFileSync('input.txt', { encoding: 'utf-8' })
	.split('\n')
	.map(input => Number(input))

// PART 1

function calculateFuel(modules = '') {
	return modules.map(module => Math.floor(module / 3) - 2).reduce((prev, curr) => prev + curr)
}

console.log(calculateFuel(inputArr))
