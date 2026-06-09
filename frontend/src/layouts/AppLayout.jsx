import { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FileText,
  MonitorPlay,
  CalendarDays,
  HardDrive,
  Settings,
  Search,
} from 'lucide-react';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/clients', label: 'Clients', icon: Users },
  { to: '/content', label: 'Content', icon: FileText },
  { to: '/platforms', label: 'Platforms', icon: MonitorPlay },
  { to: '/timeline', label: 'Timeline', icon: CalendarDays },
  { to: '/storage', label: 'Storage', icon: HardDrive },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export default function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');

  // Sync input with URL if we are on the search page
  useEffect(() => {
    if (location.pathname === '/search') {
      const params = new URLSearchParams(location.search);
      setSearchTerm(params.get('q') || '');
    } else {
      setSearchTerm('');
    }
  }, [location.pathname, location.search]);

  // Handle manual submit (Enter key)
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.length >= 2) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  // Handle typing with debounce
  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    // Let debounce effect handle navigation
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      // Only auto-navigate if the user typed something and it's >= 2 chars, 
      // or if they are already on the search page and cleared the input
      if (searchTerm.length >= 2) {
        if (location.pathname !== '/search' || new URLSearchParams(location.search).get('q') !== searchTerm) {
          navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
        }
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm, navigate, location.pathname, location.search]);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* ---- Sidebar ---- */}
      <aside
        style={{
          width: 240,
          backgroundColor: 'var(--color-bg-secondary)',
          borderRight: '1px solid var(--color-border)',
          display: 'flex',
          flexDirection: 'column',
          padding: '24px 0',
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
        }}
      >
        {/* Logo */}
        <div style={{ padding: '0 24px', marginBottom: 32 }}>
          <h1
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: 'var(--color-accent)',
              letterSpacing: '-0.5px',
            }}
          >
            Identity Hub
          </h1>
          <p
            style={{
              fontSize: 11,
              color: 'var(--color-text-secondary)',
              marginTop: 2,
            }}
          >
            Client Operations
          </p>
        </div>

        {/* Navigation Links */}
        <nav style={{ flex: 1 }}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 24px',
                fontSize: 14,
                fontWeight: isActive ? 600 : 400,
                color: isActive
                  ? 'var(--color-accent)'
                  : 'var(--color-text-secondary)',
                backgroundColor: isActive
                  ? 'rgba(108, 92, 231, 0.1)'
                  : 'transparent',
                borderRight: isActive
                  ? '3px solid var(--color-accent)'
                  : '3px solid transparent',
                textDecoration: 'none',
                transition: 'all 0.15s ease',
              })}
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

      </aside>

      {/* ---- Main Content Area ---- */}
      <main
        style={{
          flex: 1,
          marginLeft: 240,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        {/* Top Header */}
        <header style={{
          height: 72,
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 32px',
          backgroundColor: 'var(--color-bg-primary)',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}>
          <form onSubmit={handleSearchSubmit} style={{ width: '100%', maxWidth: 600, position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-secondary)' }} />
            <input 
              type="text" 
              placeholder="Search Clients, Content, Accounts..." 
              value={searchTerm}
              onChange={handleSearchChange}
              style={{
                width: '100%',
                padding: '12px 16px 12px 48px',
                borderRadius: 8,
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-bg-secondary)',
                color: 'var(--color-text-primary)',
                fontSize: 14,
                outline: 'none'
              }}
            />
          </form>
        </header>

        <div style={{ padding: 32, flex: 1 }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
