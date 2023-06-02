import axios from "axios";
import { API_SERVER_URL } from "../constants/constant-url.js";

axios.defaults.baseURL = API_SERVER_URL;

const MovieService = {
    async getAllMovie() {
      const url = API_SERVER_URL + "movie" ;
      try {
        const response = await axios.get(url);
        return response.data;
      } catch (error) {
        throw error;
      }
    },

    async createMovie(data) {
        const url = API_SERVER_URL + "movie";
        try {
            await axios.post(url, { ...data });
            console.log(data)
        } catch (error) {
            throw error;
        }
    },


    async updateMovie(data,id) {
  const url = API_SERVER_URL + "movie/" + id;
  try {
      await axios.patch(url, { ...data });
      console.log(data)
  } catch (error) {
      throw error;
  }
},

async findMovie(id) {
  const url = API_SERVER_URL + "movie/" + id;
  try {
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
    
  } catch (error) {
      throw error;
  }
},



    async deleteMovie(id) {
        const url = API_SERVER_URL + "movie/"+id;
        try {
            await axios.delete(url);
        } catch (error) {
            throw error;
        }
      },
};  

export default MovieService