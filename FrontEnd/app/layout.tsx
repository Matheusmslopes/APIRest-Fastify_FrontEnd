'use client'

import { useContext } from "react";
import AuthProvider, { AuthContext } from "@/context/AuthContext";
import MovieProvider from "@/context/MovieContext";
// import type { Metadata } from "next";
import "./globals.css";
import GenreProvider from "@/context/GenreContext";
import UserProvider from "@/context/UserContext";

// export const metadata: Metadata = {
//   title: "Cabaré",
//   description: "O seu destino preferido para assistir filmes de qualidade.",
// };

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  const { isAuthenticated, isAdmin } = useContext(AuthContext);

  return (
    <html lang="pt_br">
      <body className={'bg-[#000000]'}>
        <AuthProvider>
          <MovieProvider>
            <GenreProvider>
              <UserProvider>
                <header className=" w-full z-50 sticky">
                  <nav className="container mx-auto flex items-center justify-between p-4">
                    <div className="flex items-center space-x-4">
                      <a href="/" className="text-xl text-white font-bold mr-10">Cabaré</a>
                      {isAuthenticated && isAdmin ? 
                      <ul className="flex space-x-4">
                        <li>
                          <a href="/registerMovie" className="hover:text-[#ffffff] text-[#ccc6ba]">Movies</a>
                        </li>
                        <li>
                          <a href="/registerGenre" className="hover:text-[#ffffff] text-[#ccc6ba]">Genres</a>
                        </li>
                        <li>
                          <a href="/registerUser" className="hover:text-[#ffffff] text-[#ccc6ba]">Users</a>
                        </li>
                      </ul>
                      : <ul className="flex space-x-4 text-white"><li>a</li><li>b</li><li>c</li><li>d</li></ul>}
                    </div>
                    <div className="flex items-center">
                      <a href="/login" className="text-[#ffffff] font-bold px-4 py-2 bg-[#ffd700] px-4 py-2 rounded transition">
                        Login
                      </a>
                    </div>
                  </nav>
                </header>
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
