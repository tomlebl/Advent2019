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

      if (opCode === '3') {
         array[array[i + 1]] = input
         stepSize = 2
      } else if (opCode === '4') {
         output.push([array[array[i + 1]], i])
         stepSize = 2
      } else if (opCode === '9' || instArr[instLength - 2] === '9') {
         return output
      } else {
         if (opCode === '1') {
            array[array[i + 3]] = par1Value + par2Value
         } else if (opCode === '2') {
            array[array[i + 3]] = par1Value * par2Value
         }

         stepSize = 4
      }
   }
}

console.log(runProgram(program, 1))

// } else if (instArr[instArr.length - 1] === '1') {
//     array[array[i + 3]] = array[array[i + 1]] + array[array[i + 2]]
//     stepSize = 4
//  } else if (instArr[instArr.length - 1] === '2') {
//     array[array[i + 3]] = array[array[i + 1]] * array[array[i + 2]]
//     stepSize = 4
