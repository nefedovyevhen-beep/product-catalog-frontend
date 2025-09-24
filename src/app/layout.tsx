import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Product Catalog",
  description: "Browse our amazing product catalog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <h1 className="text-2xl font-bold text-primary-600">
                Product Catalog
              </h1>
              <nav>
                <a
                  href="/"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  All Products
                </a>
              </nav>
            </div>
          </div>
        </header>
        <main className="min-h-screen">{children}</main>
        <footer className="bg-gray-800 text-white py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p>&copy; 2024 Product Catalog. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
