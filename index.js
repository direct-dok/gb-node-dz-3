const fs = require('fs')
const readline = require('readline');

const ACCESS_LOG = './access.log'
const WRITE_IP_34 = './34-48-240-111-requests.log'
const WRITE_IP_89 = './89-123-1-41-requests.log'


const readFile = readline.createInterface({
    input: fs.createReadStream(ACCESS_LOG),
    output: process.stdout,
    console: false
})

const writeIp34 = fs.createWriteStream(
    WRITE_IP_34, 
    {
        encoding: 'utf-8',
        flags: 'a'
    }
)

const writeIp89 = fs.createWriteStream(
    WRITE_IP_89, 
    {
        encoding: 'utf-8',
        flags: 'a'
    }
)

readFile.on('line', function(line) {
    if(/34\.48\.240\.111/.test(line)) writeIp34.write(`${line}\n`);
    if(/89\.123\.1\.41/.test(line)) writeIp89.write(`${line}\n`);
})