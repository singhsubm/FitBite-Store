import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // Jab bhi URL (pathname) badlega, ye upar scroll karega

  return null;
};

export default ScrollToTop;