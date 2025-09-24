import { notFound } from "next/navigation";
import Image from "next/image";
import { client, urlFor } from "@/lib/sanity";
import { Product } from "@/types/product";
import { PRODUCT_BY_SLUG_QUERY, RELATED_PRODUCTS_QUERY } from "@/lib/sanity";
import RelatedProducts from "@/components/RelatedProducts";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const product = await client.fetch(PRODUCT_BY_SLUG_QUERY, { slug });
    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

async function getRelatedProducts(
  category: string,
  slug: string
): Promise<Product[]> {
  try {
    const products = await client.fetch(RELATED_PRODUCTS_QUERY, {
      category,
      slug,
    });
    return products;
  } catch (error) {
    console.error("Error fetching related products:", error);
    return [];
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(
    product.category,
    params.slug
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <a href="/" className="text-primary-600 hover:text-primary-700">
              Home
            </a>
          </li>
          <li className="text-gray-500">/</li>
          <li className="text-gray-500 capitalize">
            {product.category.replace("-", " ")}
          </li>
          <li className="text-gray-500">/</li>
          <li className="text-gray-900 font-medium">{product.title}</li>
        </ol>
      </nav>

      {/* Product Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Product Image */}
        <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
          {product.image ? (
            <Image
              src={urlFor(product.image).width(600).height(600).url()}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <div className="text-center">
                <div className="text-6xl mb-4">📦</div>
                <p>No Image Available</p>
              </div>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full capitalize">
              {product.category.replace("-", " ")}
            </span>
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            {product.title}
          </h1>

          <div className="mb-6">
            <span className="text-4xl font-bold text-primary-600">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <div className="mb-6">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">
                Availability:
              </span>
              <span
                className={`text-sm font-medium ${
                  product.availability ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.availability ? "In Stock" : "Out of Stock"}
              </span>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Description</h3>
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="flex space-x-4">
            <button
              className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${
                product.availability
                  ? "bg-primary-600 text-white hover:bg-primary-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!product.availability}
            >
              {product.availability ? "Add to Cart" : "Out of Stock"}
            </button>
            <button className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200">
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts products={relatedProducts} />
    </div>
  );
}

export async function generateMetadata({ params }: ProductPageProps) {
  const product = await getProduct(params.slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.title} - Product Catalog`,
    description: product.description,
  };
}
