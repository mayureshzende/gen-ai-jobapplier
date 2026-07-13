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

  const fullName = [user?.firstName, user?.middleName, user?.lastName]
    .filter(Boolean)
    .join(' ')
    .trim();
  const userName = fullName || (user?.username ?? 'Account');
  const initialsArray = fullName
    ? [user?.firstName?.[0], user?.lastName?.[0]].filter(Boolean).map(c => c.toUpperCase()).slice(0, 2)
    : userName.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase());
  const initials = initialsArray.join('');

  const handleLogoutClick = async () => {
    await handleLogout();
    navigate('/login');
  };

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 sm:gap-2 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-full p-1"
      >
        <div className="w-6 sm:w-7 h-6 sm:h-7 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
          {initials}
        </div>
        <span className="text-xs sm:text-[13px] font-bold text-text hidden sm:inline max-w-[80px] truncate">{userName}</span>
        <svg
          className={`w-3.5 sm:w-4 h-3.5 sm:h-4 transition-transform flex-shrink-0 ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute top-[calc(100%+6px)] right-0 min-w-[180px] sm:min-w-[210px] rounded-lg border shadow-lg overflow-hidden z-20"
          style={{
            borderColor: 'var(--color-divider)',
            backgroundColor: 'var(--color-surface)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div className="p-2 sm:p-3 border-b text-xs sm:text-sm" style={{ borderColor: 'var(--color-divider)' }}>
            <div className="font-bold truncate">{userName}</div>
          </div>
          <Link
            to="/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm hover:opacity-80 transition-colors"
            style={{ color: 'var(--color-text)' }}
          >
            <svg className="w-3.5 sm:w-4 h-3.5 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            View Profile
          </Link>
          <button
            onClick={handleLogoutClick}
            className="w-full flex items-center gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm hover:opacity-80 transition-colors border-t"
            style={{
              borderColor: 'var(--color-divider)',
              color: 'var(--status-rejected)',
            }}
          >
            <svg className="w-3.5 sm:w-4 h-3.5 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
