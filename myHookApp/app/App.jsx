import { useState, useMemo, useCallback } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { CartProvider, useCart } from "./context/CartContext";
import { useFetch } from "./hooks/useFetch";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

const API_URL = "https://dummyjson.com/products?limit=100";

function AppContent() {
  const { data, loading, error } = useFetch(API_URL);
  const { addToCart } = useCart();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const products = data?.products || [];

  const categories = useMemo(() => {
    return [...new Set(products.map((p) => p.category))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchName = p.title.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === "all" || p.category === category;
      return matchName && matchCategory;
    });
  }, [products, search, category]);

  const handleAddToCart = useCallback(
    (product) => addToCart(product),
    [addToCart]
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 dark:text-white">
      <Header />

      <main className="max-w-5xl mx-auto p-4 flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-3">Products</h2>

          <div className="flex gap-2 mb-4">
            <SearchBar value={search} onChange={setSearch} />
            <CategoryFilter
              categories={categories}
              selected={category}
              onChange={setCategory}
            />
          </div>

          {loading && <p>Loading...</p>}
          {error && <p className="text-red-600">Error: {error}</p>}

          {!loading && !error && (
            <ProductList products={filteredProducts} onAddToCart={handleAddToCart} />
          )}
        </div>

        <Cart />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </ThemeProvider>
  );
}