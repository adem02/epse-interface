import { Route, Routes } from "react-router"

function App() {

  return (
    <Routes>
      <Route index element={<div>Home</div>} />
      <Route path="auth" element={<div>Auth</div>} />
      <Route path="dashboard" element={<div>Dashboard</div>} />
      <Route path="projects" element={<div>Projects</div>} />
      <Route path="builder" element={<div>Command Builder</div>} />
      <Route path="templates" element={<div>Templates</div>} />
      <Route path="documentation" element={<div>Documentation</div>} />
      <Route path="settings" element={<div>Settings</div>} />
      <Route path="support" element={<div>Support</div>} />
    </Routes>
  )
}

export default App
