import { create } from 'zustand';
import  { jwtDecode  as jwt_decode }  from 'jwt-decode';

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoggedIn: false,

  login: (token) => {
    const decoded = jwt_decode(token);
    set({
      token,
      user: decoded,
      isLoggedIn: true,
    });
    localStorage.setItem('token', token);
  },

  logout: () => {
    set({
      user: null,
      token: null,
      isLoggedIn: false,
    });
    localStorage.removeItem('token');
  },

  initAuth: () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwt_decode(token);
        set({
          token,
          user: decoded,
          isLoggedIn: true,
        });
      } catch (error) {
        console.error('Invalid token');
        localStorage.removeItem('token');
      }
    }
  }
}));

export default useAuthStore;
