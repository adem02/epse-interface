import { Navigate, Route, Routes } from "react-router"
import AuthPage from "./pages/Auth.page"
import Layout from "./components/layout/Layout"
import ProjectsPage from "./pages/Projects.page"
import ProjectDetailsPage from "./pages/ProjectDetails.page"
import CommandBuilderPage from "./pages/CommandBuilder.page"
import TemplatesPage from "./pages/Templates.page"
import DocumentationPage from "./pages/Documentation.page"
import NotFoundPage from "./pages/NotFound.page"
import { ProtectedRoutes } from "./components/layout/ProtectedRoutes"
import { PublicOnlyRoute } from "./components/layout/PublicOnlyRoute"

function App() {
  return (
    <Routes>
      <Route index element={<Navigate to={'/documentation'} replace />} />

      <Route element={<PublicOnlyRoute />}>
        <Route path="auth" element={<AuthPage />} />
      </Route>

      <Route path="templates" element={
        <Layout breadcrumbs={[{ label: "Gallery" }, { label: "Templates" }]}>
          <TemplatesPage />
        </Layout>
      } />

      <Route path="documentation" element={
        <Layout breadcrumbs={[{ label: "Documentation" }]}>
          <DocumentationPage />
        </Layout>
      } />

      <Route element={<ProtectedRoutes />}>
        <Route path="projects" element={
          <Layout breadcrumbs={[{ label: "Projects" }]}>
            <ProjectsPage />
          </Layout>
        } />

        <Route path="projects/:id" element={
          <Layout breadcrumbs={[{ label: "Projects", to: "/projects" }, { label: "Project Details" }]}>
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
        <Layout breadcrumbs={[{ label: "404" }, { label: "Not Found" }]}>
          <NotFoundPage />
        </Layout>
      } />

    </Routes>
  )
}

export default App