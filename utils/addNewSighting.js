import path from 'node:path';
import fs from 'node:fs/promises';
import { getData } from './getData.js';
import crypto from 'node:crypto'; // Thư viện có sẵn của Node.js để tạo UUID

export const addNewSighting = async (newSighting, baseDir) => {
    try {
        // Lấy danh sách bài viết cũ
        const sightings = await getData(baseDir);
        
        // Tạo ID ngẫu nhiên và gắn vào bài viết mới trước khi gộp
        const sightingWithId = { uuid: crypto.randomUUID(), ...newSighting };
        sightings.push(sightingWithId);
        
        // Ghi đè mảng mới vào file data.json (format đẹp với 2 dấu cách)
        const pathJSON = path.join(baseDir, 'data', 'data.json');
        await fs.writeFile(pathJSON, JSON.stringify(sightings, null, 2), 'utf-8');
    } catch (err) {
        throw new Error(err);
    }
};