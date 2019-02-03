const fs = require('fs')
const glob = require('glob')
const codebads = require('./codebads')
const country = require('./country')
const langFile = require('./lang.json')

const lang = 'js'

start()

async function start() {
    const countryCode = await getCountry()
    glob(`./test/**/*.${lang}`, function (er, files) {
        files.forEach(file => {
            const code = getFile(file)
            const line = getLine(code)
            const bad = codebads(line, countryCode)
            console.log(bad)
        })
    })
}

function getFile(file) {
    return fs.readFileSync(file, 'utf8')
}

function getLine(code) {
    return code.split('\n')
}

async function getCountry() {
    const ctc = await country()
    return langFile[ctc.countryCode] ? ctc.countryCode : 'EN'
}