import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, BookOpen, Clock, Calendar, CheckCircle2, AlertCircle } from "lucide-react";
import QRCode from "react-qr-code";
import { toast } from "sonner";
import { useApp } from "../context/AppContext";

export function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { books, borrowBook } = useApp();
  
  const [showQR, setShowQR] = useState(false);

  const book = books.find((b) => b.id === id);

  if (!book) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">Buku tidak ditemukan.</p>
        <button onClick={() => navigate(-1)} className="text-primary mt-4">Kembali</button>
      </div>
    );
  }

  const handleBorrow = () => {
    if (!book.available) {
      toast.error("Buku sedang tidak tersedia.");
      return;
    }
    borrowBook(book.id);
    toast.success("Buku berhasil dipinjam! Tunjukkan QR Code ke pustakawan.");
    setShowQR(true);
  };

  return (
    <div className="p-4 md:p-8 space-y-6">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Kembali</span>
      </button>

      <div className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 aspect-[3/4] md:aspect-auto bg-muted">
          <img 
            src={book.cover} 
            alt={book.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-6 md:p-8 flex-1 flex flex-col">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-3">
              {book.category}
            </span>
            <h1 className="text-2xl md:text-3xl font-bold font-heading text-foreground mb-2">
              {book.title}
            </h1>
            <p className="text-lg text-muted-foreground">{book.author}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-muted rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center">
                {book.available ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-destructive" />
                )}
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Status</p>
                <p className="font-semibold text-sm">{book.available ? "Tersedia" : "Dipinjam"}</p>
              </div>
            </div>
            
            <div className="bg-muted rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Stok</p>
                <p className="font-semibold text-sm">{book.stock} Buku</p>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-6 border-t border-border">
            {showQR ? (
              <div className="flex flex-col items-center justify-center p-6 bg-muted rounded-xl border border-primary/20">
                <div className="bg-white p-4 rounded-xl mb-4">
                  <QRCode value={`LOAN-${book.id}-${Date.now()}`} size={150} />
                </div>
                <h3 className="font-bold text-foreground text-center">Tunjukkan QR Code ini</h3>
                <p className="text-sm text-muted-foreground text-center mt-1">
                  Pustakawan akan memindai QR Code untuk memproses peminjaman fisik.
                </p>
                <button 
                  onClick={() => navigate("/loans")}
                  className="mt-4 text-primary font-medium text-sm hover:underline"
                >
                  Lihat Daftar Peminjaman Saya
                </button>
              </div>
            ) : (
              <button 
                onClick={handleBorrow}
                disabled={!book.available}
                className={`w-full py-4 rounded-xl font-semibold text-center transition-colors flex items-center justify-center gap-2 ${
                  book.available 
                    ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                <Clock className="w-5 h-5" />
                {book.available ? "Pinjam Buku Ini" : "Buku Tidak Tersedia"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}