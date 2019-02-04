const lang = require('./lang.json')

module.exports = (line, countryCode) => {
    const bads = []
    for (let i = 0; i < line.length; i++) {
        const codeLine = i + 1
        const msg = lang[countryCode][0]
        noVar(line[i]) && bads.push({ line: codeLine, msg: msg.noVar })
        noNewObject(line[i]) && bads.push({ line: codeLine, msg: msg.noNewObject })
        noObjDup(line[i]) && bads.push({ line: codeLine, msg: msg.noObjDup })
        noObjQuote(line[i]) && bads.push({ line: codeLine, msg: msg.noObjQuote })
        noSemi(line[i]) && bads.push({ line: codeLine, msg: msg.noSemi })
        noDoubleQuote(line[i]) && bads.push({ line: codeLine, msg: msg.noDoubleQuote })
        noDoubleEqual(line[i]) && bads.push({ line: codeLine, msg: msg.noDoubleEqual })
    }
    return bads
}

function noVar(val) {
    return /var/.exec(val)
}

function noNewObject(val) {
    return /new Object/.exec(val)
}

function noObjDup(val) {
    const rmSpace = val.replace(/\s/g, '')
    const rex = rmSpace.split(':')
    return rex[0] === rex[1]
}

function noObjQuote(val) {
    const semi = /:/.exec(val)
    const rmSpace = val.replace(/\s/g, '')
    if (semi) {
        const rex = rmSpace.split(':')
        return /"(.*?)"/.exec(rex[0])
    }
}

function noSemi(val) {
    const noFor = /for/.exec(val)
    const semi = /;/.exec(val)
    if (!noFor && semi) {
        return true
    }
}

function noDoubleQuote(val) {
    const double = /"(.*?)"/.exec(val)
    const single = /'(.*?)'/.exec(val)
    return !single && double
}

function noDoubleEqual(val) {
    return /\s==\s/.exec(val)
}