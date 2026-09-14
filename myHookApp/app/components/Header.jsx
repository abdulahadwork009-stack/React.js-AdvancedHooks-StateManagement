import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";

function Header() {
  const { totalItems } = useCart();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-10 flex justify-between items-center p-4 bg-blue-600 text-white dark:bg-blue-900">
      <h1 className="text-lg font-bold">Product Manager</h1>

      <div className="flex items-center gap-4">
        <span>Cart: {totalItems} items</span>
        <button
          onClick={toggleTheme}
          className="px-3 py-1 border border-white rounded text-sm hover:bg-blue-700"
        >
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </div>
    </header>
  );
}

export default Header;