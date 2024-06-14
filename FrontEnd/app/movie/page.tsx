'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

interface Movie {
  _id: string;
  title: string;
  synopsis: string;
  img_url: string;
  release: string;
  genre_id: string;
}

interface Genre {
  _id: string;
  style: string;
}

const Movies = () => {
  const[movieList, setMovieList] = useState<Movie[]>([]);
  const[genreList, setGenreList] = useState<Genre[]>([]);
  const[isLoading, setLoading] = useState(true);
  const[selectedGenre, setSelectedGenre] = useState<string>('all');
  const { isAuthenticated, isAdmin } = useContext(AuthContext);

  useEffect(() => {
    fetch('http://127.0.0.1:3000/movies')
      .then((res) => res.json())
      .then((data) => {
        setMovieList(data);
        setLoading(false);
      });
      
    fetch('http://127.0.0.1:3000/genres')
    .then((res) => res.json())
    .then((data) => {
      setGenreList(data);
    });
  }, []);

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (!movieList.length) return <p className="text-center">No movies available</p>;
  if (!genreList.length) return <p className="text-center">No genres available</p>;

  const filterMovies = (genre: string) => {
    setSelectedGenre(genre);
  };

  const filteredMovies = selectedGenre === 'all'
    ? movieList
    : movieList.filter(movie => movie.genre_id === selectedGenre);

  return (
    <main className="flex flex-col items-center p-4 bg-[#3f3c37] min-h-screen">
    <div id="filters" className="mb-4">
      <button onClick={() => filterMovies('all')} className="bg-[#ff5e1e] text-white py-2 px-4 m-2 rounded hover:bg-[#ff8052]">Todos</button>
      {genreList.map(genre => (
        <button 
          key={genre._id} 
          onClick={() => filterMovies(genre._id)} 
          className="bg-[#ff5e1e] text-white py-2 px-4 m-2 rounded hover:bg-[#ff8052]">
          {genre.style}
        </button>
      ))}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {filteredMovies.map(({ _id, title, synopsis }) => (
        <div key={_id} className="bg-[#201f1b] border border-[#201f1b] rounded p-4 shadow-md">
          <p className="text-xl font-semibold mb-2 text-[#ffffff]">{title}</p>
          <p className="text-[#ccc6ba]">Sinopse: {synopsis}</p>
        </div>
      ))}
    </div>
    <div className="flex space-x-4 mt-4">
      {isAuthenticated && isAdmin
              ? <Link href={'/registerMovie'} className="inline-block px-4 py-2 rounded bg-[#ff5e1e] font-bold text-[#ffffff] cursor-pointer">Cadastrar Filmes</Link>
              : <div></div>}
      {isAuthenticated && isAdmin
              ? <Link href={'/registerGenre'} className="inline-block px-4 py-2 rounded bg-[#ff5e1e] font-bold text-[#ffffff] cursor-pointer">Cadastrar Gêneros</Link>
              : <div></div>}
    </div>
  </main>
  );
};

export default Movies;