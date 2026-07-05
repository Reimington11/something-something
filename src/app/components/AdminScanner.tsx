import { useState } from "react";
import { ScanLine, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";
import { useApp } from "../context/AppContext";

export function AdminScanner() {
  const { loans, returnBook } = useApp();
  const [scannedId, setScannedId] = useState("");
  const [scanResult, setScanResult] = useState<"success" | "error" | null>(null);
  
  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scannedId) return;

    // mock scanning logic: check if the input is a valid loan ID, or simulate returning it.
    // Real QR format from Mahasiswa is `LOAN-{bookId}-{timestamp}`
    // But since it's just a mockup, let's just return the last active loan if they type something
    
    const activeLoan = loans.find(l => l.status === "active");
    
    if (scannedId.includes("LOAN") || activeLoan) {
      if (activeLoan) {
        returnBook(activeLoan.id);
      }
      setScanResult("success");
      toast.success("Berhasil memproses buku!");
    } else {
      setScanResult("error");
      toast.error("Kode QR atau ID Transaksi tidak valid.");
    }
    
    setTimeout(() => {
      setScanResult(null);
      setScannedId("");
    }, 3000);
  };

  return (
    <div className="p-4 md:p-8 space-y-6 flex flex-col items-center justify-center min-h-[80vh]">
      <header className="text-center mb-8">
        <h1 className="text-2xl font-bold text-foreground font-heading">Scanner Pustakawan</h1>
        <p className="text-muted-foreground mt-1 max-w-md">Pindai QR Code dari Mahasiswa/Dosen untuk memproses pengambilan atau pengembalian buku fisik.</p>
      </header>

      <div className="relative bg-card border border-border p-8 rounded-2xl shadow-sm w-full max-w-sm flex flex-col items-center justify-center aspect-square">
        {scanResult === "success" ? (
          <div className="flex flex-col items-center text-green-500 animate-in zoom-in duration-300">
            <CheckCircle2 className="w-24 h-24 mb-4" />
            <p className="font-bold text-lg text-foreground">Berhasil Diproses</p>
          </div>
        ) : scanResult === "error" ? (
          <div className="flex flex-col items-center text-destructive animate-in zoom-in duration-300">
            <XCircle className="w-24 h-24 mb-4" />
            <p className="font-bold text-lg text-foreground">Gagal Diproses</p>
          </div>
        ) : (
          <div className="flex flex-col items-center text-primary relative">
            <div className="absolute inset-0 border-2 border-primary/20 rounded-xl animate-pulse"></div>
            <ScanLine className="w-24 h-24 mb-4 text-primary" />
            <p className="font-medium text-foreground text-sm">Menunggu pindaian...</p>
          </div>
        )}
      </div>

      <form onSubmit={handleScan} className="w-full max-w-sm flex gap-2">
        <input 
          type="text" 
          value={scannedId}
          onChange={(e) => setScannedId(e.target.value)}
          placeholder="Atau ketik ID Transaksi (Contoh: LOAN-1)" 
          className="flex-1 px-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-sm"
        />
        <button 
          type="submit"
          className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors"
        >
          Proses
        </button>
      </form>
    </div>
  );
}