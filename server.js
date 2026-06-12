import http from 'node:http';

const __dirname = import.meta.dirname;
const server = http.createServer((req, res) => {
   res.statusCode = 200;
   res.setHeader('Content-Type', 'text/html');
   res.end();
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});