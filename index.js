const fs = require('fs')
const fsPromises = require('fs/promises')
const ACCESS_LOG = './string.log'

const readStream = fs.createReadStream(
    ACCESS_LOG, 
    {
        flags: 'r',
        encoding: 'utf-8',
        // autoClose: true,
        // start,
        // end,
        highWaterMark: 64,
    }
)

readStream.on('data', chunk => {
    console.log('chunk - ', chunk);
})

const writeStream = fs.createWriteStream(
    ACCESS_LOG, 
    {
        encoding: 'utf-8',
        flags: 'a'
    }
)


