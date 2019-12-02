const fs = require('fs')

const inputArray1 = fs
   .readFileSync('input.txt', { encoding: 'utf-8' })
   .split(',')
   .map(input => Number(input))

let inputArray2 = [...inputArray1]

//PART 1

const runProgram = input => {
   for (let i = 0; i < input.length; i += 4) {
      if (input[i] === 1) {
         input[input[i + 3]] = input[input[i + 1]] + input[input[i + 2]]
      } else if (input[i] === 2) {
         input[input[i + 3]] = input[input[i + 1]] * input[input[i + 2]]
      } else if (input[i] === 99) {
         return input[0]
      }
   }
}

inputArray1[1] = 12
inputArray1[2] = 2

console.log(runProgram(inputArray1))

//PART 2

const findInputs = (inputArr, output) => {
   for (let noun = 0; noun <= 99; noun++) {
      for (let verb = 0; verb <= 99; verb++) {
         let newInputArr = [...inputArr]
         newInputArr[1] = noun
         newInputArr[2] = verb
         if (runProgram(newInputArr) === output) {
            return 100 * noun + verb
         }
      }
   }
}

console.log(findInputs(inputArray2, 19690720))
