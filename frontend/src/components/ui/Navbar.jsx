import { useContext, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { NavContents } from '../../data';
import { NavLink, Link } from 'react-router';
import UserMenu from './UserMenu';
import Button from './Button';

const Navbar = ({ children }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-20 backdrop-blur-md bg-opacity-75 border-b px-3 sm:px-4 md:px-6 py-2 sm:py-3 flex items-center justify-between" style={{ borderColor: 'var(--color-divider)' }}>
        <div className="flex items-center gap-3 sm:gap-6 md:gap-8 flex-1">
          <Link to="/dashboard" className="font-bold text-base sm:text-lg hover:text-accent transition-colors whitespace-nowrap">
            Tracker
          </Link>

          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {NavContents.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${isActive ? 'text-accent' : ''}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
          <Button
            as={Link}
            to="/applications"
            variant="primary"
            size="sm"
            className="text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 whitespace-nowrap"
          >
            <span className="hidden sm:inline">+ New Application</span>
            <span className="sm:hidden">+ New</span>
          </Button>

          <Button
            variant="icon"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            className="p-1.5 sm:p-2 text-lg"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </Button>

          {/* Hamburger Menu Button - Mobile Only */}
          <Button
            variant="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5"
            title="Toggle navigation menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </Button>

          <UserMenu />
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden sticky top-[53px] z-20 border-b backdrop-blur-md bg-opacity-75" style={{ borderColor: 'var(--color-divider)' }}>
          <div className="px-3 py-2 space-y-1">
            {NavContents.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-accent/20 text-accent'
                      : 'text-text hover:bg-surface/50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}

      <main>{children}</main>
    </>
  );
};

export default Navbar;
