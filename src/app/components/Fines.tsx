import { Banknote, CreditCard, Wallet, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import QRCode from "react-qr-code";

export function Fines() {
  const fines = [
    {
      id: "F-102",
      bookTitle: "Biologi Sel",
      daysOverdue: 2,
      amount: 4000,
      status: "unpaid"
    }
  ];

  const totalFine = fines.reduce((acc, curr) => acc + curr.amount, 0);

  const handlePayment = (method: string) => {
    toast.info(`Instruksi pembayaran dengan ${method} telah dikirim ke notifikasi Anda.`);
  };

  return (
    <div className="p-4 md:p-8 space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-foreground font-heading">Denda & Pembayaran</h1>
        <p className="text-muted-foreground mt-1">Kelola dan bayar denda keterlambatan peminjaman buku Anda.</p>
      </header>

      {fines.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-8 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
            <Banknote className="w-8 h-8 text-muted-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-foreground">Tidak Ada Denda</h3>
            <p className="text-muted-foreground mt-1 max-w-sm mx-auto">Anda tidak memiliki denda aktif saat ini. Terima kasih telah mengembalikan buku tepat waktu!</p>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <h2 className="font-semibold text-foreground text-lg mb-2">Rincian Denda</h2>
            {fines.map(fine => (
              <div key={fine.id} className="bg-card border border-border rounded-xl p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-foreground">{fine.bookTitle}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-0.5 rounded bg-destructive/10 text-destructive font-medium flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Terlambat {fine.daysOverdue} Hari
                    </span>
                    <span className="text-xs text-muted-foreground">ID: {fine.id}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-foreground">Rp {fine.amount.toLocaleString('id-ID')}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
              <h2 className="text-sm font-medium text-muted-foreground mb-1">Total Denda</h2>
              <p className="text-3xl font-bold font-heading text-primary mb-6">
                Rp {totalFine.toLocaleString('id-ID')}
              </p>

              <div className="space-y-3">
                <h3 className="text-sm font-medium text-foreground">Pilih Metode Pembayaran:</h3>
                
                <button 
                  onClick={() => handlePayment('QRIS')}
                  className="w-full flex items-center justify-between p-3 rounded-lg border border-border bg-card hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/10 p-1.5 rounded">
                      <QRCode value="qris-payment-mock" size={24} />
                    </div>
                    <span className="font-medium text-sm">QRIS</span>
                  </div>
                </button>

                <button 
                  onClick={() => handlePayment('ATM/Transfer')}
                  className="w-full flex items-center justify-between p-3 rounded-lg border border-border bg-card hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium text-sm">Transfer Bank</span>
                  </div>
                </button>

                <button 
                  onClick={() => handlePayment('Tunai')}
                  className="w-full flex items-center justify-between p-3 rounded-lg border border-border bg-card hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium text-sm">Tunai (Resepsionis)</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}