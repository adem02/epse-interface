import { Navigate, Route, Routes } from "react-router"
import AuthPage from "./pages/Auth.page"
import Layout from "./components/layout/Layout"
import DashboardPage from "./pages/Dashboard.page"
import ProjectsPage from "./pages/Projects.page"
import ProjectDetailPage from "./pages/ProjectDetail.page"
import CommandBuilderPage from "./pages/CommandBuilder.page"
import TemplatesPage from "./pages/Templates.page"
import DocumentationPage from "./pages/Documentation.page"

function App() {
  return (
    <Routes>
      <Route index element={<Navigate to="/auth" replace />} />
      <Route path="auth" element={<AuthPage />} />
      <Route path="dashboard" element={
        <Layout breadcrumbs={[{ label: "Project Dashboard" }]} searchPlaceholder="Search parameters...">
          <DashboardPage />
        </Layout>
      } />
      <Route path="projects" element={
        <Layout breadcrumbs={[{ label: "Projects" }]} searchPlaceholder="Filter by project name...">
          <ProjectsPage />
        </Layout>
      } />

      <Route path="projects/:id" element={
        <Layout breadcrumbs={[{ label: "Projects", to: "/projects" }, { label: "my-api-service" }]}>
          <ProjectDetailPage />
        </Layout>
      } />
      
      <Route path="builder" element={
        <Layout breadcrumbs={[{ label: "Command Builder" }]}>
          <CommandBuilderPage />
        </Layout>
      } />

      <Route path="templates" element={
        <Layout breadcrumbs={[{ label: "Gallery" }, { label: "Templates" }]} searchPlaceholder="Search blueprints...">
          <TemplatesPage />
        </Layout>
      } />

      <Route path="documentation" element={
        <Layout breadcrumbs={[{ label: "Documentation" }]} searchPlaceholder="Search documentation...">
          <DocumentationPage />
        </Layout>
      } />
    </Routes>
  )
}

export default App