import axios from "axios";
import { API_SERVER_URL } from "../constants/constant-url.js";

const ticketService = {
  async getSeatBySchedule(roomId, sheduleDateTime) {
    const url =
      API_SERVER_URL +
      `ticket/detail?sheduleDateTime=${sheduleDateTime}&roomId=${roomId}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async createBooking(token) {
    const url = API_SERVER_URL + "booking";
    try {
      const response = await axios.post(url, null ,{headers: {
        'Authorization' : `Bearer ${token}`
      }});
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async payment(bookingId, totalAmount) {
    const url = API_SERVER_URL + "payment";
    try {
      const response = await axios
        .get(url, {
          params: {
            bookingId: bookingId,
            totalAmount: totalAmount,
          },
        })
        .then((data) => {
          console.log("dataTicket" + data);
          return data;
        })
        .catch((error) => {
          console.error(error);
        });
      return response;
    } catch (error) {
      throw error;
    }
  },
  async changePaymentStatus(bookingId) {
    console.log(bookingId);
    const url = API_SERVER_URL + "booking/changePaymentStatus";
    try {
      const response = await axios
        .patch(url, null, {
          params: {
            id: bookingId,
          },
        })
        .then((data) => {
          return data;
        })
        .catch((error) => {
          console.error(error);
        });

      return response;
    } catch (error) {
      throw error;
    }
  },
  async changeTotalTicket(bookingId) {
    console.log(bookingId);
    const url = API_SERVER_URL + "booking/changeTotalTicket";
    try {
      const response = await axios
        .patch(url, null, {
          params: {
            id: bookingId,
          },
        })
        .then((data) => {
          return data;
        })
        .catch((error) => {
          console.error(error);
        });

      return response;
    } catch (error) {
      throw error;
    }
  },
  async saveTicket(bookingId, dataTicket) {
    const url = API_SERVER_URL + "ticket";
    try {
      const response = await axios
        .patch(url, dataTicket, {
          params: {
            bookingId: bookingId,
          },
        })
        .then((data) => {
          return data;
        })
        .catch((error) => {
          console.error(error);
        });
      return response;
    } catch (error) {
      throw error;
    }
  },
  async findTicketByTicketId(id) {
    const url = API_SERVER_URL + `ticket/${id}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async findCustomerByUser(token) {
    const url = API_SERVER_URL + "booking/customer";
    try {
      const response = await axios.get(url, {headers: {
        'Authorization' : `Bearer ${token}`
      }});
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async getTicketDetail(bookingId) {
    const url = API_SERVER_URL + "ticket/detailBooking";
    try {
      const response = await axios.get(url, {
        params: {
          bookingId: bookingId,
        },
      });
      console.log(response.data)
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
export default ticketService;
