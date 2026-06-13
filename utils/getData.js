import path from 'node:path';
import fs from 'node:fs/promises';

export const getData = async (baseDir) => {
    try {
        // Nối đường dẫn từ thư mục gốc (baseDir) vào đến tận file data.json
        const pathJson = path.join(baseDir, 'data', 'data.json');
        // Đọc nội dung file dưới dạng chữ (utf-8)
        const data = await fs.readFile(pathJson, 'utf-8');
        // Dịch chuỗi chữ đó thành một mảng (Array) có thể xài được trong Javascript
        const parsedData = JSON.parse(data);
        return parsedData;
    } catch(err) {
        // Nếu file bị lỗi không tồn tại hoặc sai đường dẫn, báo lỗi và trả về thùng rỗng []
        console.log(err);
        return [];
    }
}