import { memo } from 'react';

function CategoryFilter({ categories, selected, onChange }) {
  return (
    <select
      className="flex-none rounded border border-edge bg-surface px-3 py-2.5 text-sm dark:border-edge-dark dark:bg-surface-dark"
      value={selected}
      onChange={(event) => onChange(event.target.value)}
      aria-label="Filter by category"
    >
      <option value="all">All categories</option>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
}

export default memo(CategoryFilter);