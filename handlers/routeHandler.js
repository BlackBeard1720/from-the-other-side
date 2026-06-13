import { getData } from "../utils/getData.js";
import { sendResponse } from "../utils/sendResponse.js";
import { parseJSONBody } from "../utils/parseJSONBody.js";

export const handleGet = async (res, baseDir) => {
    // Gọi hàm getData() (Thủ kho) để đi lấy nội dung file JSON
    const data = await getData(baseDir);
    // Chuyển đổi dữ liệu từ dạng Object/Array của JS sang chuỗi văn bản JSON
    const content = JSON.stringify(data);
    // Đóng gói và gửi trả lại cho người dùng với mã thành công 200
    sendResponse(res, 200, 'application/json', content);
};

export const handlePost = async (req, res) => {
    const rawBody = await parseJSONBody(req);
    console.log(rawBody)
}