import axios from "axios";

// const API_BASE_URL = process.env.DATABASE_URL;
const leEnvTEst = process.env.DATABASE_URL;
console.log("ENNNNNNNV TESSSST: ", leEnvTEst);
const API_BASE_URL = "https://backend-ic9i.onrender.com/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // Spécifiez le délai d'attente pour toutes les requêtes
});

const setAuthHeader = (token) => {
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
  // Ajoutez d'autres méthodes de requête au besoin (patch, etc.)
};

export const AuthAPI = {
  login: (credentials) => {
    return apiClient.post("/auth/login", credentials);
  },
  register: (userData) => {
    return apiClient.post("/auth/register", userData);
  },
  // Ajoutez d'autres méthodes d'authentification au besoin (logout, refresh token, etc.)
};

export const UserAPI = {
  getUserProfile: () => {
    return apiClient.get("/user/profile");
  },
  updateUserProfile: (userData) => {
    return apiClient.put("/user/profile", userData);
  },
  // Ajoutez d'autres méthodes d'utilisateur au besoin (get other user, delete user, etc.)
};

export const StepsAPI = {
  getSteps: () => {
    return apiClient.get("/steps");
  },
  // Ajoutez d'autres méthodes de pas au besoin (add step, delete step, etc.)
};

export const ChallengesAPI = {
  getChallenges: () => {
    return apiClient.get("/challenges");
  },
  getActual: () => {
    return apiClient.get("/challenges/actual");
  },
  // Ajoutez d'autres méthodes de défi au besoin (add challenge, delete challenge, etc.)
};

export default API;
