import axios from "axios";

export const db = axios.create({
  baseURL: "https://crud-firestore-red.vercel.app/api",
  headers: {
    api_key: process.env.DB_API_KEY,
  },
});
