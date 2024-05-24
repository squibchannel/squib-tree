import { env } from "@/lib/env";
import axios from "axios";

const hashtagAPI = axios.create({
  baseURL: "https://hashtag5.p.rapidapi.com/api/v2.1",
  headers: {
    "X-RapidAPI-Host": "hashtag5.p.rapidapi.com",
    "X-RapidAPI-Key": env.HASHGEN_KEY,
  },
});

export default hashtagAPI;
