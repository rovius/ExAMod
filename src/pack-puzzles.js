const fs = require('fs')
const path = require('path')

const testsPath = path.join(__dirname, '..', 'tests')
const puzzlesPath = path.join(__dirname, '..', 'puzzles')

// Create the puzzles folder if it doesn't exist
if (!fs.existsSync(puzzlesPath)) {
    fs.mkdirSync(puzzlesPath)
    console.log(`Folder created: ${puzzlesPath}`)
}

const jsonFiles = fs
    .readdirSync(testsPath)
    .filter((file) => file.endsWith('.json'))

if (jsonFiles.length == 0) {
    console.error(
        `No JSON files found in tests folder. Make sure to run "npm run pack:tests" first.`
    )
    process.exit(1)
}

jsonFiles.forEach((jsonFile) => {
    const jsonFilePath = path.join(testsPath, jsonFile)

    const outputFileName = `${path.parse(jsonFile).name}.json`
    const outputPath = path.join(puzzlesPath, outputFileName)
    fs.copyFileSync(jsonFilePath, outputPath)

    console.log(`Puzzle packed: ${outputPath}`)
})

console.log(
    `\nPacked ${jsonFiles.length} files as puzzles. Now you are ready to commit them.`
)
