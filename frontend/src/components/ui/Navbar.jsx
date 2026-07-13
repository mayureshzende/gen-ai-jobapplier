import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { NavContents } from '../../data';
import { NavLink, Link } from 'react-router';
import UserMenu from './UserMenu';
import Button from './Button';

const Navbar = ({ children }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      <nav style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-divider)', color: 'var(--color-text)' }} className="sticky top-0 z-10 backdrop-blur-md bg-opacity-75 border-b px-6 py-3 flex items-center gap-4">
        <Link to="/dashboard" style={{ color: 'var(--color-text)' }} className="font-bold text-lg hover:text-accent transition-colors">
          Tracker
        </Link>

        <div className="flex items-center gap-6 ml-8">
          {NavContents.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${isActive ? '' : ''}`
              }
              style={({ isActive }) => ({
                color: isActive ? 'var(--color-accent)' : 'var(--color-text)',
              })}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-3">
          <Button
            as={Link}
            to="/applications"
            variant="primary"
            size="sm"
          >
            + New Application
          </Button>

          <Button
            variant="icon"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            style={{ color: 'var(--color-text)' }}
          >
            {theme === 'dark' ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.536l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm5.414 5.414a1 1 0 01.707-.293h.586a1 1 0 010 2h-.586a1 1 0 01-.707-1.707zM5 8a1 1 0 100-2H4a1 1 0 100 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </Button>

          <UserMenu />
        </div>
      </nav>
      <main style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>{children}</main>
    </>
  );
};

export default Navbar;
