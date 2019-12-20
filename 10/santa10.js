const fs = require('fs')

const spaceMatrix = fs.readFileSync('input.txt', { encoding: 'utf-8' }).split('\n')

const asteroidArr = []

spaceMatrix.forEach((row, index) => {
   for (let i = 0; i < row.length; i++) {
      if (row[i] === '#') {
         asteroidArr.push({ x: i, y: index })
      }
   }
})

const findBase = asteroidArr => {
   let base = {
      x: 0,
      y: 0,
      canDetect: 0
   }
   asteroidArr.forEach((asteroid, index) => {
      let slopeSet1 = new Set()
      let slopeSet2 = new Set()

      for (let i = 0; i < asteroidArr.length; i++) {
         const slope = (asteroidArr[i].x - asteroid.x) / (asteroidArr[i].y - asteroid.y)

         if (i < index) {
            slopeSet1.add(slope)
         } else if (i > index) {
            slopeSet2.add(slope)
         }
      }
      let asteroidsDetected = slopeSet1.size + slopeSet2.size
      if (asteroidsDetected > base.canDetect) {
         Object.assign(base, asteroid)
         base.canDetect = asteroidsDetected
      }
   })
   return base
}

console.log(findBase(asteroidArr))
