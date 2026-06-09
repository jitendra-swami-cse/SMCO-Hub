import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import SettingsPage from "./pages/SettingsPage";
import CategoriesPage from "./pages/CategoriesPage";
import PlatformsPage from "./pages/PlatformsPage";
import TagsPage from "./pages/TagsPage";
import ClientsPage from "./pages/ClientsPage";
import ClientFormPage from "./pages/ClientFormPage";
import ClientDetailsPage from "./pages/ClientDetailsPage";
import ContentPage from "./pages/ContentPage";
import ContentFormPage from "./pages/ContentFormPage";
import ContentDetailsPage from "./pages/ContentDetailsPage";
import SearchPage from "./pages/SearchPage";
import TimelinePage from "./pages/TimelinePage";
import StoragePage from "./pages/StoragePage";
import BackupsPage from "./pages/BackupsPage";
import RecycleBinPage from "./pages/RecycleBinPage";
import SystemInfoPage from "./pages/SystemInfoPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          {/* Main Dashboard */}
          <Route index element={<DashboardPage />} />

          {/* Settings */}
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/settings/categories" element={<CategoriesPage />} />
          <Route path="/settings/platforms" element={<PlatformsPage />} />
          <Route path="/settings/tags" element={<TagsPage />} />
          <Route path="/settings/backups" element={<BackupsPage />} />
          <Route path="/settings/recycle-bin" element={<RecycleBinPage />} />
          <Route path="/settings/system" element={<SystemInfoPage />} />

          {/* Core Entities */}
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/clients/new" element={<ClientFormPage />} />
          <Route path="/clients/:id/edit" element={<ClientFormPage />} />
          <Route path="/clients/:id" element={<ClientDetailsPage />} />
          
          <Route path="/content" element={<ContentPage />} />
          <Route path="/content/new" element={<ContentFormPage />} />
          <Route path="/content/:id/edit" element={<ContentFormPage />} />
          <Route path="/content/:id" element={<ContentDetailsPage />} />

          <Route path="/search" element={<SearchPage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          
          <Route path="/storage" element={<StoragePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// Simple placeholder for pages not yet built
function PlaceholderPage({ title }) {
  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>{title}</h1>
      <div
        className="glass-card"
        style={{
          padding: 32,
          textAlign: "center",
          color: "var(--color-text-secondary)",
        }}
      >
        <p style={{ fontSize: 40 }}>🚧</p>
        <p style={{ marginTop: 12, fontWeight: 600 }}>Coming Soon</p>
      </div>
    </div>
  );
}
