import axios from "axios";
import { API_SERVER_URL } from "../constants/constant-url.ts";

axios.defaults.baseURL = API_SERVER_URL;

const ScheduleServices = {
  async getAllScheduleByMovie(movieId, scheduleDateTime, provinceId) {
    const url = API_SERVER_URL + "schedule/movie";
    try {
      const response = await axios.get(url, {
        params: {
          movieId: movieId,
          scheduleDateTime: scheduleDateTime,
          provinceId: provinceId,
        },
      });

      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async getAllProvince() {
    const url = API_SERVER_URL + "province";
    try {
      const response = await axios.get(url);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default ScheduleServices;
