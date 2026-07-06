import { BookOpen, Calendar, AlertTriangle } from "lucide-react";
import { useApp } from "../context/AppContext";

export function Loans() {
  const { loans, books } = useApp();

  const activeLoans = loans.filter(l => l.status === "active");

  return (
    <div className="p-4 md:p-8 space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-foreground font-heading">Peminjaman Buku</h1>
        <p className="text-muted-foreground mt-1">Daftar buku yang sedang Anda pinjam dan riwayat peminjaman.</p>
      </header>
      
      {activeLoans.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-8 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-muted-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-foreground">Belum ada peminjaman aktif</h3>
            <p className="text-muted-foreground mt-1 max-w-sm mx-auto">Anda belum meminjam buku apa pun saat ini. Silakan cari buku di Katalog untuk mulai meminjam.</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {activeLoans.map(loan => {
            const book = books.find(b => b.id === loan.bookId);
            if (!book) return null;

            const dueDate = new Date(loan.dueDate);
            const isOverdue = dueDate < new Date();

            return (
              <div key={loan.id} className="bg-card border border-border rounded-xl p-4 flex gap-4 items-start">
                <img 
                  src={book.cover} 
                  alt={book.title} 
                  className="w-16 h-24 object-cover rounded bg-muted"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-foreground">{book.title}</h3>
                      <p className="text-sm text-muted-foreground">{book.author}</p>
                    </div>
                    {isOverdue ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-destructive bg-destructive/10 px-2 py-1 rounded">
                        <AlertTriangle className="w-3 h-3" /> Terlambat
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">
                        Aktif
                      </span>
                    )}
                  </div>
                  
                  <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Dipinjam: {new Date(loan.borrowDate).toLocaleDateString('id-ID')}</span>
                    </div>
                    <div className={`flex items-center gap-1 ${isOverdue ? 'text-destructive font-medium' : ''}`}>
                      <Calendar className="w-4 h-4" />
                      <span>Tenggat: {dueDate.toLocaleDateString('id-ID')}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}