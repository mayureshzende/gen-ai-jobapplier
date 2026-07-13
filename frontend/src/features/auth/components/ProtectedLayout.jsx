import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../../../components/ui/Navbar';
import PageSkeleton from '../../../components/ui/PageSkeleton';

const ProtectedLayout = () => {
  const { loading, user } = useAuth();

  if (loading) {
    return <PageSkeleton />;
  }
  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <Navbar>
      <Outlet />
    </Navbar>
  );
};

export default ProtectedLayout;
