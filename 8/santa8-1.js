const fs = require('fs')

const inputStr = fs.readFileSync('input.txt', { encoding: 'utf-8' })

const layersArr = []

for (let i = 0; i < inputStr.length; i += 25 * 6) {
   layersArr.push(
      inputStr
         .slice(i, i + 25 * 6)
         .split('')
         .map(input => Number(input))
   )
}

const calcDigits = (layer, digit) => layer.filter(e => e === digit).length

let numberOf0 = 25 * 6
let layerIndex = 0

layersArr.forEach((layer, index) => {
   const currentNumberOf0 = calcDigits(layer, 0)
   if (currentNumberOf0 < numberOf0) {
      numberOf0 = currentNumberOf0
      layerIndex = index
   }
})

const answer = calcDigits(layersArr[layerIndex], 1) * calcDigits(layersArr[layerIndex], 2)

console.log(answer)
