import { memo } from 'react';

function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      className="min-w-0 flex-1 basis-[220px] rounded border border-edge bg-surface px-3 py-2.5 text-sm placeholder:text-muted dark:border-edge-dark dark:bg-surface-dark dark:placeholder:text-muted-dark"
      placeholder="Search products..."
      value={value}
      onChange={(event) => onChange(event.target.value)}
      aria-label="Search products"
    />
  );
}

export default memo(SearchBar);