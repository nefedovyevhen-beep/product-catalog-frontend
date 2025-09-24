export interface Product {
  _id: string;
  title: string;
  description: string;
  image: any;
  category: string;
  price: number;
  availability: boolean;
  slug: {
    current: string;
  };
}

export interface FilterState {
  search: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  sortBy: "price-asc" | "price-desc" | "title-asc";
}
