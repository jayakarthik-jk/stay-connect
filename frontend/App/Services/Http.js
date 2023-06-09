import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const BACKEND_URL = "https://stay-connect-backend.onrender.com";

const instance = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("token");
    if (token) config.headers["X-Auth-Token"] = token;
    return config;
  },
  (error) => Promise.reject(error)
);

const get = async (url) => {
  try {
    const response = await instance.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
    if (
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500
    )
      return new Error(error.response.data.error);
    return new Error("Something went wrong !");
  }
};

const post = async (url, body) => {
  try {
    const response = await instance.post(url, body);
    return response.data;
  } catch (error) {
    console.log(error);
    if (
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500
    )
      return new Error(error.response.data.error);
    return new Error("Something went wrong !");
  }
};

const formData = async (url, body) => {
  try {
    const response = await instance.post(url, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    if (
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500
    )
      return new Error(error.response.data.error);
    return new Error("Something went wrong !");
  }
};

const Http = { post, get, formData };

export default Http;
