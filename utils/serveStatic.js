import path from 'node:path';
import fs from 'node:fs/promises';
import { sendResponse } from './sendResponse.js';
import { getContentType } from './getContentType.js';

export const serveStatic = async (req, res, baseDir) => {
    // Gom các yêu cầu về chung thư mục 'public'
    const publicDir = path.join(baseDir, 'public');
    // Nếu khách chỉ gõ '/', mặc định trả về file 'index.html'. Nếu không thì tìm đúng file họ cần
    const filePath = path.join(
        publicDir,
        req.url === '/' ? 'index.html' : req.url
    );

    // Nhận diện đuôi file (vd: .css, .html) để báo cho trình duyệt biết đang trả về loại file gì
    const ext = path.extname(filePath);
    const contentType = getContentType(ext);

    try {
        // Tìm thấy file thì đọc và gửi đi luôn (mã 200)
        const content = await fs.readFile(filePath, 'utf-8');
        sendResponse(res, 200, contentType, content);
    } catch(err) {
        // Lỗi 'ENOENT' có nghĩa là: Không tìm thấy file (vd người dùng gõ sai đường dẫn) -> trả về trang 404
        if (err.code === 'ENOENT') {
            const content = await fs.readFile(path.join(publicDir, '404.html'), 'utf-8');
            sendResponse(res, 404, 'text/html', content);
        } else {
            // Các lỗi kĩ thuật khác thì báo hỏng server (mã 500)
            sendResponse(res, 500, 'text/html', `<html><h1>Server Error: ${err.code}</h1></html>`);
        }
    }
}