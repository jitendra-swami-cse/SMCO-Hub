import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { dashboardApi } from '../api';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    dashboardApi.getStats()
      .then(res => {
        setStats(res.data);
      })
      .catch(err => {
        setError('Failed to load dashboard data.');
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div style={{ padding: 40, textAlign: 'center', color: 'var(--color-text-secondary)' }}>Loading Command Center...</div>;
  }

  if (error || !stats) {
    return <div style={{ padding: 40, color: '#d63031' }}>{error}</div>;
  }

  const { kpis, upcomingContent, missedPosts, healthAlerts, platformCompletion, agingContent, recentActivity } = stats;

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 32 }}>
      
      {/* Header */}
      <div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-text-primary)' }}>Operations Command Center</h1>
        <p style={{ color: 'var(--color-text-secondary)', marginTop: 4 }}>Overview of what needs attention today.</p>
      </div>

      {/* Row 1: KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
        <Link to="/clients" className="hover-lift" style={{ textDecoration: 'none', backgroundColor: 'var(--color-bg-primary)', padding: 20, borderRadius: 12, border: '1px solid var(--color-border)' }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-text-primary)' }}>{kpis.activeClients}</div>
          <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 4 }}>Active Clients</div>
        </Link>
        <Link to="/content?status=Approved" className="hover-lift" style={{ textDecoration: 'none', backgroundColor: 'var(--color-bg-primary)', padding: 20, borderRadius: 12, border: '1px solid var(--color-border)' }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-text-primary)' }}>{kpis.readyContent}</div>
          <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 4 }}>Ready Content</div>
        </Link>
        <Link to="/timeline" className="hover-lift" style={{ textDecoration: 'none', backgroundColor: 'var(--color-bg-primary)', padding: 20, borderRadius: 12, border: '1px solid var(--color-border)' }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-text-primary)' }}>{kpis.scheduledThisWeek}</div>
          <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 4 }}>Scheduled This Week</div>
        </Link>
        <Link to="/timeline?status=Missed" className="hover-lift" style={{ textDecoration: 'none', backgroundColor: kpis.missedPosts > 0 ? 'rgba(214, 48, 49, 0.05)' : 'var(--color-bg-primary)', padding: 20, borderRadius: 12, border: kpis.missedPosts > 0 ? '1px solid rgba(214, 48, 49, 0.3)' : '1px solid var(--color-border)' }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: kpis.missedPosts > 0 ? '#d63031' : 'var(--color-text-primary)' }}>{kpis.missedPosts}</div>
          <div style={{ fontSize: 13, color: kpis.missedPosts > 0 ? '#d63031' : 'var(--color-text-secondary)', marginTop: 4 }}>Missed Posts</div>
        </Link>
        <Link to="/storage" className="hover-lift" style={{ textDecoration: 'none', backgroundColor: 'var(--color-bg-primary)', padding: 20, borderRadius: 12, border: '1px solid var(--color-border)' }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-text-primary)' }}>{kpis.storageUsed}</div>
          <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 4 }}>Storage Used</div>
        </Link>
      </div>

      {/* Row 2: Upcoming Content */}
      <div style={{ backgroundColor: 'var(--color-bg-primary)', borderRadius: 12, border: '1px solid var(--color-border)', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-text-primary)' }}>Upcoming Content</h2>
          <Link to="/timeline" style={{ fontSize: 13, color: 'var(--color-accent)', textDecoration: 'none' }}>View Timeline →</Link>
        </div>
        <div style={{ padding: 20 }}>
          {upcomingContent.length === 0 ? (
             <div style={{ color: 'var(--color-text-secondary)', fontSize: 14 }}>No upcoming content scheduled.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {upcomingContent.map(post => (
                <div key={`${post.contentId}-${post.platformId}`} onClick={() => navigate(`/content/${post.contentId}`)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', backgroundColor: 'var(--color-bg-secondary)', borderRadius: 8, cursor: 'pointer' }} className="hover-lift">
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)' }}>{post.title}</div>
                    <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 4 }}>{post.clientName}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--color-text-secondary)' }}>
                      <span>{post.platformIcon}</span> {post.platformName}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-primary)', width: 100, textAlign: 'right' }}>
                      {new Date(post.scheduledDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Row 3: Health & Platform Completion */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Health */}
        <div style={{ backgroundColor: 'var(--color-bg-primary)', borderRadius: 12, border: '1px solid var(--color-border)', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border)' }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-text-primary)' }}>Clients Requiring Attention (Health &lt; 5)</h2>
          </div>
          <div style={{ padding: 20 }}>
            {healthAlerts.length === 0 ? (
              <div style={{ color: 'var(--color-text-secondary)', fontSize: 14 }}>All clients are healthy.</div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  {healthAlerts.map(alert => (
                    <tr key={alert.clientId} onClick={() => navigate(`/clients/${alert.clientId}`)} style={{ cursor: 'pointer', borderBottom: '1px solid var(--color-border)' }} className="hover-row">
                      <td style={{ padding: '12px 0', fontSize: 14, color: 'var(--color-text-primary)', fontWeight: 500 }}>{alert.name}</td>
                      <td style={{ padding: '12px 0', fontSize: 14, color: '#d63031', textAlign: 'right', fontWeight: 600 }}>{alert.score}/10</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Platform Completion */}
        <div style={{ backgroundColor: 'var(--color-bg-primary)', borderRadius: 12, border: '1px solid var(--color-border)', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border)' }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-text-primary)' }}>Platform Completion Summary</h2>
          </div>
          <div style={{ padding: 20 }}>
             <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  {platformCompletion.map(p => (
                    <tr key={p.name} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td style={{ padding: '12px 0', fontSize: 14, color: 'var(--color-text-primary)' }}>{p.name} Accounts</td>
                      <td style={{ padding: '12px 0', fontSize: 14, color: 'var(--color-text-secondary)', textAlign: 'right' }}>{p.configured} / {p.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>
        </div>
      </div>

      {/* Row 4: Aging & Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Content Aging */}
        <div style={{ backgroundColor: 'var(--color-bg-primary)', borderRadius: 12, border: '1px solid var(--color-border)', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border)' }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-text-primary)' }}>Content Aging (Awaiting Upload)</h2>
          </div>
          <div style={{ padding: 20 }}>
             <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  {agingContent.map(age => (
                    <tr key={age.label} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td style={{ padding: '12px 0', fontSize: 14, color: 'var(--color-text-primary)' }}>{age.label}</td>
                      <td style={{ padding: '12px 0', fontSize: 14, color: 'var(--color-text-secondary)', textAlign: 'right' }}>{age.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div style={{ backgroundColor: 'var(--color-bg-primary)', borderRadius: 12, border: '1px solid var(--color-border)', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border)' }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-text-primary)' }}>Recent Activity</h2>
          </div>
          <div style={{ padding: 20 }}>
            {recentActivity.length === 0 ? (
               <div style={{ color: 'var(--color-text-secondary)', fontSize: 14 }}>No recent activity.</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {recentActivity.map(act => (
                  <div key={act._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text-primary)' }}>{act.type}</div>
                      <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 2 }}>{act.description}</div>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
                      {new Date(act.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Row 5: Quick Actions */}
      <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
        <Link to="/clients/new" className="hover-lift" style={{ textDecoration: 'none', backgroundColor: 'var(--color-accent)', color: 'white', padding: '12px 24px', borderRadius: 8, fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
          + Add Client
        </Link>
        <Link to="/content/new" className="hover-lift" style={{ textDecoration: 'none', backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)', padding: '12px 24px', borderRadius: 8, fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
          + Add Content
        </Link>
        <Link to="/clients" className="hover-lift" style={{ textDecoration: 'none', backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)', padding: '12px 24px', borderRadius: 8, fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
          + Add Note
        </Link>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .hover-lift {
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .hover-lift:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .hover-row:hover {
          background-color: var(--color-bg-secondary);
        }
      `}} />
    </div>
  );
}
