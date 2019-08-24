const test = require('ava')
const proseToEGS = require('./lib')

test('basic', t => {
  t.is(proseToEGS('this is a sentence. this is another sentence.'), `- this is a sentence.

- this is another sentence.
`)
})

test('periods', t => {
  t.is(proseToEGS('period'), `- period.
`)
})

test('lowercase', t => {
  t.is(proseToEGS('This should become ALL Lowercase.'), `- this should become all lowercase.
`)
})

test('contractions', t => {
	t.is(proseToEGS('this won\'t work.'), '- this \nwill not work.\n')
})
