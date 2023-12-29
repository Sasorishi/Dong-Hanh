import axios from "axios";

const instance = axios.create({
  baseURL: "https://127.0.0.1:8000/",
  timeout: 10000, // Adjust the timeout as needed
});

export default instance;
