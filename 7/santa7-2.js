const fs = require('fs')
const { permutateWithoutRepetitions } = require('./permuations')
//const { runProgram2 } = require('./runProgram2')

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

class Amplifier {
   constructor(program, phase, input, loop) {
      this.program = [...program]
      this.phase = phase
      this.input = input
      this.loop = loop
   }

   runProgram() {
      let stepSize = 1
      let inputCount = 0
      let output = undefined

      for (let i = 0; i < this.program.length; i = i + stepSize) {
         const instArr = this.program[i].toString().split('')
         const instLength = instArr.length
         const opCode = instArr[instLength - 1]
         //console.log(opCode)

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

         const par1Value = c === '0' ? this.program[this.program[i + 1]] : this.program[i + 1]
         const par2Value = b === '0' ? this.program[this.program[i + 2]] : this.program[i + 2]
         const par3Value = a === '0' ? this.program[i + 3] : i + 3

         let exit = false

         switch (opCode) {
            case '1':
               this.program[this.program[i + 3]] = par1Value + par2Value
               stepSize = 4
               break
            case '2':
               this.program[this.program[i + 3]] = par1Value * par2Value
               stepSize = 4
               break
            case '3':
               if (this.loop === 0) {
                  this.program[this.program[i + 1]] = inputCount === 0 ? this.phase : this.input
                  inputCount++
               } else {
                  this.program[this.program[i + 1]] = this.input
               }

               stepSize = 2

               break
            case '4':
               output = par1Value
               stepSize = 2
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
                  this.program[par3Value] = 1
               } else {
                  this.program[par3Value] = 0
               }
               stepSize = 4
               break
            case '8':
               if (this.program[par1Value] === this.program[par2Value]) {
                  this.program[par3Value] = 1
               } else {
                  this.program[par3Value] = 0
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
}

const ampA = new Amplifier(test, 0, 4321, 0)

console.log(ampA.runProgram())
