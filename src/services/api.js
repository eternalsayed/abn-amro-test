import axios from "axios";
const API_BASE = "https://api.tvmaze.com/";
export default {
  search(name) {
    return axios
      .get(`${API_BASE}search/shows?q=${name}`)
      .then(({ data }) => data);
  },
  getShowsList(page = 1) {
    return axios.get(`${API_BASE}shows?page=${page}`).then(({ data }) => data);
  },
  getShowDetail(id) {
    return axios.get(`${API_BASE}shows/${id}`).then(({ data }) => data);
  },
};
