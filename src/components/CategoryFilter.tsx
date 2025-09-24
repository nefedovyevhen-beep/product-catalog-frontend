"use client";

interface CategoryFilterProps {
  value: string;
  onChange: (value: string) => void;
  categories: string[];
}

export default function CategoryFilter({
  value,
  onChange,
  categories,
}: CategoryFilterProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Category
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-field"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() +
              category.slice(1).replace("-", " ")}
          </option>
        ))}
      </select>
    </div>
  );
}
