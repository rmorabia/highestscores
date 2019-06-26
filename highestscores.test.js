const { readJSON, parseJSON } = require('./highestscores')

test('Reading JSON shows buffer', () => {
  expect(readJSON('./data.json')).toBeInstanceOf(Buffer)
})

test('Parsing JSON shows object', () => {
  expect(parseJSON(readJSON('./data.json'))).toBeInstanceOf(Object)
})