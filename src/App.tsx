import { Navigate, Route, Routes } from "react-router"
import AuthPage from "./pages/Auth.page"
import Layout from "./components/layout/Layout"
import DashboardPage from "./pages/Dashboard.page"
import ProjectsPage from "./pages/Projects.page"
import ProjectDetailsPage from "./pages/ProjectDetails.page"
import CommandBuilderPage from "./pages/CommandBuilder.page"
import TemplatesPage from "./pages/Templates.page"
import DocumentationPage from "./pages/Documentation.page"
import NotFoundPage from "./pages/NotFound.page"
import { ProtectedRoutes } from "./components/layout/ProtectedRoutes"
import { PublicOnlyRoute } from "./components/layout/PublicOnlyRoute"
import { useAuth } from "./context/useAuth"

function App() {
  const { session } = useAuth();
  const defaultLandingPath = session ? "/dashboard" : "/documentation";

  return (
    <Routes>
      <Route index element={<Navigate to={defaultLandingPath} replace />} />

      <Route element={<PublicOnlyRoute />}>
        <Route path="auth" element={<AuthPage />} />
      </Route>

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

      <Route element={<ProtectedRoutes />}>
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
          <Layout breadcrumbs={[{ label: "Projects", to: "/projects" }, { label: "Project Details" }]} searchPlaceholder="Search in project...">
            <ProjectDetailsPage />
          </Layout>
        } />
        
        <Route path="builder" element={
          <Layout breadcrumbs={[{ label: "Command Builder" }]}>
            <CommandBuilderPage />
          </Layout>
        } />
      </Route>

      <Route path="*" element={
        <Layout breadcrumbs={[{ label: "404" }, { label: "Not Found" }]} searchPlaceholder="Search a valid route...">
          <NotFoundPage />
        </Layout>
      } />

    </Routes>
  )
}

export default App