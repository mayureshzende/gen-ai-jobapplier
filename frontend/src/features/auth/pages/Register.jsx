import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import PageSkeleton from '../../../components/ui/PageSkeleton';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import FormField from '../../../components/ui/FormField';

const Register = () => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { user, loading, handleRegister } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Please enter a username.');
      return;
    }

    if (!email.trim()) {
      setError('Please enter your email.');
      return;
    }

    if (!password.trim()) {
      setError('Please enter a password.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    try {
      const res = await handleRegister({
        username,
        email,
        password,
        firstName,
        middleName,
        lastName,
      });

      if (res?.success === true) {
        navigate('/login?registered=1');
      } else if (res?.success === false) {
        setError(res?.message || 'Registration failed. Please try again.');
      } else {
        // handleRegister might return undefined on error due to catch block
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(
        err?.response?.data?.message ||
        err?.message ||
        'Registration failed. Please try again.'
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
        <Link to="/login" className="ml-auto text-sm hover:text-accent transition-colors">
          Already have an account? Log In
        </Link>
      </nav>

      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-10">
        <div className="w-full max-w-[420px]">
          <h6 className="text-accent text-xs font-semibold uppercase mb-1.5">Get started</h6>
          <h2 className="text-xl sm:text-2xl font-bold mb-1.5">Create Account</h2>
          <p className="text-text-secondary text-sm mb-8">
            Track applications and generate tailored resumes and cover letters.
          </p>

          <div className="space-y-5 border-t pt-6" style={{ borderColor: 'var(--color-divider)' }}>
            <FormField label="Username" htmlFor="reg-username">
              <Input
                id="reg-username"
                type="text"
                placeholder="jane_doe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormField>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
              <FormField label="First Name (Optional)" htmlFor="reg-firstName">
                <Input
                  id="reg-firstName"
                  type="text"
                  placeholder="Jane"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </FormField>

              <FormField label="Middle Name (Optional)" htmlFor="reg-middleName">
                <Input
                  id="reg-middleName"
                  type="text"
                  placeholder="Marie"
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                />
              </FormField>

              <FormField label="Last Name (Optional)" htmlFor="reg-lastName">
                <Input
                  id="reg-lastName"
                  type="text"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </FormField>
            </div>

            <FormField label="Email" htmlFor="reg-email">
              <Input
                id="reg-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormField>

            <FormField label="Password" htmlFor="reg-password" hint="Minimum 6 characters">
              <Input
                id="reg-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormField>

            {error && <div className="text-xs text-status-rejected bg-status-rejected/10 p-3 rounded-md">{error}</div>}

            <Button variant="primary" onClick={handleSubmit} className="w-full">
              Create Account
            </Button>

            <p className="text-text-secondary text-[11px]">
              By creating an account you agree to the Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
