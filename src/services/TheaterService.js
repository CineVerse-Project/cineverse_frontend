import axios from "axios";
import { API_SERVER_URL } from "../constants/constant-url.ts";

axios.defaults.baseURL = API_SERVER_URL;

const TheaterService = {
  async getAllTheater() {
    const url = API_SERVER_URL + "theater" ;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  
  async createTheater(data) {
    const url = API_SERVER_URL + "theater";
    try {
        await axios.post(url, { ...data });
        console.log(data)
    } catch (error) {
        throw error;
    }
},

async updateTheater(data,id) {
  const url = API_SERVER_URL + "theater/" + id;
  try {
      await axios.patch(url, { ...data });
      console.log(data)
  } catch (error) {
      throw error;
  }
},

async findTheater(id) {
  const url = API_SERVER_URL + "theater/" + id;
  try {
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
    
  } catch (error) {
      throw error;
  }
},


async deleteTheater(id) {
  const url = API_SERVER_URL + "theater/"+id;
  try {
      await axios.delete(url);
  } catch (error) {
      throw error;
  }
},




};


export default TheaterService