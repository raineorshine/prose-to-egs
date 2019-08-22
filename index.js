const fs = require('fs')
const nlp = require('compromise')

const filename = process.argv[2]
if (!filename) {
  console.error('You must supply the name of an input file.')
  process.exit(1)
}

const text = fs.readFileSync(filename, 'utf-8')
const lines = text.split(/[.\n]+/).filter(x => x)

const block = line => {
  return '- ' + nlp(line).clauses().terms().data().reduce((accum, current, i, arr) => {
    const breakLine = current.bestTag === 'Preposition' || current.bestTag === 'Verb'
    const endOfSentence = i === arr.length - 1
    return accum + (breakLine ? '\n' : '')
      + current.text.toLowerCase().trim()
      + (endOfSentence ? '.' : ' ')
  }, '')
}

const output = lines.map(line => block(line) + '\n').join('\n')
console.log(output)
