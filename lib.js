const nlp = require('compromise')

/** Determines if a line break should be added at the given word.
 * @param word The text analysis of the word from compromise. e.g.
  { spaceBefore: ' ',
    text: 'become',
    spaceAfter: '',
    normal: 'become',
    implicit: '',
    bestTag: 'Participle',
    tags: [ 'Participle', 'Verb', 'VerbPhrase' ] }
 */
const breakLine = word =>
  word.bestTag === 'Preposition' || word.bestTag === 'Verb'

/** Converts a block of prose to EGS. */
const proseToEGS = text => {
  const lines = text.split(/[.\n]+/).filter(x => x)

  const block = line => {
    return '- ' + nlp(line).normalize({ contractions: true }).clauses().terms().data().reduce((accum, current, i, arr) => {
      const endOfSentence = i === arr.length - 1
      return accum + (breakLine(current) ? '\n' : '')
        + current.text.toLowerCase().trim()
        + (endOfSentence ? '.' : ' ')
    }, '')
  }

  return lines.map(line => block(line) + '\n').join('\n')
}

module.exports = proseToEGS