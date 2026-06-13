import { getData } from "../utils/getData.js";
import { sendResponse } from "../utils/sendResponse.js";
import { parseJSONBody } from "../utils/parseJSONBody.js";
import { addNewSighting } from "../utils/addNewSighting.js";

export const handleGet = async (res, baseDir) => {
    // Gọi hàm getData() (Thủ kho) để đi lấy nội dung file JSON
    const data = await getData(baseDir);
    // Chuyển đổi dữ liệu từ dạng Object/Array của JS sang chuỗi văn bản JSON
    const content = JSON.stringify(data);
    // Đóng gói và gửi trả lại cho người dùng với mã thành công 200
    sendResponse(res, 200, 'application/json', content);
};

export const handlePost = async (req, res, baseDir) => {
    try {
        // Đọc dữ liệu gửi lên -> Lưu vào file -> Báo thành công 201
        const parsedBody = await parseJSONBody(req);
        await addNewSighting(parsedBody, baseDir);
        sendResponse(res, 201, 'application/json', JSON.stringify(parsedBody));
    } catch (err) {
        sendResponse(res, 400, 'application/json', JSON.stringify({ error: err.message }));
    }
}