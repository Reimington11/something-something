import { BookOpen, Search, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { useApp } from "../context/AppContext";
import { useState } from "react";
import { toast } from "sonner";

export function AdminLoans() {
  const { loans, books, returnBook } = useApp();
  const [searchTerm, setSearchTerm] = useState("");

  const handleReturn = (loanId: string) => {
    returnBook(loanId);
    toast.success("Buku berhasil dikembalikan.");
  };

  const filteredLoans = loans.filter(loan => {
    const book = books.find(b => b.id === loan.bookId);
    const searchLower = searchTerm.toLowerCase();
    return (
      book?.title.toLowerCase().includes(searchLower) ||
      loan.userId.toLowerCase().includes(searchLower) ||
      loan.id.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="p-4 md:p-8 space-y-6">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-heading">Data Pinjaman Mahasiswa</h1>
          <p className="text-muted-foreground mt-1">Kelola dan pantau semua status peminjaman buku.</p>
        </div>
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari ID Peminjaman, User, atau Buku..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </header>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-4 py-3 font-medium text-muted-foreground">ID Peminjaman</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">User ID</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Buku</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Tgl Pinjam</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Tenggat Waktu</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-3 font-medium text-muted-foreground text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredLoans.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                    Tidak ada data peminjaman yang ditemukan.
                  </td>
                </tr>
              ) : (
                filteredLoans.slice().reverse().map(loan => {
                  const book = books.find(b => b.id === loan.bookId);
                  
                  return (
                    <tr key={loan.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs text-foreground">{loan.id}</td>
                      <td className="px-4 py-3 font-medium text-foreground">{loan.userId}</td>
                      <td className="px-4 py-3 text-foreground truncate max-w-[200px]" title={book?.title}>
                        {book?.title || "Buku tidak ditemukan"}
                      </td>
                      <td className="px-4 py-3 text-foreground">{new Date(loan.borrowDate).toLocaleDateString('id-ID')}</td>
                      <td className="px-4 py-3 text-foreground">{new Date(loan.dueDate).toLocaleDateString('id-ID')}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold uppercase ${
                          loan.status === "active" ? "bg-orange-500/10 text-orange-600" :
                          loan.status === "returned" ? "bg-green-500/10 text-green-600" :
                          "bg-destructive/10 text-destructive"
                        }`}>
                          {loan.status === "active" ? <Clock className="w-3 h-3" /> :
                           loan.status === "returned" ? <CheckCircle className="w-3 h-3" /> :
                           <AlertCircle className="w-3 h-3" />}
                          {loan.status === "active" ? "Aktif" :
                           loan.status === "returned" ? "Dikembalikan" : "Terlambat"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        {loan.status === "active" && (
                          <button
                            onClick={() => handleReturn(loan.id)}
                            className="text-xs bg-primary hover:bg-primary/90 text-primary-foreground px-3 py-1.5 rounded transition-colors font-medium"
                          >
                            Tandai Kembali
                          </button>
                        )}
                        {loan.status === "returned" && (
                          <span className="text-xs text-muted-foreground italic">Selesai</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}