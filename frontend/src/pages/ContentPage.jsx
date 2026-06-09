import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { contentApi } from "../api";

export default function ContentPage() {
  const [contents, setContents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchContent = async () => {
    try {
      setIsLoading(true);
      const res = await contentApi.getAll();
      setContents(res.data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to move this content to the recycle bin?")) return;
    try {
      await contentApi.delete(id);
      fetchContent();
    } catch (err) {
      alert(err.message);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Received":
        return "#0984e3"; // Blue
      case "Approved":
        return "#fdcb6e"; // Amber
      case "Uploaded":
        return "#00b894"; // Green
      case "Archived":
        return "#636e72"; // Gray
      case "Recycle Bin":
        return "#d63031"; // Red
      default:
        return "#b2bec3";
    }
  };

  const getTypeBadge = (type) => {
    return (
      <span
        style={{
          padding: "4px 8px",
          borderRadius: 4,
          fontSize: 12,
          fontWeight: 500,
          backgroundColor: "var(--color-bg-secondary)",
          color: "var(--color-text-primary)",
          border: "1px solid var(--color-border)",
        }}
      >
        {type}
      </span>
    );
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.5px" }}>Content</h1>
          <p style={{ color: "var(--color-text-secondary)", fontSize: 14 }}>Manage content pipeline across all platforms</p>
        </div>
        <Link
          to="/content/new"
          style={{
            backgroundColor: "var(--color-primary)",
            color: "white",
            padding: "8px 16px",
            borderRadius: 6,
            textDecoration: "none",
            fontWeight: 500,
            fontSize: 14,
          }}
        >
          + Add Content
        </Link>
      </div>

      {error && <div style={{ padding: 12, backgroundColor: "rgba(214, 48, 49, 0.1)", color: "#d63031", borderRadius: 6, marginBottom: 16 }}>{error}</div>}

      {isLoading ? (
        <div style={{ padding: 40, textAlign: "center", color: "var(--color-text-secondary)" }}>Loading content...</div>
      ) : contents.length === 0 ? (
        <div style={{ padding: 40, textAlign: "center", backgroundColor: "var(--color-bg-card)", borderRadius: 10, border: "1px solid var(--color-border)" }}>
          <p style={{ color: "var(--color-text-secondary)", marginBottom: 16 }}>No content found.</p>
          <Link to="/content/new" style={{ color: "var(--color-primary)", textDecoration: "none", fontWeight: 500 }}>
            Create your first piece of content
          </Link>
        </div>
      ) : (
        <div style={{ overflowX: "auto", backgroundColor: "var(--color-bg-card)", borderRadius: 10, border: "1px solid var(--color-border)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <th style={{ padding: "12px 16px", fontWeight: 600, color: "var(--color-text-secondary)", fontSize: 12, textTransform: "uppercase" }}>Title</th>
                <th style={{ padding: "12px 16px", fontWeight: 600, color: "var(--color-text-secondary)", fontSize: 12, textTransform: "uppercase" }}>
                  Client
                </th>
                <th style={{ padding: "12px 16px", fontWeight: 600, color: "var(--color-text-secondary)", fontSize: 12, textTransform: "uppercase" }}>Type</th>
                <th style={{ padding: "12px 16px", fontWeight: 600, color: "var(--color-text-secondary)", fontSize: 12, textTransform: "uppercase" }}>
                  Platforms
                </th>
                <th style={{ padding: "12px 16px", fontWeight: 600, color: "var(--color-text-secondary)", fontSize: 12, textTransform: "uppercase" }}>
                  Approval
                </th>
                <th style={{ padding: "12px 16px", fontWeight: 600, color: "var(--color-text-secondary)", fontSize: 12, textTransform: "uppercase" }}>
                  Next Scheduled
                </th>
                <th style={{ padding: "12px 16px", fontWeight: 600, color: "var(--color-text-secondary)", fontSize: 12, textTransform: "uppercase" }}>
                  Uploaded
                </th>
                <th style={{ padding: "12px 16px", fontWeight: 600, color: "var(--color-text-secondary)", fontSize: 12, textTransform: "uppercase" }}>
                  Received
                </th>
                <th
                  style={{
                    padding: "12px 16px",
                    fontWeight: 600,
                    color: "var(--color-text-secondary)",
                    fontSize: 12,
                    textTransform: "uppercase",
                    textAlign: "right",
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {contents.map((content) => {
                const platforms = content.platforms || [];
                // Determine next scheduled date
                const scheduledDates = platforms
                  .filter((p) => p.status === "Scheduled" && p.scheduledDate)
                  .map((p) => new Date(p.scheduledDate).getTime())
                  .sort((a, b) => a - b);
                const nextScheduled = scheduledDates.length > 0 ? new Date(scheduledDates[0]) : null;

                // Determine uploaded platforms
                const uploadedPlatforms = platforms.filter((p) => p.status === "Uploaded").map((p) => p.platformId?.name).filter(Boolean);

                return (
                  <tr key={content._id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                    <td style={{ padding: "12px 16px", fontWeight: 500 }}>
                      <Link to={`/content/${content._id}`} style={{ color: "var(--color-text-primary)", textDecoration: "none" }}>
                        {content.title}
                      </Link>
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: 14 }}>
                      <Link to={`/clients/${content.clientId?._id}`} style={{ color: "var(--color-accent)", textDecoration: "none", fontWeight: 500 }}>
                        {content.clientId?.personalInfo?.fullName || "Unknown"}
                      </Link>
                    </td>
                    <td style={{ padding: "12px 16px" }}>{getTypeBadge(content.type)}</td>
                    <td style={{ padding: "12px 16px", fontSize: 14 }}>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        {platforms.length > 0 ? (
                          platforms.map((p, idx) => (
                            <span key={p.platformId?._id || idx} title={p.platformId?.name}>
                              {p.platformId?.icon || "📱"} {p.platformId?.name || "Unknown"}
                              {idx < platforms.length - 1 ? "," : ""}
                            </span>
                          ))
                        ) : (
                          <span style={{ color: "var(--color-text-secondary)", fontSize: 14 }}>—</span>
                        )}
                      </div>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span
                        style={{
                          padding: "4px 8px",
                          borderRadius: 4,
                          fontSize: 12,
                          fontWeight: 500,
                          backgroundColor: `${getStatusColor(content.globalStatus)}20`,
                          color: getStatusColor(content.globalStatus),
                        }}
                      >
                        {content.globalStatus}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: 14, color: nextScheduled ? "var(--color-text-primary)" : "var(--color-text-secondary)" }}>
                      {nextScheduled ? nextScheduled.toLocaleDateString() : "—"}
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: 14, color: uploadedPlatforms.length > 0 ? "#00b894" : "var(--color-text-secondary)" }}>
                      {uploadedPlatforms.length > 0 ? uploadedPlatforms.join(", ") : "—"}
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: 14, color: "var(--color-text-secondary)" }}>
                      {new Date(content.receivedDate).toLocaleDateString()}
                    </td>
                    <td style={{ padding: "12px 16px", textAlign: "right" }}>
                      <Link to={`/content/${content._id}`} style={{ color: "var(--color-text-secondary)", marginRight: 12, textDecoration: "none" }}>
                        👁️
                      </Link>
                      <Link to={`/content/${content._id}/edit`} style={{ color: "var(--color-text-secondary)", marginRight: 12, textDecoration: "none" }}>
                        ✏️
                      </Link>
                      <button
                        onClick={() => handleDelete(content._id)}
                        style={{ background: "none", border: "none", color: "#d63031", cursor: "pointer", padding: 0 }}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
