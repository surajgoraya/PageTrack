const pjson = require('../package.json');

const config = {
    name: pjson.name,
    version: pjson.version,
    port: 9000,
    job: 'scan-webpages'
}

module.exports = {
    config
}