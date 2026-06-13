import http from 'node:http';
import path from 'node:path';
import { serveStatic } from './utils/serveStatic.js';

const __dirname = import.meta.dirname;
const server = http.createServer(async (req, res) => {
    await serveStatic(req, res, __dirname);
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});