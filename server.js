import http from 'node:http';
import { serveStatic } from './utils/serveStatic.js';
import { handleGet, handlePost } from './handlers/routeHandler.js';

const PORT = 8000;

const __dirname = import.meta.dirname;

const server = http.createServer(async (req, res) => {
    // In ra log mọi request đến server để hỗ trợ theo dõi
    console.log(`[DEBUG] Incoming request: ${req.method} ${req.url}`);

    // Định tuyến các yêu cầu gọi vào đường dẫn '/api'
    if (req.url === '/api') {
        // Chuyển tiếp cho handleGet xử lý nếu là phương thức GET
        if (req.method === 'GET') {
            return await handleGet(res, __dirname);
        } else if (req.method === 'POST') {
            // Chuyển tiếp cho handlePost xử lý dữ liệu gửi lên
            handlePost(req, res);
        }
    } else if (!req.url.startsWith('/api')) {
        // Trả về file giao diện (HTML/CSS) cho các đường dẫn còn lại
        return await serveStatic(req, res, __dirname);
    }
});

server.listen(PORT, ()=> console.log(`Connected on port: ${PORT}`));