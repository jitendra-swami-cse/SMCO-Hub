import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { timelineApi, clientsApi, platformsApi } from '../api';

export default function TimelinePage() {
  const navigate = useNavigate();
  
  const [events, setEvents] = useState([]);
  const [clients, setClients] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filters
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  // Fetch initial lookup data
  useEffect(() => {
    Promise.all([clientsApi.getAll(), platformsApi.getAll()])
      .then(([clientsRes, platformsRes]) => {
        setClients(clientsRes.data);
        setPlatforms(platformsRes.data);
      })
      .catch(console.error);
  }, []);

  // Fetch events based on filters
  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const filters = {};
        if (selectedClient) filters.clientId = selectedClient;
        if (selectedPlatform) filters.platformId = selectedPlatform;
        if (selectedStatus) filters.status = selectedStatus;

        const res = await timelineApi.getEvents(filters);
        setEvents(res.data);
      } catch (err) {
        console.error('Failed to load timeline events', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, [selectedClient, selectedPlatform, selectedStatus]);

  // Derived state: Missed vs Upcoming/Past
  const { missedEvents, groupedAgenda } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const missed = [];
    const agendaMap = new Map(); // timestamp -> array of events

    events.forEach(event => {
      const eventDate = new Date(event.scheduledDate);
      eventDate.setHours(0, 0, 0, 0);

      // Missed Logic: Scheduled in the past AND not Uploaded
      if (eventDate < today && event.status !== 'Uploaded') {
        missed.push(event);
      } else {
        // Group by Date for Agenda
        const timeKey = eventDate.getTime();
        if (!agendaMap.has(timeKey)) {
          agendaMap.set(timeKey, []);
        }
        agendaMap.get(timeKey).push(event);
      }
    });

    // Sort agenda keys chronologically
    const sortedKeys = Array.from(agendaMap.keys()).sort((a, b) => a - b);
    const agenda = sortedKeys.map(key => ({
      date: new Date(key),
      events: agendaMap.get(key)
    }));

    return { missedEvents: missed, groupedAgenda: agenda };
  }, [events]);

  const handleEventClick = (contentId) => {
    navigate(`/content/${contentId}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Uploaded': return { bg: '#00b89420', text: '#00b894' };
      case 'Scheduled': return { bg: '#0984e320', text: '#0984e3' };
      case 'Approved': return { bg: '#fdcb6e20', text: '#d35400' };
      case 'Pending':
      default: return { bg: '#636e7220', text: '#636e72' };
    }
  };

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-text-primary)' }}>Timeline & Agenda</h1>
          <p style={{ color: 'var(--color-text-secondary)', marginTop: 4 }}>Track scheduled content across all platforms.</p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 32, padding: 16, backgroundColor: 'var(--color-bg-secondary)', borderRadius: 12, border: '1px solid var(--color-border)' }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 6 }}>Client</label>
          <select value={selectedClient} onChange={e => setSelectedClient(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-text-primary)' }}>
            <option value="">All Clients</option>
            {clients.map(c => <option key={c._id} value={c._id}>{c.personalInfo.fullName}</option>)}
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 6 }}>Platform</label>
          <select value={selectedPlatform} onChange={e => setSelectedPlatform(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-text-primary)' }}>
            <option value="">All Platforms</option>
            {platforms.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 6 }}>Status</label>
          <select value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-text-primary)' }}>
            <option value="">All Statuses</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Uploaded">Uploaded</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div style={{ padding: 40, textAlign: 'center', color: 'var(--color-text-secondary)' }}>Loading Timeline...</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          
          {/* Missed Posts Panel */}
          {missedEvents.length > 0 && (
            <div style={{ backgroundColor: 'rgba(214, 48, 49, 0.05)', border: '1px solid rgba(214, 48, 49, 0.2)', borderRadius: 12, padding: 24 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#d63031', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                ⚠️ Missed Posts ({missedEvents.length})
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
                {missedEvents.map(event => (
                  <div 
                    key={`${event.contentId}-${event.platformId}`}
                    onClick={() => handleEventClick(event.contentId)}
                    style={{ backgroundColor: 'var(--color-bg-primary)', padding: 16, borderRadius: 8, border: '1px solid rgba(214, 48, 49, 0.2)', cursor: 'pointer', transition: 'transform 0.15s', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}
                    className="hover-lift"
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{event.title}</div>
                      <span title={event.platformName}>{event.platformIcon}</span>
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 4 }}>{event.clientName}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                      <span style={{ fontSize: 12, color: '#d63031', fontWeight: 600 }}>Due: {new Date(event.scheduledDate).toLocaleDateString()}</span>
                      <span style={{ fontSize: 11, padding: '2px 6px', borderRadius: 4, backgroundColor: '#d6303120', color: '#d63031' }}>{event.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Agenda View */}
          {groupedAgenda.length === 0 ? (
            <div style={{ padding: 40, textAlign: 'center', backgroundColor: 'var(--color-bg-card)', borderRadius: 10, border: '1px solid var(--color-border)' }}>
              <p style={{ color: 'var(--color-text-secondary)' }}>No scheduled events found for the selected filters.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              {groupedAgenda.map((group) => {
                const isPast = group.date < new Date(new Date().setHours(0,0,0,0));
                const isToday = group.date.getTime() === new Date(new Date().setHours(0,0,0,0)).getTime();

                return (
                  <div key={group.date.getTime()} style={{ opacity: isPast ? 0.7 : 1 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 16, paddingBottom: 8, borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: 8 }}>
                      {group.date.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
                      {isToday && <span style={{ fontSize: 11, backgroundColor: 'var(--color-accent)', color: 'white', padding: '2px 8px', borderRadius: 12 }}>Today</span>}
                    </h3>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
                      {group.events.map(event => {
                        const statusColors = getStatusColor(event.status);
                        return (
                          <div 
                            key={`${event.contentId}-${event.platformId}`}
                            onClick={() => handleEventClick(event.contentId)}
                            style={{ backgroundColor: 'var(--color-bg-primary)', padding: 16, borderRadius: 8, border: '1px solid var(--color-border)', cursor: 'pointer', transition: 'transform 0.15s', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}
                            className="hover-lift"
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)' }}>{event.title}</div>
                              <span title={event.platformName}>{event.platformIcon}</span>
                            </div>
                            <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 4 }}>{event.clientName}</div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                              <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
                                {new Date(event.scheduledDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                              <span style={{ fontSize: 11, padding: '2px 6px', borderRadius: 4, backgroundColor: statusColors.bg, color: statusColors.text, fontWeight: 500 }}>
                                {event.status}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      )}
      
      {/* Global Style for hover-lift */}
      <style dangerouslySetInnerHTML={{__html: `
        .hover-lift:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.05) !important;
          border-color: var(--color-accent) !important;
        }
      `}} />
    </div>
  );
}
