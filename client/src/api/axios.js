import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', // Apna backend URL check karlena
});

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