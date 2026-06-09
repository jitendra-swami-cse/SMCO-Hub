import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { contentApi, platformsApi } from "../api";

export default function ContentDetailsPage() {
  const { id } = useParams();
  const [content, setContent] = useState(null);
  const [allPlatforms, setAllPlatforms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // File upload state
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  // Platform add state
  const [isAddingPlatform, setIsAddingPlatform] = useState(false);
  const [selectedPlatformId, setSelectedPlatformId] = useState("");

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [contentRes, platformsRes] = await Promise.all([contentApi.getById(id), platformsApi.getAll()]);
      setContent(contentRes.data);
      setAllPlatforms(platformsRes.data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  // ---- MEDIA FILES LOGIC ----
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      await contentApi.files.upload(id, formData);
      await fetchData(); // Refresh data to get new file list
    } catch (err) {
      alert("Upload failed: " + err.message);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDeleteFile = async (filePath) => {
    if (!window.confirm("Are you sure you want to delete this file from disk and database?")) return;
    try {
      await contentApi.files.delete(id, filePath);
      await fetchData();
    } catch (err) {
      alert("Delete failed: " + err.message);
    }
  };

  // ---- PUBLISHING MATRIX LOGIC ----
  const handleAddPlatform = async (e) => {
    e.preventDefault();
    if (!selectedPlatformId) return;

    try {
      await contentApi.platforms.add(id, { platformId: selectedPlatformId });
      setIsAddingPlatform(false);
      setSelectedPlatformId("");
      await fetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleUpdatePlatformStatus = async (platformDocId, status) => {
    try {
      await contentApi.platforms.update(id, platformDocId, { status });
      await fetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleUpdatePlatformUrl = async (platformDocId, postUrl) => {
    try {
      await contentApi.platforms.update(id, platformDocId, { postUrl });
      await fetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeletePlatform = async (platformDocId) => {
    if (!window.confirm("Remove this platform from the matrix?")) return;
    try {
      await contentApi.platforms.delete(id, platformDocId);
      await fetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Received":
        return "#0984e3";
      case "Approved":
        return "#fdcb6e";
      case "Uploaded":
        return "#00b894";
      case "Archived":
        return "#636e72";
      case "Recycle Bin":
        return "#d63031";
      default:
        return "#b2bec3";
    }
  };

  const getPlatformStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "#636e72";
      case "Approved":
        return "#fdcb6e";
      case "Scheduled":
        return "#0984e3";
      case "Uploaded":
        return "#00b894";
      default:
        return "#b2bec3";
    }
  };

  if (isLoading) {
    return <div style={{ padding: 40, textAlign: "center", color: "var(--color-text-secondary)" }}>Loading details...</div>;
  }

  if (error || !content) {
    return (
      <div style={{ padding: 20 }}>
        <Link to="/content" style={{ color: "var(--color-primary)" }}>
          ← Back to Content List
        </Link>
        <div style={{ padding: 20, color: "#d63031", backgroundColor: "rgba(214,48,49,0.1)", borderRadius: 8, marginTop: 16 }}>
          {error || "Content not found"}
        </div>
      </div>
    );
  }

  // Available platforms to add (exclude those already in the matrix)
  const availablePlatforms = allPlatforms.filter((p) => !content.platforms.some((cp) => cp.platformId._id === p._id));

  return (
    <div>
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <Link to="/content" style={{ color: "var(--color-text-secondary)", textDecoration: "none", fontSize: 24 }}>
            ←
          </Link>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0, display: "flex", alignItems: "center", gap: 12 }}>
              {content.title}
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
            </h1>
            <p style={{ margin: "4px 0 0 0", color: "var(--color-text-secondary)", fontSize: 14 }}>
              Client:{" "}
              <Link to={`/clients/${content.clientId?._id}`} style={{ color: "var(--color-accent)", textDecoration: "none" }}>
                {content.clientId?.personalInfo?.fullName || "Unknown"}
              </Link>
              <span style={{ margin: "0 8px" }}>|</span>
              Type: {content.type}
            </p>
          </div>
        </div>
        <Link
          to={`/content/${content._id}/edit`}
          style={{
            padding: "8px 16px",
            borderRadius: 6,
            backgroundColor: "var(--color-bg-secondary)",
            border: "1px solid var(--color-border)",
            color: "var(--color-text-primary)",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          Edit Details
        </Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
        {/* OVERVIEW CARD */}
        <div className="glass-card" style={{ padding: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, borderBottom: "1px solid var(--color-border)", paddingBottom: 8 }}>Overview</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 14 }}>
            <div>
              <span style={{ color: "var(--color-text-secondary)", display: "block", marginBottom: 4 }}>Received Date</span>
              <span style={{ fontWeight: 500 }}>{content.receivedDate ? new Date(content.receivedDate).toLocaleDateString() : "—"}</span>
            </div>
            <div>
              <span style={{ color: "var(--color-text-secondary)", display: "block", marginBottom: 4 }}>Description / Notes</span>
              <span style={{ whiteSpace: "pre-wrap", lineHeight: 1.5 }}>{content.description || "No description provided."}</span>
            </div>
          </div>
        </div>

        {/* MEDIA FILES CARD */}
        <div className="glass-card" style={{ padding: 24 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
              borderBottom: "1px solid var(--color-border)",
              paddingBottom: 8,
            }}
          >
            <h2 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Media Files</h2>
            <div>
              <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                style={{
                  padding: "6px 12px",
                  borderRadius: 4,
                  border: "none",
                  backgroundColor: "var(--color-primary)",
                  color: "white",
                  fontWeight: 500,
                  cursor: isUploading ? "not-allowed" : "pointer",
                  fontSize: 13,
                  opacity: isUploading ? 0.7 : 1,
                }}
              >
                {isUploading ? "Uploading..." : "+ Upload File"}
              </button>
            </div>
          </div>

          {content.mediaFiles && content.mediaFiles.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {content.mediaFiles.map((file, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 12px",
                    backgroundColor: "var(--color-bg-secondary)",
                    borderRadius: 6,
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <div style={{ overflow: "hidden" }}>
                    <div style={{ fontSize: 14, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{file.fileName}</div>
                    <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginTop: 2 }}>
                      {(file.size / 1024 / 1024).toFixed(2)} MB • {file.path.split("/").pop()}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <a
                      href={`/storage/${file.path}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{ padding: "6px", cursor: "pointer", color: "var(--color-text-secondary)", textDecoration: "none" }}
                      title="View / Download"
                    >
                      ⬇️
                    </a>
                    <button
                      onClick={() => handleDeleteFile(file.path)}
                      style={{ background: "none", border: "none", padding: "6px", cursor: "pointer", color: "#d63031" }}
                      title="Delete File"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "20px 0", color: "var(--color-text-secondary)", fontSize: 14 }}>No media files uploaded yet.</div>
          )}
        </div>
      </div>

      {/* PUBLISHING MATRIX CARD */}
      <div className="glass-card" style={{ padding: 24 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
            borderBottom: "1px solid var(--color-border)",
            paddingBottom: 8,
          }}
        >
          <h2 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Publishing Matrix</h2>

          {!isAddingPlatform ? (
            <button
              onClick={() => setIsAddingPlatform(true)}
              style={{
                padding: "6px 12px",
                borderRadius: 4,
                border: "1px solid var(--color-border)",
                backgroundColor: "var(--color-bg-secondary)",
                color: "var(--color-text-primary)",
                fontWeight: 500,
                cursor: "pointer",
                fontSize: 13,
              }}
            >
              + Add Platform
            </button>
          ) : (
            <form onSubmit={handleAddPlatform} style={{ display: "flex", gap: 8 }}>
              <select
                value={selectedPlatformId}
                onChange={(e) => setSelectedPlatformId(e.target.value)}
                style={{
                  padding: "6px",
                  borderRadius: 4,
                  border: "1px solid var(--color-border)",
                  backgroundColor: "var(--color-bg-primary)",
                  color: "var(--color-text-primary)",
                  fontSize: 13,
                }}
              >
                <option value="">Select platform...</option>
                {availablePlatforms.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                disabled={!selectedPlatformId}
                style={{
                  padding: "6px 12px",
                  borderRadius: 4,
                  border: "none",
                  backgroundColor: "var(--color-primary)",
                  color: "white",
                  fontSize: 13,
                  cursor: selectedPlatformId ? "pointer" : "not-allowed",
                }}
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => setIsAddingPlatform(false)}
                style={{
                  padding: "6px 12px",
                  borderRadius: 4,
                  border: "none",
                  backgroundColor: "transparent",
                  color: "var(--color-text-secondary)",
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </form>
          )}
        </div>

        {content.platforms && content.platforms.length > 0 ? (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--color-border)", color: "var(--color-text-secondary)" }}>
                  <th style={{ padding: "12px 8px", fontWeight: 500 }}>Platform</th>
                  <th style={{ padding: "12px 8px", fontWeight: 500 }}>Status</th>
                  <th style={{ padding: "12px 8px", fontWeight: 500 }}>Scheduled Date</th>
                  <th style={{ padding: "12px 8px", fontWeight: 500 }}>Uploaded Date</th>
                  <th style={{ padding: "12px 8px", fontWeight: 500 }}>Post URL</th>
                  <th style={{ padding: "12px 8px", fontWeight: 500, textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {content.platforms.map((p) => (
                  <tr key={p._id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                    <td style={{ padding: "12px 8px", fontWeight: 500 }}>
                      <span style={{ marginRight: 8 }}>{p.platformId?.icon || "📱"}</span>
                      {p.platformId?.name || "Unknown"}
                    </td>
                    <td style={{ padding: "12px 8px" }}>
                      <select
                        value={p.status}
                        onChange={(e) => handleUpdatePlatformStatus(p._id, e.target.value)}
                        style={{
                          padding: "4px 8px",
                          borderRadius: 4,
                          border: "1px solid var(--color-border)",
                          backgroundColor: `${getPlatformStatusColor(p.status)}15`,
                          color: getPlatformStatusColor(p.status),
                          fontWeight: 500,
                          fontSize: 13,
                        }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Scheduled">Scheduled</option>
                        <option value="Uploaded">Uploaded</option>
                      </select>
                    </td>
                    <td style={{ padding: "12px 8px", color: "var(--color-text-secondary)" }}>
                      {p.scheduledDate ? new Date(p.scheduledDate).toLocaleDateString() : "—"}
                    </td>
                    <td style={{ padding: "12px 8px", color: "var(--color-text-secondary)" }}>
                      {p.uploadedDate ? new Date(p.uploadedDate).toLocaleDateString() : "—"}
                    </td>
                    <td style={{ padding: "12px 8px" }}>
                      <input
                        type="url"
                        placeholder="https://"
                        defaultValue={p.postUrl || ""}
                        onBlur={(e) => {
                          if (e.target.value !== p.postUrl) {
                            handleUpdatePlatformUrl(p._id, e.target.value);
                          }
                        }}
                        style={{
                          padding: "6px 8px",
                          borderRadius: 4,
                          border: "1px solid var(--color-border)",
                          backgroundColor: "var(--color-bg-secondary)",
                          color: "var(--color-text-primary)",
                          width: 140,
                          fontSize: 13,
                        }}
                      />
                    </td>
                    <td style={{ padding: "12px 8px", textAlign: "right" }}>
                      {p.postUrl && (
                        <a
                          href={p.postUrl}
                          target="_blank"
                          rel="noreferrer"
                          style={{ color: "var(--color-accent)", marginRight: 12, textDecoration: "none" }}
                          title="Open Post"
                        >
                          🔗
                        </a>
                      )}
                      <button
                        onClick={() => handleDeletePlatform(p._id)}
                        style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: "#d63031" }}
                        title="Remove Platform"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "30px 0", color: "var(--color-text-secondary)" }}>
            No platforms added to the publishing matrix yet.
          </div>
        )}
      </div>
    </div>
  );
}
