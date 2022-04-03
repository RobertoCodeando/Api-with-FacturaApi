import { Navigate } from '@tanstack/react-location';

const AuthInitializer: React.FC = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/" replace={true} />;
  }
  return <>{children}</>;
};

export default AuthInitializer;
