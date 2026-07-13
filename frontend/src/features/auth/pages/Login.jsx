import { Link, Navigate, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
import PageSkeleton from '../../../components/ui/PageSkeleton';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import FormField from '../../../components/ui/FormField';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { user, loading, handleLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your email.');
      return;
    }

    if (!password.trim()) {
      setError('Please enter your password.');
      return;
    }

    try {
      const res = await handleLogin({ username: email, password });

      if (res?.success === true) {
        navigate('/dashboard');
      } else if (res?.success === false) {
        setError(res?.message || 'Login failed. Please check your credentials.');
      } else {
        // handleLogin might return undefined on error due to catch block
        setError('Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(
        err?.response?.data?.message ||
        err?.message ||
        'Login failed. Please check your credentials and try again.'
      );
    }
  };

  if (loading) {
    return <PageSkeleton />;
  }

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="backdrop-blur-md bg-opacity-75 border-b px-4 sm:px-6 py-3 flex items-center" style={{ borderColor: 'var(--color-divider)' }}>
        <span className="font-bold text-lg">Tracker</span>
        <Link to="/register" className="ml-auto text-sm hover:text-accent transition-colors">
          Don't have an account? Register
        </Link>
      </nav>

      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-10">
        <div className="w-full max-w-[420px]">
          <h6 className="text-accent text-xs font-semibold uppercase mb-1.5">Welcome back</h6>
          <h2 className="text-xl sm:text-2xl font-bold mb-1.5">Log In</h2>
          <p className="text-text-secondary text-sm mb-8">
            Log in to track applications and generate tailored reports.
          </p>

          <div className="space-y-5 border-t pt-6" style={{ borderColor: 'var(--color-divider)' }}>
            <FormField label="Email" htmlFor="login-email">
              <Input
                id="login-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormField>

            <FormField label="Password" htmlFor="login-password">
              <Input
                id="login-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormField>

            {error && <div className="text-xs text-status-rejected bg-status-rejected/10 p-3 rounded-md">{error}</div>}

            <Button variant="primary" onClick={handleSubmit} className="w-full">
              Log In
            </Button>

            <Link to="#" className="text-xs text-accent hover:underline">
              Forgot password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
