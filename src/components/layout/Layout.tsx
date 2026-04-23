import Sidebar from "./SideBar";
import TopBar from "./TopBar";

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface LayoutProps {
  children: React.ReactNode;
  breadcrumbs: BreadcrumbItem[];
  user?: {
    name: string;
    role: string;
  };
}

export default function Layout({
  children,
  breadcrumbs,
  user,
}: LayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#0a0e14" }}>
      <Sidebar user={user} />
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar breadcrumbs={breadcrumbs} />
        <main className="flex-1 overflow-auto p-6 pb-12">
          {children}
        </main>
      </div>
    </div>
  );
}