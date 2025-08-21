import axios from "axios";

const API_BASE = "http://localhost:5000";

export const fetchEvents = async () => {
  const { data } = await axios.get(`${API_BASE}/events`);
  return data;
};

export const fetchEventById = async (id) => {
  const { data } = await axios.get(`${API_BASE}/events/${id}`);
  return data;
};

export const createEvent = async (eventData) => {
  const { data } = await axios.post(`${API_BASE}/events`, eventData);
  return data;
};

export const updateEvent = async (id, eventData) => {
  const { data } = await axios.put(`${API_BASE}/events/${id}`, eventData);
  return data;
};

export const deleteEvent = async (id) => {
  const { data } = await axios.delete(`${API_BASE}/events/${id}`);
  return data;
};

export const buyTicket = async (ticketData) => {
  const { data } = await axios.post(`${API_BASE}/tickets`, ticketData);
  return data;
};

export const fetchTicketsByUser = async (userId) => {
  const { data } = await axios.get(`${API_BASE}/tickets?buyerId=${userId}`);
  return data;
};

export const fetchEventsByOrganizer = async (organizerId) => {
  const { data } = await axios.get(
    `${API_BASE}/events?organizerId=${organizerId}`
  );
  return data;
};
