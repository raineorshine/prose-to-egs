const fs = require('fs')
const proseToEGS = require('./lib')

const filename = process.argv[2]
if (!filename) {
  console.error('You must supply the name of an input file.')
  process.exit(1)
}

const text = fs.readFileSync(filename, 'utf-8')
const output = proseToEGS(text)
console.log(output)
