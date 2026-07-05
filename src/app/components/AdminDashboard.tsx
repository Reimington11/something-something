import { BookOpen, Users, Banknote, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { useApp } from "../context/AppContext";

export function AdminDashboard() {
  const { books, loans } = useApp();
  
  const totalBooks = books.length;
  const activeLoansCount = loans.filter(l => l.status === "active").length;
  
  return (
    <div className="p-4 md:p-8 space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-foreground font-heading">Dashboard Pustakawan</h1>
        <p className="text-muted-foreground mt-1">Ringkasan aktivitas dan metrik perpustakaan hari ini.</p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border p-4 rounded-xl">
          <div className="flex justify-between items-start mb-2">
            <div className="bg-primary/10 p-2 rounded-lg text-primary">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">{totalBooks}</p>
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Total Judul Buku</p>
        </div>
        
        <div className="bg-card border border-border p-4 rounded-xl">
          <div className="flex justify-between items-start mb-2">
            <div className="bg-blue-500/10 p-2 rounded-lg text-blue-500">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">1,204</p>
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Anggota Aktif</p>
        </div>

        <div className="bg-card border border-border p-4 rounded-xl">
          <div className="flex justify-between items-start mb-2">
            <div className="bg-orange-500/10 p-2 rounded-lg text-orange-500">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">{activeLoansCount}</p>
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Peminjaman Aktif</p>
        </div>

        <div className="bg-card border border-border p-4 rounded-xl">
          <div className="flex justify-between items-start mb-2">
            <div className="bg-destructive/10 p-2 rounded-lg text-destructive">
              <Banknote className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">12</p>
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Denda Belum Dibayar</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border flex justify-between items-center bg-muted/30">
            <h2 className="font-bold text-foreground">Aksi Cepat</h2>
          </div>
          <div className="p-4 flex flex-col gap-2">
            <Link to="/admin/scanner" className="flex items-center justify-between p-3 bg-background border border-border rounded-lg hover:border-primary hover:text-primary transition-colors group">
              <span className="font-medium">Scan QR Peminjaman/Pengembalian</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
            <Link to="/catalog" className="flex items-center justify-between p-3 bg-background border border-border rounded-lg hover:border-primary hover:text-primary transition-colors group">
              <span className="font-medium">Kelola Katalog Buku</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border flex justify-between items-center bg-muted/30">
            <h2 className="font-bold text-foreground">Peminjaman Terbaru</h2>
          </div>
          <div className="flex-1 overflow-y-auto max-h-[200px] p-0">
            {loans.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground text-sm">Belum ada aktivitas.</div>
            ) : (
              <ul className="divide-y divide-border">
                {loans.slice().reverse().map(loan => {
                  const book = books.find(b => b.id === loan.bookId);
                  return (
                    <li key={loan.id} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                      <div>
                        <p className="font-medium text-sm text-foreground line-clamp-1">{book?.title}</p>
                        <p className="text-xs text-muted-foreground">ID Transaksi: {loan.id}</p>
                      </div>
                      <span className={`text-[10px] px-2 py-1 rounded font-bold uppercase ${
                        loan.status === "active" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                      }`}>
                        {loan.status}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}