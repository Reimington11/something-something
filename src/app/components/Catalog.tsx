import { useState } from "react";
import { Link } from "react-router";
import { Search, Filter, BookOpen } from "lucide-react";
import { useApp } from "../context/AppContext";

export function Catalog() {
  const { books } = useApp();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const categories = ["Semua", ...Array.from(new Set(books.map(b => b.category)))];

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(search.toLowerCase()) || 
                          book.author.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "Semua" || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-4 md:p-8 space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-foreground font-heading">Katalog Buku</h1>
        <p className="text-muted-foreground mt-1">Cari dan temukan koleksi buku di perpustakaan FST.</p>
      </header>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <input 
            type="text" 
            placeholder="Cari judul, penulis, atau kata kunci..." 
            className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border whitespace-nowrap transition-colors ${
                selectedCategory === category 
                  ? "bg-primary text-primary-foreground border-primary" 
                  : "bg-card border-border text-foreground hover:bg-muted"
              }`}
            >
              {category === "Semua" ? <Filter className="w-4 h-4" /> : null}
              <span className="font-medium text-sm">{category}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filteredBooks.map((book) => (
          <Link 
            key={book.id} 
            to={`/book/${book.id}`}
            className="group flex flex-col bg-card rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="aspect-[3/4] overflow-hidden bg-muted relative">
              <img 
                src={book.cover} 
                alt={book.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {!book.available && (
                <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground text-[10px] font-bold px-2 py-1 rounded">
                  DIPINJAM
                </div>
              )}
              {book.available && (
                <div className="absolute top-2 right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded">
                  TERSEDIA
                </div>
              )}
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <span className="text-xs font-semibold text-primary mb-1">{book.category}</span>
              <h3 className="font-heading font-semibold text-foreground line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                {book.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-1 mb-3">{book.author}</p>
              
              <div className="mt-auto flex items-center justify-between text-xs">
                <span className="font-medium text-muted-foreground">Stok: {book.stock}</span>
                <span className="flex items-center gap-1 text-primary font-medium">
                  Detail <BookOpen className="w-3 h-3" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Buku tidak ditemukan.</p>
        </div>
      )}
    </div>
  );
}