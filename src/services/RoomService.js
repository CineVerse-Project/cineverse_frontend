import axios from "axios";
import { API_SERVER_URL } from "../constants/constant-url.js";

axios.defaults.baseURL = API_SERVER_URL;

const RoomService = {
  async getAllRoom() {
    const url = API_SERVER_URL + "room" ;
    try {
      const response = await axios.get(url);
      console.log(response.data)
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async createRoom(data) {
    const url = API_SERVER_URL + "room";
    try {
        await axios.post(url, { ...data });
        console.log(data)
    } catch (error) {
        throw error;
    }
},

async updateRoom(data,id) {
  const url = API_SERVER_URL + "room/" + id;
  try {
      await axios.patch(url, { ...data });
      console.log(data)
  } catch (error) {
      throw error;
  }
},


async deleteRoom(id) {
  const url = API_SERVER_URL + "room/"+id;
  try {
      await axios.delete(url);
  } catch (error) {
      throw error;
  }
},
};


export default RoomService