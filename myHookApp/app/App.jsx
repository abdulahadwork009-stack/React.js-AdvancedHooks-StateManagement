import { useState, useMemo, useCallback } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { CartProvider, useCart } from './context/CartContext';
import { useFetch } from './hooks/useFetch';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

const API_URL = 'https://dummyjson.com/products?limit=100';

function AppContent() {
  const { data, loading, error } = useFetch(API_URL);
  const { addToCart } = useCart();
  useTheme(); // keeps the html.dark class in sync via ThemeProvider's effect

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [unrelatedCounter, setUnrelatedCounter] = useState(0);

  const products = data?.products ?? [];

  const categories = useMemo(() => {
    const unique = new Set(products.map((product) => product.category));
    return Array.from(unique).sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesSearch = product.title
          .toLowerCase()
          .includes(searchTerm.trim().toLowerCase());
        const matchesCategory =
          selectedCategory === 'all' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [products, searchTerm, selectedCategory]);

  const handleAddToCart = useCallback(
    (product) => {
      addToCart(product);
    },
    [addToCart]
  );

  return (
    <div className="min-h-screen bg-paper font-sans text-ink transition-colors duration-200 dark:bg-paper-dark dark:text-ink-dark">
      <Header />

      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-7 pb-12 md:grid-cols-[1fr_340px] md:items-start">
        <section className="flex min-w-0 flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="m-0 font-display text-2xl font-medium">Products</h2>
            <button
              type="button"
              className="rounded border border-dashed border-edge px-3 py-1.5 text-sm text-muted tabular-nums hover:border-muted hover:text-ink dark:border-edge-dark dark:text-muted-dark dark:hover:border-muted-dark dark:hover:text-ink-dark"
              onClick={() => setUnrelatedCounter((count) => count + 1)}
            >
              Unrelated counter: {unrelatedCounter}
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
            <CategoryFilter
              categories={categories}
              selected={selectedCategory}
              onChange={setSelectedCategory}
            />
          </div>

          {loading && <p className="py-2 text-muted dark:text-muted-dark">Loading products…</p>}
          {error && (
            <p className="py-2 text-danger dark:text-danger-dark">
              Couldn't load products: {error}
            </p>
          )}

          {!loading && !error && (
            <ProductList products={filteredProducts} onAddToCart={handleAddToCart} />
          )}
        </section>

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