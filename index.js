const fs = require('fs')
const { Transform } = require('stream')
const ACCESS_LOG = './access.log'
const WRITE_LOG = './write.log'

// const readStream = fs.createReadStream(
//     ACCESS_LOG, 
//     {
//         flags: 'r',
//         encoding: 'utf-8',
//         autoClose: true,
//         // start: 0,
//         // end: 6,
//         highWaterMark: 110,
//     }
// )



// readStream.on('data', chunk => {
//     console.log('*** - ', chunk);
// })

// const writeStream = fs.createWriteStream(
//     ACCESS_LOG, 
//     {
//         encoding: 'utf-8',
//         flags: 'a'
//     }
// )

const readStream = fs.createReadStream(
    ACCESS_LOG, 
    {
        flags: 'r',
        encoding: 'utf-8',
        autoClose: true,
        // start: 0,
        // end: 6,
        highWaterMark: 10,
    }
)


const writeStream = fs.createWriteStream(
    WRITE_LOG, 
    {
        encoding: 'utf-8',
        flags: 'a'
    }
)

const tStream = new Transform({
    transform(chunk, encoding, callback) {
        const transformed = "---- *** " + chunk.toString()
        this.push(transformed)
        if(transformed.includes('127.0.0.1')) {
            writeStream.write(transformed);
        }
        
        callback()
    }
})

readStream.pipe(tStream).pipe(process.stdout);