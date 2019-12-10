const fs = require('fs')
const { permutateWithoutRepetitions } = require('./permuations')
const { runProgram } = require('./runProgram')

const program = fs
   .readFileSync('input.txt', { encoding: 'utf-8' })
   .split(',')
   .map(input => Number(input))

const phaseArr = permutateWithoutRepetitions([0, 1, 2, 3, 4])
let maxThruster = 0

phaseArr.forEach(phase => {
   let currentOutput = 0

   for (let amp = 0; amp <= 4; amp++) {
      currentOutput = runProgram(program, amp, phase, currentOutput)
   }
   if (currentOutput > maxThruster) {
      maxThruster = currentOutput
   }
})

console.log(maxThruster)
