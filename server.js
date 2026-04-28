const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ALLOWED_ACCOUNT_ID = '654654618464';

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    const referer = req.headers.referer || '';
    const origin = req.headers.origin || '';
    const requesterUrl = referer || origin;

    console.log(
        `[${new Date().toISOString()}] ${req.method} ${req.url} ` +
        `referer="${referer}" origin="${origin}"`
    );

    // if (!requesterUrl.includes(ALLOWED_ACCOUNT_ID)) {
    //     res.writeHead(403, { 'Content-Type': 'text/plain' });
    //     res.end('Forbidden');
    //     return;
    // }

    const filePath = path.join(__dirname, 'dmcpop.html');
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error reading index.html');
            return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(data);
    });
});

server.listen(PORT, () => {
    console.log(`serve_os_backend listening on http://localhost:${PORT}`);
    console.log(`Allowing requests whose Referer/Origin contains: "${ALLOWED_ACCOUNT_ID}"`);
});
