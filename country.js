const fetch = require('node-fetch')

module.exports = async () => {
    const getUrl = await fetch('http://ip-api.com/json')
    return getUrl.json()
}