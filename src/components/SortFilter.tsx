"use client";

interface SortFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SortFilter({ value, onChange }: SortFilterProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Sort By
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-field"
      >
        <option value="title-asc">Name A-Z</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </div>
  );
}
