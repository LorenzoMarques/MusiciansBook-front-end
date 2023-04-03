import axios from "axios";

const apiJamendo = axios.create({
  baseURL: "https://api.jamendo.com",
});

export default apiJamendo;
