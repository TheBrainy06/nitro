import { yellow, red, white } from "colorette"
import fs from "fs"

let functions = {}
let constants = {}

constants.HTML_FILE_HEADER = `
<!-- Auto generated by Nitro compiler -->
<html>
    <head>
        <title>Nitro</title>
        <link rel="stylesheet" href="index.css">
    </head>
</html>
`
constants.CSS_FILE_HEADER = `
/* Auto generated by Nitro compiler */

`

functions.messageLog = function messageLog(messageToLog, logType) {
    let logFunction = (logType == "Error" && red || logType == "Warn" && yellow || white)

    return console.log(logFunction(messageToLog))
}

functions.createBuildFiles = function() {
    if (!fs.existsSync("build")) {
        fs.mkdirSync("build")
    }

    if (fs.existsSync("build/index.html")) {
        fs.unlinkSync("build/index.html")
    }

    if (fs.existsSync("build/index.css")) {
        fs.unlinkSync("build/index.css")
    }

    fs.appendFileSync("build/index.html", constants.HTML_FILE_HEADER)
    fs.appendFileSync("build/index.css", constants.CSS_FILE_HEADER)
}

functions.appendData = function(filePath, dataToAppend) {
    let currentData = fs.readFileSync(filePath).toString('utf-8')
    
    currentData += '\n'
    currentData += dataToAppend

    return fs.writeFileSync(filePath, currentData)
}

export default functions