import axios from "axios";
import { io } from "socket.io-client";

export class API {
  static async get(url, params) {
    return await axios.get(url, params).then((res) => res.data);
  }
  static async post(url, params, config) {
    return await axios.post(url, params, config).then((res) => res.data);
  }
}

export const openSocket = () => {
  const url: string = "http://localhost:8000";
  const socket = io(url);
  return socket;
};
