import axios from "axios";

export const ApiService = {
  get: async (url: string) => {
    try {
      const response = await axios.get(`http://localhost:3100/${url}`, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Accept: "*/*",
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  post: async (url: string, body: {}) => {
    try {
      const response = await axios.post(`http://localhost:3100/${url}`, body, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export interface apiRes {
  Name: string;
  Results: string[];
}
