import AuthProvider from "@/context/AuthContext";
import MovieProvider from "@/context/MovieContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GenreProvider from "@/context/GenreContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My films",
  description: "My Film Manager",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="pt_br">
        <body className={`bg-slate-100 ${inter.className}`}>
          <AuthProvider>
            <MovieProvider>
              <GenreProvider>
              {children}
              </GenreProvider>
            </MovieProvider>
          </AuthProvider>
        </body>
        
    </html>
  );
};

export default RootLayout;
