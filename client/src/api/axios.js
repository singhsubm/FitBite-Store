import axios from 'axios';

// const BackendURL = 'https://fitbite-api-27qz.onrender.com/api';
// const BackendURL = 'http://localhost:5000/api';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // baseURL: DevURL || BackendURL,
});

// console.log("API URL =>", import.meta.env.VITE_API_URL);

// === REQUEST INTERCEPTOR (Ye har request ke saath token bhejege) ===
API.interceptors.request.use((req) => {
  // LocalStorage se userInfo nikalo
  const userInfo = localStorage.getItem('userInfo');

  if (userInfo) {
    const parsedUser = JSON.parse(userInfo);
    
    // Agar token hai, to Header me laga do
    if (parsedUser.token) {
      req.headers.Authorization = `Bearer ${parsedUser.token}`;
    }
  }

  return req;
});

export default API;