import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Role = "mahasiswa" | "dosen" | "pustakawan";

interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  category: string;
  available: boolean;
  stock: number;
}

interface Loan {
  id: string;
  bookId: string;
  userId: string;
  borrowDate: string;
  dueDate: string;
  status: "active" | "returned" | "overdue";
}

interface UserProfile {
  name: string;
  email: string;
  identifier: string;
}

interface AppContextType {
  userRole: Role | null;
  setUserRole: (role: Role | null) => void;
  userProfile: UserProfile;
  setUserProfile: (profile: UserProfile) => void;
  uiMode: "hifi" | "wireframe";
  setUiMode: (mode: "hifi" | "wireframe") => void;
  books: Book[];
  loans: Loan[];
  borrowBook: (bookId: string) => void;
  returnBook: (loanId: string) => void;
}

const mockBooks: Book[] = [
  { id: "1", title: "Kalkulus Edisi 9", author: "Purcell, Varberg, Rigdon", cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800&q=80", category: "Matematika", available: true, stock: 5 },
  { id: "2", title: "Fisika Dasar", author: "Halliday & Resnick", cover: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&q=80", category: "Fisika", available: true, stock: 3 },
  { id: "3", title: "Biologi Sel", author: "Bruce Alberts", cover: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80", category: "Biologi", available: false, stock: 0 },
  { id: "4", title: "Struktur Data & Algoritma", author: "Thomas H. Cormen", cover: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80", category: "Informatika", available: true, stock: 2 },
  { id: "5", title: "Kimia Organik", author: "Fessenden & Fessenden", cover: "https://images.unsplash.com/photo-1603126857599-f6e15782fd5d?w=800&q=80", category: "Kimia", available: true, stock: 4 },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [userRole, setUserRole] = useState<Role | null>("mahasiswa"); // default for testing
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "Budi Santoso",
    email: "budi@mhs.fst.edu",
    identifier: "123456789"
  });
  const [uiMode, setUiMode] = useState<"hifi" | "wireframe">("hifi");
  const [books, setBooks] = useState<Book[]>(mockBooks);
  const [loans, setLoans] = useState<Loan[]>([]);

  // Update body class for wireframe mode
  useEffect(() => {
    if (uiMode === "wireframe") {
      document.body.classList.add("wireframe-mode");
    } else {
      document.body.classList.remove("wireframe-mode");
    }
  }, [uiMode]);

  const borrowBook = (bookId: string) => {
    const newLoan: Loan = {
      id: Math.random().toString(36).substr(2, 9),
      bookId,
      userId: "user-1",
      borrowDate: new Date().toISOString(),
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      status: "active"
    };
    
    setLoans(prev => [...prev, newLoan]);
    setBooks(prev => prev.map(book => 
      book.id === bookId ? { ...book, stock: book.stock - 1, available: book.stock - 1 > 0 } : book
    ));
  };

  const returnBook = (loanId: string) => {
    const loan = loans.find(l => l.id === loanId);
    if (!loan) return;
    
    setLoans(prev => prev.map(l => 
      l.id === loanId ? { ...l, status: "returned" } : l
    ));
    setBooks(prev => prev.map(book => 
      book.id === loan.bookId ? { ...book, stock: book.stock + 1, available: true } : book
    ));
  };

  return (
    <AppContext.Provider value={{ userRole, setUserRole, userProfile, setUserProfile, uiMode, setUiMode, books, loans, borrowBook, returnBook }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
