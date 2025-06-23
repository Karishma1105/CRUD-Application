import axios from "axios";
const API_URL =
  "https://684d210265ed087139152a4b.mockapi.io/procedure/Procedures";
export const addProcedure = (data) => axios.post(API_URL, data);
export const getProcedures = () => axios.get(API_URL);
export const deleteProcedure = (id) => axios.delete(`${API_URL}/${id}`);
export const updateProcedure = (id, data) =>
  axios.put(`${API_URL}/${id}`, data);
