import { useRef, useState } from 'react';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { useNavigate, Link } from 'react-router';
import { useClickOutside } from '../../hooks/useClickOutside';

const UserMenu = () => {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useClickOutside(menuRef, () => setOpen(false));

  const userName = user?.username ?? 'Account';
  const initials = userName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');

  const handleLogoutClick = async () => {
    await handleLogout();
    navigate('/login');
  };

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-full p-1"
      >
        <div className="w-7 h-7 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center">
          {initials}
        </div>
        <span className="text-[13px] font-bold text-text">{userName}</span>
        <svg
          className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-[calc(100%+8px)] right-0 min-w-[210px] rounded-lg border border-divider/60 bg-surface/90 backdrop-blur-md shadow-lg overflow-hidden z-20">
          <div className="p-3 border-b border-divider/40">
            <div className="font-bold text-sm text-text">{userName}</div>
          </div>
          <Link
            to="/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-3 py-2 text-sm text-text hover:bg-text/5 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            View Profile
          </Link>
          <button
            onClick={handleLogoutClick}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-status-rejected hover:bg-status-rejected/10 transition-colors border-t border-divider/40"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
