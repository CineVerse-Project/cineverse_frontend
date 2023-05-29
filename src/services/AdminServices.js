import axios from "axios";
import { API_SERVER_URL } from "../constants/constant-url.ts";

axios.defaults.baseURL = API_SERVER_URL;

const ADMIN_APIS = {
    SCHEDULE_FIND_ALL: "/schedule",
};

const adminService = {
    async getAllSchedule(currentPage) {
        try {
            const response = await axios.get(
                `${ADMIN_APIS.SCHEDULE_FIND_ALL}`,
                { params: { page: currentPage } }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async deleteScheduleById(scheduleId) {
        try {
            const response = await axios.delete(
                `${ADMIN_APIS.SCHEDULE_FIND_ALL}`,
                {
                    params: {
                        sheduleDateTime: scheduleId.sheduleDateTime.substring(
                            0,
                            16
                        ),
                        roomId: scheduleId.roomId,
                    },
                }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default adminService;
