const fs = require('fs')

const program = fs
   .readFileSync('input.txt', { encoding: 'utf-8' })
   .split(',')
   .map(input => Number(input))

const test = [3, 0, 4, 0, 99]

const runProgram = (array, input) => {
   const output = []
   let stepSize = 1
   for (let i = 0; i < array.length; i = i + stepSize) {
      console.log(array[i], array[i].toString().length)
      if (array[i] === 3) {
         array[array[i + 1]] = input
         stepSize = 2
      } else if (array[i] === 4) {
         output.push(array[array[i + 1]])
         stepSize = 2
      } else if (array[i] === 1) {
         array[array[i + 3]] = array[array[i + 1]] + array[array[i + 2]]
         stepSize = 4
      } else if (array[i] === 2) {
         array[array[i + 3]] = array[array[i + 1]] * array[array[i + 2]]
         stepSize = 4
      } else if (array[i] === 99) {
         return output
      } else {
         stepSize = array[i].toString().length
         let a = '0'
         let b = '0'
         let c = '0'
         const opCode = array[i].toString().slice(stepSize - 1)
         if (stepSize === 3) {
            c = array[i].toString().slice(0, 1)
         }
         if (stepSize === 4) {
            b = array[i].toString().slice(0, 1)
            c = array[i].toString().slice(1, 2)
         }
         if (stepSize === 5) {
            a = array[i].toString().slice(0, 1)
            b = array[i].toString().slice(1, 2)
            c = array[i].toString().slice(2, 3)
         }
         console.log('code', a, b, c, opCode)
      }
   }
}

console.log(runProgram(program, 1))
