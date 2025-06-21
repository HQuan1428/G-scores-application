import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log('API Error: ', error.response);

        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // Xử lý lỗi xác thực: có thể chuyển hướng về trang login
                    console.error('Unauthorized: Please log in again.');
                    // window.location.href = '/login'; // Example: redirect to login
                    break;
                case 403:
                    // Xử lý lỗi không có quyền truy cập
                    console.error('Forbidden: You do not have permission to access this resource.');
                    break;
                case 404:
                    // Xử lý lỗi không tìm thấy tài nguyên
                    console.error('Not Found: The requested resource could not be found.');
                    break;
                case 500:
                    // Xử lý lỗi server
                    console.error('Internal Server Error: Something went wrong on the server.');
                    break;
                default:
                    console.error(`Unhandled error: ${error.response.status}`);
            }
        } else if (error.request) {
            console.error('No response Error:', error.request);
        } else {
            console.error('Error setting up request:', error.message);
        }
        return Promise.reject(error);
    }
);

export default api;