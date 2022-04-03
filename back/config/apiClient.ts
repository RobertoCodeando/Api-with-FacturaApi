import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const baseURL = "https://www.facturapi.io/v2/";
const apiClient = () => {
    const defaultOptions = {
        baseURL,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.TOKEN_FACTURAPI}`,
        },
    };
    return axios.create(defaultOptions);
};

export default apiClient();
