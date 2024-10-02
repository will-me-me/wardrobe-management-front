// const _axios = require("axios");
import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    // Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
});

export default instance;
