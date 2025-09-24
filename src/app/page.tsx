"use client";

import { useState, useEffect, useMemo } from "react";
import { client } from "@/lib/sanity";
import { Product, FilterState } from "@/types/product";
import { PRODUCTS_QUERY } from "@/lib/sanity";
import ProductGrid from "@/components/ProductGrid";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import PriceFilter from "@/components/PriceFilter";
import SortFilter from "@/components/SortFilter";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "",
    minPrice: 0,
    maxPrice: 0,
    sortBy: "title-asc",
  });

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await client.fetch(PRODUCTS_QUERY);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    return Array.from(new Set(products.map((product) => product.category)));
  }, [products]);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      // Search filter
      if (
        filters.search &&
        !product.title.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }

      // Category filter
      if (filters.category && product.category !== filters.category) {
        return false;
      }

      // Price filter
      if (filters.minPrice > 0 && product.price < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice > 0 && product.price > filters.maxPrice) {
        return false;
      }

      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "title-asc":
        default:
          return a.title.localeCompare(b.title);
      }
    });

    return filtered;
  }, [products, filters]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Our Products</h1>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <SearchBar
              value={filters.search}
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, search: value }))
              }
            />
            <CategoryFilter
              value={filters.category}
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, category: value }))
              }
              categories={categories}
            />
            <PriceFilter
              minPrice={filters.minPrice}
              maxPrice={filters.maxPrice}
              onMinPriceChange={(value) =>
                setFilters((prev) => ({ ...prev, minPrice: value }))
              }
              onMaxPriceChange={(value) =>
                setFilters((prev) => ({ ...prev, maxPrice: value }))
              }
            />
            <SortFilter
              value={filters.sortBy}
              onChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  sortBy: value as FilterState["sortBy"],
                }))
              }
            />
          </div>

          {/* Results count */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing {filteredAndSortedProducts.length} of {products.length}{" "}
              products
            </p>
          </div>
        </div>
      </div>

      <ProductGrid products={filteredAndSortedProducts} />
    </div>
  );
}
