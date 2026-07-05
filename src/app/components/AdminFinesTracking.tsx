import { Banknote, Search, AlertCircle, CheckCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface FineMock {
  id: string;
  userId: string;
  userName: string;
  bookTitle: string;
  daysOverdue: number;
  amount: number;
  status: "unpaid" | "paid";
}

// Mocking fines for admin tracking
const mockFines: FineMock[] = [
  {
    id: "F-101",
    userId: "MHS-001",
    userName: "Budi Santoso",
    bookTitle: "Struktur Data & Algoritma",
    daysOverdue: 5,
    amount: 10000,
    status: "unpaid"
  },
  {
    id: "F-102",
    userId: "MHS-024",
    userName: "Siti Aminah",
    bookTitle: "Kalkulus Edisi 9",
    daysOverdue: 2,
    amount: 4000,
    status: "paid"
  },
  {
    id: "F-103",
    userId: "MHS-105",
    userName: "Andi Saputra",
    bookTitle: "Biologi Sel",
    daysOverdue: 10,
    amount: 20000,
    status: "unpaid"
  }
];

export function AdminFinesTracking() {
  const [fines, setFines] = useState<FineMock[]>(mockFines);
  const [searchTerm, setSearchTerm] = useState("");

  const markAsPaid = (fineId: string) => {
    setFines(prev => prev.map(f => f.id === fineId ? { ...f, status: "paid" } : f));
    toast.success("Status denda berhasil diubah menjadi Lunas.");
  };

  const filteredFines = fines.filter(fine => {
    const searchLower = searchTerm.toLowerCase();
    return (
      fine.userName.toLowerCase().includes(searchLower) ||
      fine.userId.toLowerCase().includes(searchLower) ||
      fine.bookTitle.toLowerCase().includes(searchLower)
    );
  });

  const totalUnpaid = fines.filter(f => f.status === "unpaid").reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="p-4 md:p-8 space-y-6">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-heading">Tracking Denda</h1>
          <p className="text-muted-foreground mt-1">Pantau pembayaran denda keterlambatan mahasiswa.</p>
        </div>
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari Mahasiswa atau Buku..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </header>

      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-card border border-border p-4 rounded-xl flex items-center gap-4">
          <div className="bg-destructive/10 p-3 rounded-lg text-destructive">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Denda Belum Dibayar</p>
            <p className="text-2xl font-bold text-foreground">Rp {totalUnpaid.toLocaleString('id-ID')}</p>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-4 py-3 font-medium text-muted-foreground">ID Denda</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Mahasiswa</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Buku Terlambat</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Hari</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Nominal</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-3 font-medium text-muted-foreground text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredFines.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                    Tidak ada denda yang ditemukan.
                  </td>
                </tr>
              ) : (
                filteredFines.map(fine => (
                  <tr key={fine.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-foreground">{fine.id}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-foreground">{fine.userName}</p>
                      <p className="text-xs text-muted-foreground">{fine.userId}</p>
                    </td>
                    <td className="px-4 py-3 text-foreground truncate max-w-[200px]" title={fine.bookTitle}>
                      {fine.bookTitle}
                    </td>
                    <td className="px-4 py-3 text-destructive font-medium">{fine.daysOverdue} Hari</td>
                    <td className="px-4 py-3 font-bold text-foreground">Rp {fine.amount.toLocaleString('id-ID')}</td>
                    <td className="px-4 py-3">
                      {fine.status === "unpaid" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold uppercase bg-destructive/10 text-destructive">
                          <AlertCircle className="w-3 h-3" /> Belum Dibayar
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold uppercase bg-green-500/10 text-green-600">
                          <CheckCircle className="w-3 h-3" /> Lunas
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {fine.status === "unpaid" ? (
                        <button
                          onClick={() => markAsPaid(fine.id)}
                          className="text-xs bg-primary hover:bg-primary/90 text-primary-foreground px-3 py-1.5 rounded transition-colors font-medium"
                        >
                          Tandai Lunas
                        </button>
                      ) : (
                        <span className="text-xs text-muted-foreground italic">Selesai</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}