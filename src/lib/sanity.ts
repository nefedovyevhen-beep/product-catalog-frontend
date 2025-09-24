import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-12-01",
  useCdn: false,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// GROQ queries
export const PRODUCTS_QUERY = `*[_type == "product"] | order(_createdAt desc) {
  _id,
  title,
  description,
  image,
  category,
  price,
  availability,
  slug
}`;

export const PRODUCT_BY_SLUG_QUERY = `*[_type == "product" && slug.current == $slug][0] {
  _id,
  title,
  description,
  image,
  category,
  price,
  availability,
  slug
}`;

export const RELATED_PRODUCTS_QUERY = `*[_type == "product" && category == $category && slug.current != $slug][0...4] {
  _id,
  title,
  image,
  price,
  slug
}`;
