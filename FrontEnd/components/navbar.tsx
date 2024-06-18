'use client'

import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";

const NavBar = () => {
  const { isAuthenticated, isAdmin } = useContext(AuthContext);

  return (
    <header className="w-full z-50 bg-[#8D99AE]">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <a href="/" className="text-xl text-white font-bold mr-10">Cabaré</a>
          {isAuthenticated && isAdmin ? (
            <ul className="flex space-x-4">
              <li>
                <Link href="/registerMovie" className="hover:text-[#ffffff] text-[#EDF2F4]">Movies</Link>
              </li>
              <li>
                <Link href="/registerGenre" className="hover:text-[#ffffff] text-[#EDF2F4]">Genres</Link>
              </li>
            </ul>
          ) : (
            <ul className="flex space-x-4 text-white"></ul>
          )}
        </div>
        <div className="flex items-center">
          <a href="/login" className="text-[#ffffff] font-bold px-4 py-2 bg-[#D90429] hover:bg-[#EF233C] rounded transition">
            Login
          </a>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
