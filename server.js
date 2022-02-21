const http = require('http')
const fs = require('fs');
const url = require('url');
const path = require('path');


http.createServer((req, res) => {
    const requestUrl = url.parse(req.url);
    let fsPath;
    if (requestUrl.pathname === '/') {
        fsPath = path.resolve(__dirname + '/index.html');
    } else {
        fsPath = path.resolve(__dirname + '/' + requestUrl.pathname);
    }
    fs.stat(fsPath, (err, stat) => {
        if (err) {
            console.log('error occurred...' + err);
            return res.end();
        }
        if (stat.isFile()) {
            res.writeHead(200);
            fs.createReadStream(fsPath).pipe(res);
        } else {
            res.writeHead(500);
            return res.end();

        }
    })


}).listen(3000, () => console.log('Сервер работает'))