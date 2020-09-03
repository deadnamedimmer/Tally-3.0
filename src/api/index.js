import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const insertEvent = (payload) => api.post(`/event`, payload);
export const getAllEvents = () => api.get(`/events`);
export const deleteEventById = (id) => api.delete(`/event/${id}`);
export const getThree = () => api.get(`/lastEvents`);
export const getNumber = () => api.get(`/number`);
export const search = (payload) => api.post(`/search`, payload);

const apis = {
  insertEvent,
  getAllEvents,
  deleteEventById,
  getThree,
  getNumber,
  search
};

export default apis;