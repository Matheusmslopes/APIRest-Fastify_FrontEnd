'use client'

import AuthProvider from "@/context/AuthContext";
import MovieProvider from "@/context/MovieContext";
import GenreProvider from "@/context/GenreContext";
import UserProvider from "@/context/UserContext";
import NavBar from "@/components/navbar";
import "./globals.css";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="pt_br">
      <body className="bg-[#2B2D42]">
        <AuthProvider>
          <MovieProvider>
            <GenreProvider>
              <UserProvider>
                <NavBar />
                {children}
              </UserProvider>
            </GenreProvider>
          </MovieProvider>
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
