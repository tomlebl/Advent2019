const fs = require('fs')

fs.readFile('./input.txt', (err, data) => {
  console.time('challenge')
  if (err) {
    console.log('error', err)
  } else {
    const array = data.toString().split('')
    const floor = array.reduce((accumulator, step) => {
      if (step === '(') {
        return (accumulator += 1)
      } else if (step === ')') {
        return (accumulator -= 1)
      }
    }, 0)
    console.log('floor', floor)
    console.timeEnd('challenge')
  }
})
