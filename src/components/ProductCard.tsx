import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { urlFor } from "@/lib/sanity";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Handle missing images with placeholder service
  const imageUrl = product.image
    ? urlFor(product.image).width(400).height(400).url()
    : `https://picsum.photos/400/400?random=${product._id}`; // Real placeholder images

  return (
    <Link href={`/product/${product.slug.current}`}>
      <div className="bg-white rounded-md shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden group cursor-pointer transform hover:-translate-y-1 transition-all duration-300 ease-out">
        <div className="aspect-square relative overflow-hidden">
          {product.image ? (
            <Image
              src={imageUrl}
              alt={product.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
            />
          ) : (
            <div
              className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500 ease-out"
              style={{
                backgroundImage: `url(${imageUrl})`,
              }}
            />
          )}
          {!product.availability && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold bg-red-600 px-3 py-1 rounded-full text-sm">
                Out of Stock
              </span>
            </div>
          )}
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
        </div>
        <div className="p-5">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
            {product.title}
          </h3>
          <p className="text-sm text-gray-500 mb-3 capitalize font-medium">
            {product.category
              ? product.category.replace("-", " ")
              : "Uncategorized"}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-primary-600 group-hover:text-primary-700 transition-colors duration-200">
              ${product.price?.toFixed(2) || "0.00"}
            </p>
            <div className="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center group-hover:bg-primary-100 transition-colors duration-200">
              <svg
                className="w-4 h-4 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
