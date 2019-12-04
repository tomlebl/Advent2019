console.time('Run Time')

const passwordArr = []

for (let i = 125730; i <= 579381; i++) {
   passwordArr.push(i.toString())
}

//PART1

const isAscending = passwd =>
   passwd ===
   passwd
      .split('')
      .sort()
      .join('')

const isDouble = passwd => {
   passwdSplit = passwd.split('')
   for (let i = 0; i < passwd.length; i++) {
      if (passwdSplit[i] === passwdSplit[i + 1]) {
         return true
      }
   }
}

filteredPasswdArr1 = passwordArr.filter(passwd => isAscending(passwd) && isDouble(passwd))

console.log(filteredPasswdArr1.length)

//PART 2

// const isNotLarge = passwd => {
//    passwdSplit = passwd.split('')
//    for (let i = 0; i < 4; i++) {
//       if (passwdSplit[i] === passwdSplit[i + 1] && passwdSplit[i] === passwdSplit[i + 2]) {
//          passwdSplit.splice(i, 3)
//          console.log(passwdSplit)
//          if (passwdSplit[1] === passwdSplit[0] && passwdSplit[1] === passwdSplit[2]) {
//             return false
//          } else if (passwdSplit[1] === passwdSplit[0] || passwdSplit[1] === passwdSplit[2]) {
//             return true
//          } else {
//             return false
//          }
//       }
//    }
// }

const isLarge = passwd => {
   passwdSplit = passwd.split('')
   for (let i = 0; i < 5; i++) {
      repLength = passwdSplit.filter(e => e === passwdSplit[i]).length
      console.log(repLength)
      if (repLength > 2) {
         passwdSplit.splice(i, repLength)
         console.log(passwdSplit)
         if (passwdSplit[1] === passwdSplit[0] && passwdSplit[1] === passwdSplit[2]) {
            return true
         } else if (passwdSplit[1] === passwdSplit[0] || passwdSplit[1] === passwdSplit[2]) {
            return false
         } else {
            return true
         }
      }
   }
   return false
}

// const filteredPasswdArr2 = filteredPasswdArr1.filter(passwd => !isLarge(passwd))

//console.log(filteredPasswdArr2.length)

console.log(isLarge('577777'))
//console.log(filteredPasswdArr1.includes('166777'))
//filteredPasswdArr2.map(passwd => console.log(passwd))

//console.timeEnd('Run Time')
