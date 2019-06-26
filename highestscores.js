const fs = require('fs')

// Log the exit code before anything else in case of processing errors
process.on('exit', (code) => {
  console.log(`Exited with exit code ${code}`)
})

// Use simple version of yargs to get user input for num value
const argv = require('yargs').argv
const num = argv.num

const readJSON = (fileName) => {
  // If file does not exist, file not found
  try {
    return fs.readFileSync(fileName)
  }
  catch (error) {
    process.exit(1)
  }
}

const parseJSON = (data) => {
  // If unable to process file, input formatting errors
  try {
    // parse.data is the array that holds our scores
    const parse = JSON.parse(data)
    return parse.data
  }
  catch (error) {
    process.exit(2)
  }
}

((fileName) => {
  const json = readJSON(fileName)
  const data = parseJSON(json)

  try {
    // Sort array into ideal output in descending order
    const sortScore = data
      .map(element => {
        const score = Object.keys(element)[0]
        // If key id does not exist in object, terminate the process
        if (!('id' in element[score])) { process.exit(2) }
        return {
          score: Number(score),
          id: element[score].id
        }
      })
      .sort((firstEl, secondEl) => secondEl.score - firstEl.score)
      .slice(0, num)

    const scoreJSON = JSON.stringify(sortScore)
    const parsedJSON = JSON.parse(scoreJSON)

    console.log(parsedJSON)
  }
  catch (error) {
    console.log(error)
  }
})('./data.json')

module.exports = { readJSON, parseJSON }