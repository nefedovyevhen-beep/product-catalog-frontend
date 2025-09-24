"use client";

interface PriceFilterProps {
  minPrice: number;
  maxPrice: number;
  onMinPriceChange: (value: number) => void;
  onMaxPriceChange: (value: number) => void;
}

export default function PriceFilter({
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
}: PriceFilterProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Price Range
      </label>
      <div className="flex space-x-2">
        <input
          type="number"
          placeholder="Min"
          value={minPrice || ""}
          onChange={(e) => onMinPriceChange(Number(e.target.value) || 0)}
          className="input-field text-sm"
          min="0"
        />
        <input
          type="number"
          placeholder="Max"
          value={maxPrice || ""}
          onChange={(e) => onMaxPriceChange(Number(e.target.value) || 0)}
          className="input-field text-sm"
          min="0"
        />
      </div>
    </div>
  );
}
