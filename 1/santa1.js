const fs = require('fs')

const inputArray = fs
	.readFileSync('input.txt', { encoding: 'utf-8' })
	.split('\n')
	.map(input => Number(input))

// PART 1

const getFuel = mass => Math.floor(mass / 3) - 2

const getTotalFuel = (input, getFuelFunction) =>
	input.reduce((accumulator, mass) => accumulator + getFuelFunction(mass), 0)

console.log(getTotalFuel(inputArray, getFuel))

//PART 2

const getFuel2 = mass => {
	const fuelModuleArr = []
	fuelModuleArr.push(getFuel(mass))
	for (let i = 0; i < fuelModuleArr.length; i++) {
		let fuel = getFuel(fuelModuleArr[i])
		if (fuel > 0) {
			fuelModuleArr.push(fuel)
		} else {
			return fuelModuleArr.reduce((accumulator, fuel) => accumulator + fuel)
		}
	}
}

console.log(getTotalFuel(inputArray, getFuel2))
