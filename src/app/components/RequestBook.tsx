import { useState } from "react";
import { FileText, Send, BookPlus } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export function RequestBook() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publisher: "",
    isbn: "",
    reason: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Pengajuan buku berhasil dikirim ke Pustakawan.");
    navigate("/");
  };

  return (
    <div className="p-4 md:p-8 space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-foreground font-heading">Pengajuan Buku</h1>
        <p className="text-muted-foreground mt-1">Formulir usulan pengadaan buku baru untuk kebutuhan perkuliahan.</p>
      </header>

      <div className="bg-card border border-border rounded-xl p-6 md:p-8 max-w-2xl">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <BookPlus className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-foreground">Formulir Usulan Buku Baru</h2>
            <p className="text-sm text-muted-foreground">Silakan isi detail buku dengan lengkap.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Judul Buku *</label>
            <input 
              required
              type="text" 
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Contoh: Pengantar Ilmu Komputer"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Penulis *</label>
              <input 
                required
                type="text" 
                value={formData.author}
                onChange={(e) => setFormData({...formData, author: e.target.value})}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Nama Penulis"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Penerbit</label>
              <input 
                type="text" 
                value={formData.publisher}
                onChange={(e) => setFormData({...formData, publisher: e.target.value})}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Nama Penerbit"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">ISBN / ISSN (Opsional)</label>
            <input 
              type="text" 
              value={formData.isbn}
              onChange={(e) => setFormData({...formData, isbn: e.target.value})}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Nomor ISBN/ISSN jika ada"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Alasan Pengajuan / Mata Kuliah *</label>
            <textarea 
              required
              rows={4}
              value={formData.reason}
              onChange={(e) => setFormData({...formData, reason: e.target.value})}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              placeholder="Jelaskan untuk mata kuliah apa atau alasan mengapa buku ini diperlukan..."
            />
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              <Send className="w-4 h-4" />
              Kirim Pengajuan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}