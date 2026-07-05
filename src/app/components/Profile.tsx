import { User, QrCode, BookOpen, Clock, AlertTriangle, LogOut, LayoutTemplate, MonitorSmartphone, Edit2, Check } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState } from "react";
import { useApp } from "../context/AppContext";

export function Profile() {
  const [activeTab, setActiveTab] = useState("Aktif");
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState("");
  
  const { uiMode, setUiMode, userRole, loans, books, userProfile, setUserProfile, setUserRole } = useApp();
  const navigate = useNavigate();

  const toggleUiMode = () => {
    setUiMode(uiMode === "hifi" ? "wireframe" : "hifi");
  };

  const handleEditName = () => {
    setEditedName(userProfile.name);
    setIsEditingName(true);
  };

  const handleSaveName = () => {
    setUserProfile({ ...userProfile, name: editedName });
    setIsEditingName(false);
  };

  const handleLogout = () => {
    setUserRole("mahasiswa"); // reset back default
    navigate("/login");
  };

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8">
      {/* Profile Header */}
      <div className="bg-card rounded-2xl border border-border p-6 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
          <User className="w-12 h-12 text-primary" />
        </div>
        <div className="flex-1 w-full">
          {isEditingName ? (
            <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
              <input 
                type="text" 
                value={editedName} 
                onChange={(e) => setEditedName(e.target.value)}
                className="px-3 py-1.5 border border-border rounded-lg bg-background text-foreground font-heading text-xl font-bold w-full max-w-[250px] focus:outline-none focus:ring-2 focus:ring-primary"
                autoFocus
              />
              <button 
                onClick={handleSaveName}
                className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Check className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center md:justify-start gap-2">
              <h2 className="font-heading text-2xl font-bold text-foreground">{userProfile.name}</h2>
              <button 
                onClick={handleEditName}
                className="p-1.5 text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-primary/10"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
          )}
          
          <p className="text-muted-foreground mt-1 capitalize">{userRole} • {userProfile.identifier}</p>
          <div className="flex gap-2 mt-3 justify-center md:justify-start">
            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">Sistem Informasi</span>
            <span className="px-3 py-1 bg-muted text-muted-foreground text-xs font-semibold rounded-full">FST</span>
          </div>
        </div>
        
        <div className="bg-white p-2 rounded-xl border border-border shrink-0 self-center">
          <img 
            src={`https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${userProfile.identifier}`} 
            alt="User QR" 
            className="w-20 h-20"
          />
          <p className="text-[10px] text-center text-muted-foreground mt-1 font-medium">QR Anggota</p>
        </div>
      </div>

      {/* Denda Alert Conditionally */}
      {userRole === "mahasiswa" && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-5 flex items-start gap-4">
          <div className="bg-destructive/20 p-2 rounded-full shrink-0">
            <AlertTriangle className="text-destructive w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-destructive font-bold">Informasi Denda</h3>
            <p className="text-destructive/90 text-sm mt-1 mb-3">
              Anda memiliki denda keterlambatan pengembalian buku sebesar <strong>Rp 4.000</strong>. Harap selesaikan pembayaran di meja sirkulasi perpustakaan atau melalui halaman Denda.
            </p>
            <Link to="/fines" className="inline-block px-4 py-2 bg-destructive text-white text-sm font-semibold rounded-lg hover:bg-destructive/90 transition-colors">
              Lihat Detail
            </Link>
          </div>
        </div>
      )}

      {userRole === "pustakawan" && (
        <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-5 flex items-start gap-4">
          <div className="bg-orange-500/20 p-2 rounded-full shrink-0">
            <AlertTriangle className="text-orange-600 w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-orange-700 font-bold">Ringkasan Denda Mahasiswa</h3>
            <p className="text-orange-700/90 text-sm mt-1 mb-3">
              Terdapat <strong>3 mahasiswa</strong> dengan denda aktif sebesar total <strong>Rp 34.000</strong> yang belum dilunasi.
            </p>
            <Link to="/admin/fines-tracking" className="inline-block px-4 py-2 bg-orange-600 text-white text-sm font-semibold rounded-lg hover:bg-orange-700 transition-colors">
              Lihat Detail
            </Link>
          </div>
        </div>
      )}

      {/* Borrowing History */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="flex border-b border-border">
          <button 
            onClick={() => setActiveTab("Aktif")}
            className={`flex-1 py-4 text-sm font-semibold transition-colors relative ${activeTab === "Aktif" ? "text-primary" : "text-muted-foreground hover:bg-muted/50"}`}
          >
            Peminjaman Aktif
            {activeTab === "Aktif" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full"></div>}
          </button>
          <button 
            onClick={() => setActiveTab("Riwayat")}
            className={`flex-1 py-4 text-sm font-semibold transition-colors relative ${activeTab === "Riwayat" ? "text-primary" : "text-muted-foreground hover:bg-muted/50"}`}
          >
            Riwayat
            {activeTab === "Riwayat" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full"></div>}
          </button>
        </div>

        <div className="p-4 md:p-6 flex flex-col gap-4">
          {activeTab === "Aktif" && (
            loans.filter(l => l.status === "active").length === 0 ? (
              <div className="text-center py-8">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-muted-foreground">Belum ada peminjaman aktif.</p>
              </div>
            ) : (
              loans.filter(l => l.status === "active").map(loan => {
                const book = books.find(b => b.id === loan.bookId);
                if (!book) return null;
                const isOverdue = new Date(loan.dueDate) < new Date();
                
                return (
                  <div key={loan.id} className="flex gap-4 p-4 border border-border rounded-xl hover:bg-muted/30 transition-colors">
                    <div className="w-16 h-20 bg-muted rounded-md overflow-hidden shrink-0">
                      <ImageWithFallback 
                        src={book.cover} 
                        alt="Book"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-medium text-foreground text-sm line-clamp-1">{book.title}</h4>
                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${isOverdue ? "bg-destructive/10 text-destructive" : "bg-green-100 text-green-700"}`}>
                          {isOverdue ? "Terlambat" : "Aktif"}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-xs mb-3">Dipinjam: {new Date(loan.borrowDate).toLocaleDateString('id-ID')}</p>
                      <div className={`flex items-center gap-1.5 text-xs font-medium ${isOverdue ? "text-destructive" : "text-green-600"}`}>
                        <Clock className="w-3.5 h-3.5" />
                        Jatuh tempo: {new Date(loan.dueDate).toLocaleDateString('id-ID')}
                      </div>
                    </div>
                  </div>
                );
              })
            )
          )}

          {activeTab === "Riwayat" && (
            loans.filter(l => l.status === "returned").length === 0 ? (
              <div className="text-center py-8">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-muted-foreground">Belum ada riwayat peminjaman.</p>
              </div>
            ) : (
              loans.filter(l => l.status === "returned").map(loan => {
                const book = books.find(b => b.id === loan.bookId);
                if (!book) return null;
                
                return (
                  <div key={loan.id} className="flex gap-4 p-4 border border-border rounded-xl hover:bg-muted/30 transition-colors opacity-75">
                    <div className="w-16 h-20 bg-muted rounded-md overflow-hidden shrink-0 grayscale">
                      <ImageWithFallback 
                        src={book.cover} 
                        alt="Book"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-medium text-foreground text-sm line-clamp-1">{book.title}</h4>
                        <span className="px-2 py-0.5 bg-muted text-muted-foreground text-[10px] font-bold rounded">Dikembalikan</span>
                      </div>
                      <p className="text-muted-foreground text-xs mb-3">Dipinjam: {new Date(loan.borrowDate).toLocaleDateString('id-ID')}</p>
                    </div>
                  </div>
                );
              })
            )
          )}
        </div>
      </div>

      {/* UI Mode Toggle - Only for Pustakawan */}
      {userRole === "pustakawan" && (
        <div className="bg-card rounded-2xl border border-border p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              {uiMode === "hifi" ? <MonitorSmartphone className="w-5 h-5 text-primary" /> : <LayoutTemplate className="w-5 h-5 text-primary" />}
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm">Mode Tampilan UI</h3>
              <p className="text-xs text-muted-foreground">Beralih antara Hi-Fi dan Wireframe</p>
            </div>
          </div>
          <button 
            onClick={toggleUiMode}
            className="relative inline-flex h-6 w-11 items-center rounded-full bg-border transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            style={{ backgroundColor: uiMode === "hifi" ? "var(--primary)" : "var(--muted-foreground)" }}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${uiMode === "hifi" ? "translate-x-6" : "translate-x-1"}`} />
          </button>
        </div>
      )}

      <div className="mt-2">
        <button onClick={handleLogout} className="flex items-center justify-center gap-2 w-full py-4 text-destructive font-semibold hover:bg-destructive/5 rounded-xl transition-colors">
          <LogOut className="w-5 h-5" />
          Keluar (Log Out)
        </button>
      </div>
    </div>
  );
}