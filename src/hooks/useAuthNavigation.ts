import { useNavigate } from 'react-router-dom';

export function useAuthNavigation() {
  const navigate = useNavigate();

  const handleStartClick = () => {
    const isAuth = localStorage.getItem("dietcase-mock-auth") === "true";
    if (isAuth) {
      navigate('/dashboard');
    } else {
      navigate('/auth');
    }
  };

  return { handleStartClick };
}