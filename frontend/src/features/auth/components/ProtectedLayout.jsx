import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../../../components/ui/Navbar';
import PageSkeleton from '../../../components/ui/PageSkeleton';

const ProtectedLayout = () => {
  const { loading, user } = useAuth();

  console.log("[ProtectedLayout] Rendering - loading:", loading, "user:", user);

  if (loading) {
    console.log("[ProtectedLayout] Still loading, showing PageSkeleton");
    return <PageSkeleton />;
  }
  if (!user) {
    console.log("[ProtectedLayout] No user found, redirecting to /login");
    return <Navigate to="/login" />;
  }
  console.log("[ProtectedLayout] User authenticated, showing Navbar and Outlet");
  return (
    <Navbar>
      <Outlet />
    </Navbar>
  );
};

export default ProtectedLayout;
