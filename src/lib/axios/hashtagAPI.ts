import { keywordHashURL, hashKey } from "../const";
import axios from "axios";

const HashGenAPI = axios.create({
  baseURL: "https://hashtag5.p.rapidapi.com/api/v2.1",
  headers: {
    "X-RapidAPI-Host": "hashtag5.p.rapidapi.com",
    "X-RapidAPI-Key": hashKey,
  },
});

HashGenAPI.interceptors.request.use((config) => {
  return config;

  // return Promise.reject("adsfjkhadskf");
});

export default HashGenAPI;
