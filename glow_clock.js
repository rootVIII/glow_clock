const fs = require('fs');
const http = require('http');
const path = require('path');

const host = 'localhost';
const port = 8192;
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
};

const page404 = `<!DOCTYPE html><html lang="en" dir="ltr">
    <head>
        <title>Not Found</title>
        <meta charset="UTF-8">
    </head>
    <body>
        Not Found
    </body>
</html>`;

const server = http.createServer((request, response) => {
    let filePath;
    if (request.url === '/') {
        filePath = path.join(__dirname, 'templates', 'index.html');
    } else {
        filePath = path.join(__dirname, request.url);
    }

    const contentType = mimeTypes[String(path.extname(filePath)).toLowerCase()] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            response.setHeader('Content-Type', 'text/html');
            response.end(page404);
        } else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });
});

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
