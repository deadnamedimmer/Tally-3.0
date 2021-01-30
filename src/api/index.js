import axios from "axios";

const api = axios.create({
//  baseURL: "https://172.16.0.129:3000/api",
  baseURL: "https://tally.cidlibrary.org:3000/api",
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
