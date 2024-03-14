import axios from "axios";

const API_BASE_URL = process.env.EXPO_PUBLIC_DATABASE_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // Spécifiez le délai d'attente pour toutes les requêtes
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
    return apiClient.get(`/users/${id}/friends`);
  },
  putSteps: (id, steps) => {
    return apiClient.put(`/users/${id}/steps`, steps);
  },
  postFriend: (id, friend) => {
    return apiClient.post(`/users/${id}/friends`, friend);
  },
  getFriends: (id) => {
    return apiClient.get(`/users/${id}/friends`);
  },
  getSteps: (id) => {
    return apiClient.get(`/users/${id}/steps`);
  },
};

export const StepsAPI = {
  getSteps: () => {
    return apiClient.get("/steps");
  },
};

export const ChallengesAPI = {
  getActual: () => {
    return apiClient.get("/challenges/actual");
  },
  getStats: (id) => {
    return apiClient.get(`/challenges/${id}/stats`);
  },
};


export default API;
