const fs = require('fs')

const array = fs.readFileSync('input.txt', { encoding: 'utf-8' }).split('\n')

const centerArr = []
const sateliteArr = []

const test = ['COM)B', 'B)C', 'C)D', 'D)E', 'E)F', 'B)G', 'G)H', 'D)I', 'E)J', 'J)K', 'K)L', , 'K)YOU', 'I)SAN']

array.map((e, i) => {
	centerArr.push(e.split(')')[0])
	sateliteArr.push(e.split(')')[1])
})

//PART1

const traceOrbits = (centers, satelites) => {
	const orbitalMap = new Map()
	orbitalMap.set('COM', 0)
	let i = 0
	for (let [key, value] of orbitalMap) {
		i = value + 1
		centers.map((center, index) => {
			if (center === key) {
				orbitalMap.set(satelites[index], i)
			}
		})
	}
	return orbitalMap
}

const sumTransfers = orbMap => Array.from(orbMap.values()).reduce((accu, value) => accu + value)

const answer1 = sumTransfers(traceOrbits(centerArr, sateliteArr))

console.log(answer1)

//PART 2

const traceBackCOM = (centers, satelites, start) => {
	const trace = new Map()
	trace.set(start, 0)
	let i = 0
	for (let [key] of trace) {
		i++
		satelites.map((satelite, index) => {
			if (satelite === key) {
				trace.set(centers[index], i)
			}
		})
	}
	return trace
}

const trace1 = Array.from(traceBackCOM(centerArr, sateliteArr, 'YOU').keys())
const trace2 = Array.from(traceBackCOM(centerArr, sateliteArr, 'SAN').keys())

const findPath = (trace1, trace2) => {
	for (let i = 0; i < trace1.length; i++) {
		if (trace2.includes(trace1[i])) {
			return trace2.indexOf(trace1[i]) + i - 2
		}
	}
}

console.log(findPath(trace1, trace2))
