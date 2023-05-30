import axios from "axios";
import { API_SERVER_URL } from "../constants/constant-url.ts";

axios.defaults.baseURL = API_SERVER_URL;

const ADMIN_APIS = {
    SCHEDULE: "/schedule",
    SCHEDULE_DETAIL: "/schedule/detail",
    MOVIE: "/movie",
    THEATER: "/theater",
    ROOM: "/room",
    TOP_3_MOVIE: "/report/top3MovieInMonth",
    TOP_5_THEATER: "/report/top5TheaterInMonth",
    REVENUE_BY_MONTH: "/report/revenueByMonth",
    REVENUE_BY_PERIOD_TIME: "/report/revenueByPeriodTime",
    REVENUE_BY_PERIOD_TIME_MOVIE: "/report/revenueByPeriodTimeAndMovie",
    REVENUE_BY_PERIOD_TIME_THEATER: "/report/revenueByPeriodTimeAndTheater",
    REVENUE_BY_PERIOD_TIME_PROVINCE: "/report/revenueByPeriodTimeAndProvince",
    REVENUE_MONTH_IN_YEAR: "/report/revenueMonthInYear",
    REVENUE_MONTH_IN_YEAR_MOVIE: "/report/revenueMonthInYearAndMovie",
    REVENUE_MONTH_IN_YEAR_THEATER: "/report/revenueMonthInYearAndTheater",
    REVENUE_MONTH_IN_YEAR_PROVINCE: "/report/revenueMonthInYearAndProvince",
    TICKET_MONTH_IN_YEAR: "/report/ticketMonthInYear",
    TICKET_MONTH_IN_YEAR_MOVIE: "/report/ticketMonthInYearAndMovie",
    TICKET_MONTH_IN_YEAR_THEATER: "/report/ticketMonthInYearAndTheater",
    TICKET_MONTH_IN_YEAR_PROVINCE: "/report/ticketMonthInYearAndProvince",
    TICKET_BY_PERIOD_TIME: "/report/ticketByPeriodTime",
    TICKET_BY_PERIOD_TIME_MOVIE: "/report/ticketByPeriodTimeAndMovie",
    TICKET_BY_PERIOD_TIME_THEATER: "/report/ticketByPeriodTimeAndTheater",
    TICKET_BY_PERIOD_TIME_PROVINCE: "/report/ticketByPeriodTimeAndProvince",
    PROVINCE: "/province",
};

