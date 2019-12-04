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
	const passwdSplit = passwd.split('')
	for (let i = 0; i < passwd.length; i++) {
		if (passwdSplit[i] === passwdSplit[i + 1]) {
			return true
		}
	}
}

filteredPasswdArr1 = passwordArr.filter(passwd => isAscending(passwd) && isDouble(passwd))

console.log(filteredPasswdArr1.length)

//PART 2

const isLarge = passwd => {
	const passwdSplit = passwd.split('')

	for (let i = 0; i < 5; i++) {
		const repLength = passwdSplit.filter(e => e === passwdSplit[i]).length
		const passwdRem = [...passwdSplit]
		passwdRem.splice(i, repLength)
		//console.log('Rep', repLength, passwdRem)
		if (repLength > 4) {
			return true
		}
		if (repLength === 4) {
			if (passwdRem[1] === passwdRem[0]) {
				return false
			} else {
				return true
			}
		}
		if (repLength === 3) {
			if (passwdRem[1] === passwdRem[0] && passwdRem[1] === passwdRem[2]) {
				return true
			} else if (passwdRem[1] === passwdRem[0] || passwdRem[1] === passwdRem[2]) {
				return false
			} else {
				return true
			}
		}
	}
	return false
}

const filteredPasswdArr2 = filteredPasswdArr1.filter(passwd => !isLarge(passwd))

console.log(filteredPasswdArr2.length)

console.timeEnd('Run Time')
