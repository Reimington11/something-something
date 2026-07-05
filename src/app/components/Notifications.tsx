import { Bell, CheckCircle2, AlertCircle, Clock, Info } from "lucide-react";
import { Link } from "react-router";
import { useApp } from "../context/AppContext";

export function Notifications() {
  const { loans } = useApp();

  const activeLoans = loans.filter(l => l.status === "active");
  const hasOverdue = activeLoans.some(l => new Date(l.dueDate) < new Date());

  // Mocking some static notifications mixed with dynamic ones based on loans
  const notifications = [
    ...(hasOverdue ? [{
      id: "n1",
      type: "alert",
      title: "Peringatan Keterlambatan",
      message: "Anda memiliki buku yang terlambat dikembalikan. Segera kembalikan untuk menghindari denda tambahan.",
      date: new Date().toISOString(),
      read: false
    }] : []),
    {
      id: "n2",
      type: "info",
      title: "Selamat datang di LibFST",
      message: "Aplikasi Perpustakaan Fakultas Sains dan Teknologi kini hadir dengan fitur baru.",
      date: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      read: true
    },
    {
      id: "n3",
      type: "success",
      title: "Peminjaman Berhasil",
      message: "Buku 'Struktur Data & Algoritma' berhasil dipinjam. Tenggat waktu pengembalian adalah 7 hari.",
      date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      read: true
    }
  ];

  return (
    <div className="p-4 md:p-8 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-heading">Notifikasi</h1>
          <p className="text-muted-foreground mt-1">Pemberitahuan terkait aktivitas perpustakaan Anda.</p>
        </div>
        <button className="text-sm font-medium text-primary hover:underline">
          Tandai semua dibaca
        </button>
      </header>

      <div className="space-y-4">
        {notifications.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Bell className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="font-semibold text-foreground">Belum ada notifikasi</p>
            <p className="text-sm text-muted-foreground mt-1">Saat ini Anda tidak memiliki pemberitahuan baru.</p>
          </div>
        ) : (
          notifications.map(notif => (
            <div 
              key={notif.id} 
              className={`p-4 rounded-xl border flex gap-4 transition-colors ${
                notif.read ? "bg-card border-border" : "bg-primary/5 border-primary/20"
              }`}
            >
              <div className="shrink-0 mt-1">
                {notif.type === "alert" && <AlertCircle className="w-6 h-6 text-destructive" />}
                {notif.type === "success" && <CheckCircle2 className="w-6 h-6 text-green-500" />}
                {notif.type === "info" && <Info className="w-6 h-6 text-blue-500" />}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className={`font-semibold ${notif.read ? "text-foreground" : "text-foreground"}`}>
                    {notif.title}
                  </h3>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(notif.date).toLocaleDateString('id-ID')}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{notif.message}</p>
              </div>
              {!notif.read && (
                <div className="shrink-0 flex items-center">
                  <span className="w-2.5 h-2.5 bg-primary rounded-full"></span>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}