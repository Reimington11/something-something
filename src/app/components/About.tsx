import { MapPin, Phone, Mail, HelpCircle, ChevronDown } from "lucide-react";
import { useState } from "react";

export function About() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "Berapa lama batas waktu peminjaman buku?",
      a: "Batas waktu peminjaman buku adalah 7 hari. Anda dapat memperpanjang masa pinjam satu kali selama 3 hari sebelum tenggat waktu berakhir."
    },
    {
      q: "Apa yang terjadi jika saya terlambat mengembalikan buku?",
      a: "Anda akan dikenakan denda sebesar Rp 2.000 per hari untuk setiap buku yang terlambat dikembalikan. Denda dapat dibayarkan melalui halaman Denda."
    },
    {
      q: "Berapa banyak buku yang bisa dipinjam sekaligus?",
      a: "Mahasiswa maksimal dapat meminjam 3 buku sekaligus. Dosen dapat meminjam maksimal 5 buku."
    },
    {
      q: "Apakah saya bisa meminjam buku secara online?",
      a: "Anda dapat memproses peminjaman di aplikasi ini (reservasi), namun fisik buku tetap harus diambil di Perpustakaan dengan menunjukkan QR Code kepada pustakawan."
    }
  ];

  return (
    <div className="p-4 md:p-8 space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-foreground font-heading">Tentang Perpustakaan</h1>
        <p className="text-muted-foreground mt-1">Informasi, kontak, dan FAQ Perpustakaan Fakultas Sains dan Teknologi.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold font-heading mb-4 text-foreground">Hubungi Kami</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3 text-muted-foreground">
              <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <p>Gedung FST Lt. 4<br/>Universitas Sains dan Teknologi<br/>Jl. Notosuman No. 12, Kota Jakarta</p>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Phone className="w-5 h-5 text-primary shrink-0" />
              <p>+62 812 3456 7890</p>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Mail className="w-5 h-5 text-primary shrink-0" />
              <p>perpustakaanfst@uinjkt.ac.id</p>
            </div>
          </div>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
          <h2 className="text-lg font-bold font-heading mb-2 text-foreground">Jam Operasional</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex justify-between border-b border-border/50 pb-2">
              <span>Senin - Kamis</span>
              <span className="font-medium">08:00 - 16:00 WIB</span>
            </li>
            <li className="flex justify-between border-b border-border/50 pb-2">
              <span>Jumat</span>
              <span className="font-medium">08:00 - 16:30 WIB</span>
            </li>
            <li className="flex justify-between pb-2 text-destructive">
              <span>Sabtu - Minggu</span>
              <span className="font-medium">Tutup</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold font-heading text-foreground flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-primary" />
          Pertanyaan yang Sering Diajukan (FAQ)
        </h2>
        
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-border rounded-xl bg-card overflow-hidden">
              <button 
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-4 text-left font-medium text-foreground hover:bg-muted/50 transition-colors"
              >
                {faq.q}
                <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${openFaq === idx ? "rotate-180" : ""}`} />
              </button>
              {openFaq === idx && (
                <div className="p-4 pt-0 text-muted-foreground text-sm border-t border-border">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}