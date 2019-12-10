const runProgram = (array, amp, phase, input) => {
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
            array[array[i + 1]] = inputCount === 0 ? phase[amp] : input
            stepSize = 2
            inputCount++
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
         //  console.log('program', array)
         return output
      }
   }
}

module.exports = { runProgram }
