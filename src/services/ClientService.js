import axios from "axios";
import { API_SERVER_URL } from "../constants/constant-url.ts";

axios.defaults.baseURL = API_SERVER_URL;

const CLIENT_APIS = {
    HOME_FIND_ALL_MOVIE_IS_SHOWING: "/movie-is-showing",
    HOME_FIND_ALL_MOVIE_PREMIERE_SOON: "/movie-premiere-soon",
    HOME_FIND_TOP_10_MOVIE_IS_SHOWING: "/movie-top-10-is-showing",
    MOVIEDETAIL_FIND_MOVIE_BY_ID: "/movie-detail",
};

const clientService = {
    async getAllMovieListIsShowing() {
        try {
            const response = await axios.get(
                `${CLIENT_APIS.HOME_FIND_ALL_MOVIE_IS_SHOWING}`
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }, 
    
    async getAllMovieListPremiereSoon() {
        try {
            const response = await axios.get(
                `${CLIENT_APIS.HOME_FIND_ALL_MOVIE_PREMIERE_SOON}`
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }, 

    async getTop10MovieIsShowing() {
        try {
            const response = await axios.get(
                `${CLIENT_APIS.HOME_FIND_TOP_10_MOVIE_IS_SHOWING}`
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }, 

    async getMovieDetailById(movieId) {
        try {
            const response = await axios.get(
                `${CLIENT_APIS.MOVIEDETAIL_FIND_MOVIE_BY_ID}/${movieId}`
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default clientService;
