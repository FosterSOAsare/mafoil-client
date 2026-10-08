import axios from "axios";
import { API_URL } from "./baseQuery";

const axiosInstance = axios.create({ baseURL: `${API_URL}/api` });
export default axiosInstance;
