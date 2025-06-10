// 封装成promise
const fs = require('fs')

fs.readFile('./a.txt', 'utf-8', function (err, data) {
    if (err) {
        throw err;
    }
    console.log(data);
})

const myReadFile = (path) => {
    return new Promise((res, rej) => {
        fs.readFile(path, 'utf-8', function (err, data) {
            if (err) {
                rej(err)
            }
            res(data)
        })
    })
}
