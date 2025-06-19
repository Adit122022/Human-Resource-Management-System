import { useEffect } from 'react';
import AppRouter from './Routes/AppRouter';
import useAuthStore from './store/authStore';

const App = () => {
  const initAuth = useAuthStore((state) => state.initAuth);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return <AppRouter />;
};

export default App;
