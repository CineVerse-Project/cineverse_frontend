import axios from "axios";
import { API_SERVER_URL } from "../constants/constant-url.ts";

axios.defaults.baseURL = API_SERVER_URL;

const TypeMovieService = {
    async getAllType() {
      const url = API_SERVER_URL + "movie-type" ;
      try {
        const response = await axios.get(url);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
};  

export default TypeMovieService