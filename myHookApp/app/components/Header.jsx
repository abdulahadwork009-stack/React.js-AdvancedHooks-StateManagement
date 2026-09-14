import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

function Header() {
  const { totalItems } = useCart();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-edge bg-paper px-6 py-3.5 dark:border-edge-dark dark:bg-paper-dark">
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded border-[1.5px] border-ink font-display text-sm font-semibold dark:border-ink-dark">
          PM
        </span>
        <span className="font-display text-lg font-medium tracking-tight">
          Product Manager
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div
          className="flex items-center gap-2 rounded-full border border-edge px-3.5 py-1.5 text-sm tabular-nums dark:border-edge-dark"
          aria-label={`${totalItems} items in cart`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent dark:bg-accent-dark" aria-hidden="true" />
          Cart: {totalItems} items
        </div>

        <button
          type="button"
          className="rounded border border-edge px-3 py-1.5 text-sm hover:border-muted dark:border-edge-dark dark:hover:border-muted-dark"
          onClick={toggleTheme}
          aria-pressed={theme === 'dark'}
        >
          {theme === 'light' ? 'Dark mode' : 'Light mode'}
        </button>
      </div>
    </header>
  );
}

export default Header;