import { Outlet, Link, useLocation } from "react-router";
import { Home, Library, User, BookOpen, Bell, Settings, FileText, Banknote, ScanBarcode, HelpCircle } from "lucide-react";
import { useApp } from "../context/AppContext";

export function Layout() {
  const location = useLocation();
  const { userRole } = useApp();

  const mahasiswaNav = [
    { name: "Beranda", path: "/", icon: Home },
    { name: "Katalog", path: "/catalog", icon: Library },
    { name: "Peminjaman", path: "/loans", icon: BookOpen },
    { name: "Denda", path: "/fines", icon: Banknote },
    { name: "Bantuan", path: "/about", icon: HelpCircle },
    { name: "Profil", path: "/profile", icon: User },
  ];

  const dosenNav = [
    { name: "Beranda", path: "/", icon: Home },
    { name: "Katalog", path: "/catalog", icon: Library },
    { name: "Pengajuan", path: "/request-book", icon: FileText },
    { name: "Bantuan", path: "/about", icon: HelpCircle },
    { name: "Profil", path: "/profile", icon: User },
  ];

  const adminNav = [
    { name: "Dashboard", path: "/admin/dashboard", icon: Home },
    { name: "Scanner", path: "/admin/scanner", icon: ScanBarcode },
    { name: "Katalog", path: "/catalog", icon: Library },
    { name: "Data Pinjaman", path: "/admin/loans", icon: BookOpen },
    { name: "Tracking Denda", path: "/admin/fines-tracking", icon: Banknote },
    { name: "Bantuan", path: "/about", icon: HelpCircle },
    { name: "Profil", path: "/profile", icon: User },
  ];

  const navItems = userRole === "pustakawan" ? adminNav : userRole === "dosen" ? dosenNav : mahasiswaNav;

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-card border-r border-border min-h-screen p-4 sticky top-0">
        <div className="flex items-center justify-between mb-8 px-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <BookOpen className="text-primary-foreground w-5 h-5" />
            </div>
            <h1 className="font-heading font-semibold text-xl text-foreground">PerpusFST</h1>
          </div>
          <Link to="/notifications" className="p-2 rounded-full hover:bg-muted text-muted-foreground relative transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-card"></span>
          </Link>
        </div>
        
        <div className="mb-4 px-3 py-2 bg-muted/50 rounded-lg text-sm text-muted-foreground font-medium uppercase tracking-wider">
          {userRole === "pustakawan" ? "Admin" : userRole === "dosen" ? "Dosen" : "Mahasiswa"}
        </div>
        
        <nav className="flex-1 flex flex-col gap-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path));
            const Icon = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-radius font-medium transition-colors ${
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pb-20 md:pb-0 overflow-y-auto relative">
        {/* Mobile Header */}
        <div className="md:hidden sticky top-0 z-40 bg-card border-b border-border p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <BookOpen className="text-primary-foreground w-5 h-5" />
            </div>
            <h1 className="font-heading font-semibold text-lg text-foreground">LibFST</h1>
          </div>
          <Link to="/notifications" className="p-2 rounded-full bg-muted text-foreground relative hover:bg-muted/80 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-muted"></span>
          </Link>
        </div>

        <div className="max-w-5xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Bottom Navigation for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border flex justify-around p-2 z-50 overflow-x-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path));
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg min-w-[64px] ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? "fill-primary/20" : ""}`} />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}