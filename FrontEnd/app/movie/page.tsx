'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { useRouter } from 'next/navigation';
import Image from 'next/image';

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
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [genreList, setGenreList] = useState<Genre[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const { isAuthenticated, isAdmin } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

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
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return <p className="text-center text-[#EDF2F4]">Você precisa estar logado para ver esta página</p>;
  if (isLoading) return <p className="text-center text-[#EDF2F4]">Loading...</p>;
  if (!movieList.length) return <p className="text-center text-[#EDF2F4]">No movies available</p>;
  if (!genreList.length) return <p className="text-center text-[#EDF2F4]">No genres available</p>;

  const filterMovies = (genre: string) => {
    setSelectedGenre(genre);
  };

  const filteredMovies = selectedGenre === 'all'
    ? movieList
    : movieList.filter(movie => movie.genre_id === selectedGenre);

  return (
    <main className="flex flex-col items-center p-4 bg-[#2B2D42] min-h-screen">
      <div id="filters" className="mb-4">
        <button onClick={() => filterMovies('all')} className="bg-[#D90429] text-[#EDF2F4] py-2 px-4 m-2 rounded hover:bg-[#EF233C] cursor-pointer">Todos</button>
        {genreList.map(genre => (
          <button
            key={genre._id}
            onClick={() => filterMovies(genre._id)}
            className="bg-[#D90429] text-[#EDF2F4] py-2 px-4 m-2 rounded hover:bg-[#EF233C] cursor-pointer">
            {genre.style}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {filteredMovies.map(({ _id, title, synopsis, release, genre_id, img_url }) => (
          <div key={_id} className="bg-black bg-opacity-70 rounded p-4 shadow-2xl flex">
            <div className="w-1/2 relative">
              <Image src={img_url} alt={title} layout="fill" objectFit="cover" className="rounded-l" />
            </div>
            <div className="w-1/2 p-4">
              <p className="text-2xl font-semibold mb-2 text-[#EDF2F4]">{title}</p>
              <p className="text-[#EDF2F4]"><span className="font-semibold">Sinopse:</span> {synopsis}</p>
              <p className="text-[#EDF2F4]"><span className="font-semibold">Lançamento:</span> {release}</p>
              <p className="text-[#EDF2F4]"><span className="font-semibold">Gênereo:</span> {genreList.map(genre => genre._id === genre_id ? genre.style : "no genres available")}</p>
            </div>
          </div>
        ))}
        {/* {filteredMovies.map(({ _id, title, synopsis, img_url }) => (
          <div key={_id} className="bg-black bg-opacity-70 rounded p-4 shadow-2xl">
            <p className="text-xl font-semibold mb-2 text-[#EDF2F4]">{title}</p>
            <p className="text-[#EDF2F4]">Sinopse: {synopsis}</p>
            <p className="text-[#EDF2F4]"> {img_url}</p>
            {/* <Image src={img_url} alt=""></Image> */}
      </div>
    </main >
  );
};

export default Movies;