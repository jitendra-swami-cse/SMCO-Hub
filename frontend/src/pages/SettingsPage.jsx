import { Link } from 'react-router-dom';

export default function SettingsPage() {
  const linkStyle = {
    display: 'block',
    padding: '16px 20px',
    backgroundColor: 'var(--color-bg-card)',
    border: '1px solid var(--color-border)',
    borderRadius: 10,
    color: 'var(--color-text-primary)',
    textDecoration: 'none',
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 8,
    transition: 'background-color 0.15s ease',
  };

  return (
    <div>
      <h1
        style={{
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: '-0.5px',
          marginBottom: 8,
        }}
      >
        Settings
      </h1>
      <p
        style={{
          color: 'var(--color-text-secondary)',
          fontSize: 14,
          marginBottom: 24,
        }}
      >
        Manage your application configuration
      </p>

      <div style={{ maxWidth: 480 }}>
        <Link
          to="/settings/categories"
          style={linkStyle}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = 'var(--color-bg-hover)')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = 'var(--color-bg-card)')
          }
        >
          📂 Categories
          <span
            style={{
              display: 'block',
              fontWeight: 400,
              fontSize: 12,
              color: 'var(--color-text-secondary)',
              marginTop: 2,
            }}
          >
            Organize clients into groups
          </span>
        </Link>

        <Link
          to="/settings/platforms"
          style={linkStyle}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = 'var(--color-bg-hover)')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = 'var(--color-bg-card)')
          }
        >
          📱 Platforms
          <span
            style={{
              display: 'block',
              fontWeight: 400,
              fontSize: 12,
              color: 'var(--color-text-secondary)',
              marginTop: 2,
            }}
          >
            Manage social media platforms
          </span>
        </Link>

        <Link
          to="/settings/tags"
          style={linkStyle}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = 'var(--color-bg-hover)')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = 'var(--color-bg-card)')
          }
        >
          🏷️ Tags
          <span
            style={{
              display: 'block',
              fontWeight: 400,
              fontSize: 12,
              color: 'var(--color-text-secondary)',
              marginTop: 2,
            }}
          >
            Create colored tags for filtering
          </span>
        </Link>

        <Link
          to="/settings/backups"
          style={linkStyle}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = 'var(--color-bg-hover)')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = 'var(--color-bg-card)')
          }
        >
          💾 Backups & Snapshots
          <span
            style={{
              display: 'block',
              fontWeight: 400,
              fontSize: 12,
              color: 'var(--color-text-secondary)',
              marginTop: 2,
            }}
          >
            Manage data backups and monthly snapshots
          </span>
        </Link>

        <Link
          to="/settings/recycle-bin"
          style={linkStyle}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = 'var(--color-bg-hover)')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = 'var(--color-bg-card)')
          }
        >
          🗑️ Recycle Bin
          <span
            style={{
              display: 'block',
              fontWeight: 400,
              fontSize: 12,
              color: 'var(--color-text-secondary)',
              marginTop: 2,
            }}
          >
            Recover or permanently delete removed items
          </span>
        </Link>

        <Link
          to="/settings/system"
          style={linkStyle}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = 'var(--color-bg-hover)')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = 'var(--color-bg-card)')
          }
        >
          ℹ️ System Information
          <span
            style={{
              display: 'block',
              fontWeight: 400,
              fontSize: 12,
              color: 'var(--color-text-secondary)',
              marginTop: 2,
            }}
          >
            View application version and database health
          </span>
        </Link>
      </div>
    </div>
  );
}
