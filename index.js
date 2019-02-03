const fs = require('fs')
const glob = require('glob')
const codebads = require('./codebads')

const lang = 'js'

start()

function start() {
    glob(`./test/**/*.${lang}`, function (er, files) {
        files.forEach(file => {
            const code = getFile(file)
            const line = getLine(code)
            const bad = codebads(line)
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