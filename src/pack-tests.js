const fs = require('fs')
const path = require('path')

const jsPath = path.join(__dirname, 'js')
const jsonPath = path.join(__dirname, 'json')
const testsPath = path.join(__dirname, '..', 'tests')

// Create the tests folder if it doesn't exist
if (!fs.existsSync(testsPath)) {
    fs.mkdirSync(testsPath)
    console.log(`Folder created: ${testsPath}`)
}

const jsFiles = fs.readdirSync(jsPath).filter((file) => file.endsWith('.js'))

jsFiles.forEach((jsFile) => {
    const jsFilePath = path.join(jsPath, jsFile)
    const jsonTemplateFile = path.join(
        jsonPath,
        `${jsFile.replace('.js', '.json')}`
    )

    // Check if the corresponding JSON template file exists
    if (fs.existsSync(jsonTemplateFile)) {
        const code = fs.readFileSync(jsFilePath, 'utf-8')
        const formattedCode = code
            .replace('"', '\\"')
            .replace(/\n/g, '\n')
            .replace(/\r/g, '\r')

        const template = JSON.parse(fs.readFileSync(jsonTemplateFile, 'utf-8'))
        template.components[0].action.execute_code.code = formattedCode

        // Create a unique name for the output JSON file
        const outputFileName = `${path.parse(jsonTemplateFile).name}.json`
        const outputPath = path.join(testsPath, outputFileName)
        fs.writeFileSync(outputPath, JSON.stringify(template))

        console.log(`File created: ${outputPath}`)
    } else {
        console.log(`No corresponding JSON template found for ${jsFile}`)
    }
})

console.log(
    `\nPacked ${jsFiles.length} files. Now import them to the dashboard.`
)
