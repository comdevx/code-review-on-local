module.exports = (line) => {
    const bads = []
    for (let i = 0; i < line.length; i++) {
        getVar(line[i]) && bads.push({ line: i + 1, msg: 'Use const for all of your references; avoid using var.' })
        getNewObject(line[i]) && bads.push({ line: i + 1, msg: 'Use the literal syntax for object creation.' })
        getObjDup(line[i]) && bads.push({ line: i + 1, msg: 'Use property value shorthand.' })
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