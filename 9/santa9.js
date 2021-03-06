const fs = require('fs')

const program = fs
   .readFileSync('input.txt', { encoding: 'utf-8' })
   .split(',')
   .map(input => Number(input))

const test = [104, 1125899906842624, 99]

class Computer {
   constructor(program) {
      this.program = [...program]
      this.output = []
      this.relativeBase = 0
      this.memory = new Map()
   }

   runProgram(input) {
      let stepSize = 1

      this.program.forEach((element, index) => {
         this.memory.set(index, element)
      })

      for (let i = 0; i < this.program.length; i = i + stepSize) {
         const instStr = this.memory.get(i).toString()
         const instLength = instStr.length
         let opCode
         if (instLength <= 2) {
            opCode = Number(instStr)
         } else {
            opCode = Number(instStr.slice(instStr.length - 2))
         }

         let a = '0'
         let b = '0'
         let c = '0'

         if (instLength === 3) {
            c = instStr[0]
         } else if (instLength === 4) {
            b = instStr[0]
            c = instStr[1]
         } else if (instLength === 5) {
            a = instStr[0]
            b = instStr[1]
            c = instStr[2]
         }

         const address1 =
            c === '0'
               ? this.memory.get(i + 1)
               : c === '1'
               ? i + 1
               : this.memory.get(i + 1) + this.relativeBase

         const address2 =
            b === '0'
               ? this.memory.get(i + 2)
               : b === '1'
               ? i + 2
               : this.memory.get(i + 2) + this.relativeBase

         const address3 =
            a === '0'
               ? this.memory.get(i + 3)
               : a === 1
               ? i + 3
               : this.memory.get(i + 3) + this.relativeBase

         const par1Value = this.memory.get(address1) ? this.memory.get(address1) : 0
         const par2Value = this.memory.get(address2) ? this.memory.get(address2) : 0

         switch (opCode) {
            case 1:
               this.memory.set(address3, par1Value + par2Value)
               stepSize = 4
               break
            case 2:
               this.memory.set(address3, par1Value * par2Value)
               stepSize = 4
               break
            case 3:
               this.memory.set(address1, input)
               stepSize = 2
               break
            case 4:
               this.output.push(par1Value)
               stepSize = 2
               break
            case 5:
               if (par1Value != 0) {
                  stepSize = par2Value - i
               } else {
                  stepSize = 3
               }
               break
            case 6:
               if (par1Value === 0) {
                  stepSize = par2Value - i
               } else {
                  stepSize = 3
               }
               break
            case 7:
               if (par1Value < par2Value) {
                  this.memory.set(address3, 1)
               } else {
                  this.memory.set(address3, 0)
               }
               stepSize = 4
               break
            case 8:
               if (par1Value === par2Value) {
                  this.memory.set(address3, 1)
               } else {
                  this.memory.set(address3, 0)
               }
               stepSize = 4
               break
            case 9:
               this.relativeBase += par1Value
               stepSize = 2

               break
            case 99:
               return this.output
            default:
               console.log('False instruction')
         }
      }
   }
}

const comp1 = new Computer(program)
console.log(comp1.runProgram(1))

const comp2 = new Computer(program)
console.log(comp2.runProgram(2))
