import { Search, Bell, AlertCircle, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useApp } from "../context/AppContext";

export function Home() {
  const navigate = useNavigate();
  const { userRole, loans, books } = useApp();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/catalog");
  };

  const activeLoans = loans.filter(l => l.status === "active");
  const hasOverdue = activeLoans.some(l => new Date(l.dueDate) < new Date());

  const recommendedBooks = books.slice(0, 4);

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8">
      {/* Late Return Alert Banner */}
      {hasOverdue && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 flex items-start gap-3 shadow-sm">
          <AlertCircle className="text-destructive w-5 h-5 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-destructive font-bold text-sm">Peringatan Keterlambatan</h3>
            <p className="text-destructive/90 text-sm mt-1 mb-2">
              Anda memiliki buku yang melewati batas waktu pengembalian. Harap segera kembalikan atau cek denda Anda.
            </p>
            <Link to="/fines" className="text-sm font-bold text-destructive underline">Lihat Detail Denda</Link>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <p className="text-muted-foreground text-sm">Selamat datang,</p>
          <h2 className="font-heading text-2xl font-bold text-foreground capitalize">{userRole || "Mahasiswa"}</h2>
        </div>
        <Link to="/notifications" className="relative p-2 bg-card rounded-full border border-border hover:bg-muted transition-colors">
          <Bell className="w-5 h-5 text-foreground" />
          {hasOverdue && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full"></span>}
        </Link>
      </header>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-muted-foreground" />
        </div>
        <input
          type="text"
          className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm text-foreground"
          placeholder="Cari judul, pengarang, atau ISBN..."
        />
        <button type="submit" className="hidden">Search</button>
      </form>

      {/* Active Borrowing */}
      {userRole !== "pustakawan" && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-lg">Peminjaman Aktif ({activeLoans.length})</h3>
            <Link to="/loans" className="text-primary text-sm font-medium hover:underline">Lihat Semua</Link>
          </div>
          
          {activeLoans.length > 0 ? (
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {activeLoans.map(loan => {
                const book = books.find(b => b.id === loan.bookId);
                if (!book) return null;
                const isOverdue = new Date(loan.dueDate) < new Date();
                
                return (
                  <div key={loan.id} className="bg-card rounded-xl border border-border p-4 flex gap-4 items-center min-w-[300px]">
                    <div className="w-16 h-20 bg-muted rounded-md overflow-hidden shrink-0">
                      <ImageWithFallback 
                        src={book.cover} 
                        alt="Book cover"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-foreground text-sm line-clamp-1">{book.title}</h4>
                          <p className="text-muted-foreground text-xs mt-1">{book.author}</p>
                        </div>
                        {isOverdue && <span className="px-2 py-1 bg-destructive/10 text-destructive text-[10px] font-bold rounded-md">Terlambat</span>}
                      </div>
                      <p className={`text-xs mt-3 font-medium ${isOverdue ? "text-destructive" : "text-primary"}`}>
                        Jatuh tempo: {new Date(loan.dueDate).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="bg-card rounded-xl border border-border p-6 text-center">
              <p className="text-muted-foreground text-sm">Belum ada peminjaman aktif.</p>
              <Link to="/catalog" className="text-primary text-sm font-medium mt-2 inline-block">Mulai pinjam buku</Link>
            </div>
          )}
        </section>
      )}

      {/* Recommendations */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-lg">Rekomendasi untuk Anda</h3>
          <Link to="/catalog" className="text-primary text-sm font-medium hover:underline">Lihat Semua</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {recommendedBooks.map((book) => (
            <Link key={book.id} to={`/book/${book.id}`} className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow group">
              <div className="aspect-[3/4] bg-muted relative overflow-hidden">
                <ImageWithFallback 
                  src={book.cover} 
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2">
                  {book.available ? (
                    <span className="px-2 py-1 bg-green-500 text-white text-[10px] font-bold rounded-md shadow-sm">Tersedia</span>
                  ) : (
                    <span className="px-2 py-1 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-md shadow-sm">Dipinjam</span>
                  )}
                </div>
              </div>
              <div className="p-3">
                <h4 className="font-medium text-sm text-foreground line-clamp-2">{book.title}</h4>
                <p className="text-muted-foreground text-xs mt-1">{book.author}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}