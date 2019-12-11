const fs = require('fs')
const { permutateWithoutRepetitions } = require('./permuations')
const { runProgram2 } = require('./runProgram2')

const test = [3, 15, 3, 16, 1002, 16, 10, 16, 1, 16, 15, 15, 4, 15, 99, 0, 0]
const test2 = [
   3,
   26,
   1001,
   26,
   -4,
   26,
   3,
   27,
   1002,
   27,
   2,
   27,
   1,
   27,
   26,
   27,
   4,
   27,
   1001,
   28,
   -1,
   28,
   1005,
   28,
   6,
   99,
   0,
   0,
   5
]

let currentOutput = 0
const programArr = []
for (let amp = 0; amp <= 4; amp++) {
   programArr[amp] = [...test2]
}

for (let amp = 0; amp <= 4; amp++) {
   currentOutput = runProgram2(programArr[amp], amp, [9, 8, 7, 6, 5], currentOutput)
   console.log(currentOutput)
}
console.log(programArr)
