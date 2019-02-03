const lang = require('./lang.json')

module.exports = (line, countryCode) => {
    const bads = []
    for (let i = 0; i < line.length; i++) {
        getVar(line[i]) && bads.push({ line: i + 1, msg: lang[countryCode][0].getVar })
        getNewObject(line[i]) && bads.push({ line: i + 1, msg: lang[countryCode][0].getNewObject })
        getObjDup(line[i]) && bads.push({ line: i + 1, msg: lang[countryCode][0].getObjDup })
        getObjQuote(line[i]) && bads.push({ line: i + 1, msg: lang[countryCode][0].getObjQuote })
    }
    return bads
}

function getVar(val) {
    const rex = new RegExp('var', "g")
    return val.search(rex) === 0
}

function getNewObject(val) {
    const rex = new RegExp('new Object', "g")
    return val.search(rex) === 0
}

function getObjDup(val) {
    const rmSpace = val.replace(/\s/g, '')
    const rex = rmSpace.split(':')
    return rex[0] === rex[1]
}

function getObjQuote(val) {
    const rmSpace = val.replace(/\s/g, '')
    const rex = rmSpace.split(':')
    return rex[0][0] === '"' || rex[0][0] === "'"
}