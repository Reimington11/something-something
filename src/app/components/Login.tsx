import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { BookOpen, User, Lock, Mail, IdCard } from "lucide-react";
import { useApp } from "../context/AppContext";
import { toast } from "sonner";

export function Login() {
  const navigate = useNavigate();
  const { setUserRole, setUserProfile } = useApp();
  const [role, setRole] = useState<"mahasiswa" | "dosen" | "pustakawan">("mahasiswa");
  const [email, setEmail] = useState("");
  const [identifier, setIdentifier] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setUserRole(role);
    
    // Extract name from email (e.g. "budi.santoso@..." -> "Budi Santoso")
    const namePart = email.split("@")[0].replace(/[^a-zA-Z]+/g, ' ');
    const formattedName = namePart.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    
    setUserProfile({
      name: formattedName || "Pengguna",
      email,
      identifier: identifier || "00000000"
    });

    toast.success(`Berhasil login sebagai ${role}`);
    
    if (role === "pustakawan") {
      navigate("/admin/dashboard");
    } else {
      navigate("/home");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center">
            <BookOpen className="text-primary-foreground w-10 h-10" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold font-heading text-foreground">
          Masuk ke PerpusFST
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Atau{" "}
          <Link to="/register" className="font-medium text-primary hover:text-primary/80">
            daftar akun baru
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-card py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-border">
          <form className="space-y-6" onSubmit={handleLogin}>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Masuk Sebagai</label>
              <div className="grid grid-cols-3 gap-2">
                {(["mahasiswa", "dosen", "pustakawan"] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`py-2 px-3 text-xs sm:text-sm font-medium rounded-md border ${
                      role === r
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-foreground border-border hover:bg-muted"
                    } transition-colors capitalize`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground">
                Email
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-border rounded-md shadow-sm placeholder-muted-foreground focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-background text-foreground"
                  placeholder="Masukkan email Anda"
                />
              </div>
            </div>

            <div>
              <label htmlFor="identifier" className="block text-sm font-medium text-foreground">
                NIM / NIP / ID Pustakawan
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IdCard className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-border rounded-md shadow-sm placeholder-muted-foreground focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-background text-foreground"
                  placeholder="Masukkan identitas Anda"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground">
                Kata Sandi
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-border rounded-md shadow-sm placeholder-muted-foreground focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-background text-foreground"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-foreground">
                  Ingat saya
                </label>
              </div>

              <div className="text-sm">
                <button 
                  type="button" 
                  onClick={() => {
                    if (email) {
                      toast.success(`Email reset sandi telah dikirim ke ${email}.`);
                    } else {
                      toast.success("Email reset sandi telah dikirim ke alamat email Anda.");
                    }
                  }}
                  className="font-medium text-primary hover:text-primary/80 bg-transparent border-none p-0 cursor-pointer"
                >
                  Lupa sandi?
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Masuk
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