const adminService = {
    async getAllSchedule(currentPage, keywordSearch) {
        try {
            const response = await axios.get(`${ADMIN_APIS.SCHEDULE}`, {
                params: { page: currentPage, keyword: keywordSearch, size: 7 },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async getScheduleById(sheduleDateTime, roomId) {
        try {
            const response = await axios.get(`${ADMIN_APIS.SCHEDULE_DETAIL}`, {
                params: { sheduleDateTime: sheduleDateTime, roomId: roomId },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async getAllMovie() {
        try {
            const response = await axios.get(`${ADMIN_APIS.MOVIE}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async getTop3MovieInMonth(currentDate) {
        try {
            const response = await axios.get(`${ADMIN_APIS.TOP_3_MOVIE}`, {
                params: { date: currentDate },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async getTop5TheaterInMonth(currentDate) {
        try {
            const response = await axios.get(`${ADMIN_APIS.TOP_5_THEATER}`, {
                params: { date: currentDate },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async getAllTheater() {
        try {
            const response = await axios.get(`${ADMIN_APIS.THEATER}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async getAllProvince() {
        try {
            const response = await axios.get(`${ADMIN_APIS.PROVINCE}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async getAllRoom() {
        try {
            const response = await axios.get(`${ADMIN_APIS.ROOM}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async createSchedule(data) {
        try {
            await axios.post(`${ADMIN_APIS.SCHEDULE}`, { ...data });
        } catch (error) {
            throw error;
        }
    },
    async updateSchedule(data) {
        try {
            await axios.put(`${ADMIN_APIS.SCHEDULE}`, { ...data });
        } catch (error) {
            throw error;
        }
    },
    async deleteScheduleById(scheduleId) {
        try {
            const response = await axios.delete(`${ADMIN_APIS.SCHEDULE}`, {
                params: {
                    sheduleDateTime: scheduleId.sheduleDateTime.substring(
                        0,
                        16
                    ),
                    roomId: scheduleId.roomId,
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async getRevenueByMonth(date) {
        try {
            const response = await axios.get(`${ADMIN_APIS.REVENUE_BY_MONTH}`, {
                params: { month: date },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async getRevenueByPeriodTime(start, end) {
        try {
            const response = await axios.get(
                `${ADMIN_APIS.REVENUE_BY_PERIOD_TIME}`,
                {
                    params: { startDate: start, endDate: end },
                }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async getRevenueByPeriodTimeAndMovie(start, end, id) {
        try {
            const response = await axios.get(
                `${ADMIN_APIS.REVENUE_BY_PERIOD_TIME_MOVIE}`,
                {
                    params: { startDate: start, endDate: end, movieId: id },
                }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async getRevenueByPeriodTimeAndTheater(start, end, id) {
        try {
            const response = await axios.get(
                `${ADMIN_APIS.REVENUE_BY_PERIOD_TIME_THEATER}`,
                {
                    params: { startDate: start, endDate: end, theaterId: id },
                }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async getRevenueByPeriodTimeAndProvince(start, end, id) {
        try {
            const response = await axios.get(
                `${ADMIN_APIS.REVENUE_BY_PERIOD_TIME_PROVINCE}`,
                {
                    params: { startDate: start, endDate: end, provinceId: id },
                }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async getRevenueMonthInYear(year) {
        try {
            const response = await axios.get(
                `${ADMIN_APIS.REVENUE_MONTH_IN_YEAR}`,
                {
                    params: { year: year },
                }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async getRevenueMonthInYearAndMovie(year, id) {
        try {
            const response = await axios.get(
                `${ADMIN_APIS.REVENUE_MONTH_IN_YEAR_MOVIE}`,
                {
                    params: { year: year, movieId: id },
                }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async getRevenueMonthInYearAndTheater(year, id) {
        try {
            const response = await axios.get(
                `${ADMIN_APIS.REVENUE_MONTH_IN_YEAR_THEATER}`,
                {
                    params: { year: year, theaterId: id },
                }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async getRevenueMonthInYearAndProvince(year, id) {
        try {
            const response = await axios.get(
                `${ADMIN_APIS.REVENUE_MONTH_IN_YEAR_PROVINCE}`,
                {
                    params: { year: year, provinceId: id },
                }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async getTicketMonthInYear(year) {
        try {
            const response = await axios.get(
                `${ADMIN_APIS.TICKET_MONTH_IN_YEAR}`,
                {
                    params: { year: year },
                }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async getTicketMonthInYearAndMovie(year, id) {
        try {
            const response = await axios.get(
                `${ADMIN_APIS.TICKET_MONTH_IN_YEAR_MOVIE}`,
                {
                    params: { year: year, movieId: id },
                }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async getTicketMonthInYearAndTheater(year, id) {
        try {
            const response = await axios.get(
                `${ADMIN_APIS.TICKET_MONTH_IN_YEAR_THEATER}`,
                {
                    params: { year: year, theaterId: id },
                }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async getTicketMonthInYearAndProvince(year, id) {
        try {
            const response = await axios.get(
                `${ADMIN_APIS.TICKET_MONTH_IN_YEAR_PROVINCE}`,
                {
                    params: { year: year, provinceId: id },
                }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async getTicketByPeriodTime(start, end) {
        try {
            const response = await axios.get(
                `${ADMIN_APIS.TICKET_BY_PERIOD_TIME}`,
                {
                    params: { startDate: start, endDate: end },
                }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async getTicketByPeriodTimeAndMovie(start, end, id) {
        try {
            const response = await axios.get(
                `${ADMIN_APIS.TICKET_BY_PERIOD_TIME_MOVIE}`,
                {
                    params: { startDate: start, endDate: end, movieId: id },
                }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async getTicketByPeriodTimeAndTheater(start, end, id) {
        try {
            const response = await axios.get(
                `${ADMIN_APIS.TICKET_BY_PERIOD_TIME_THEATER}`,
                {
                    params: { startDate: start, endDate: end, theaterId: id },
                }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async getTicketByPeriodTimeAndProvince(start, end, id) {
        try {
            const response = await axios.get(
                `${ADMIN_APIS.TICKET_BY_PERIOD_TIME_PROVINCE}`,
                {
                    params: { startDate: start, endDate: end, provinceId: id },
                }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default adminService;
