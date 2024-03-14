import axios from "axios";

// const API_BASE_URL = process.env.DATABASE_URL;
// const API_BASE_URL = "https://backend-ic9i.onrender.com/api";
const API_BASE_URL = process.env.EXPO_PUBLIC_DATABASE_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // Spécifiez le délai d'attente pour toutes les requêtes
});

export const setAuthHeader = (token) => {
  if (token) {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common["Authorization"];
  }
};

const API = {
  get: (url, params) => {
    return apiClient.get(url, { params });
  },
  post: (url, data) => {
    return apiClient.post(url, data);
  },
  put: (url, data) => {
    return apiClient.put(url, data);
  },
  delete: (url) => {
    return apiClient.delete(url);
  },
};

export const AuthAPI = {
  login: (credentials) => {
    return apiClient.post("/auth/login", credentials);
  },
  register: (userData) => {
    return apiClient.post("/auth/register", userData);
  },
};

export const UserAPI = {
  getMe: () => {
    return apiClient.get("/users/me");
  },
  putUser: (id, user) => {
    return apiClient.put("/users/" + id, user);
  },
  getBadges: (id) => {
    return apiClient.get(`/users/${id}/badges`);
  },
  getFriends: (id) => {
    return apiClient.get(`/friends-request`);
  },
};

export const StepsAPI = {
  getSteps: () => {
    return apiClient.get("/steps");
  },
};

export const ChallengesAPI = {
  getChallenges: () => {
    return apiClient.get("/challenges");
  },
  getStats: (id) => {
    return apiClient.get(`/challenges/${id}/stats`);
  },
};


export default API;
