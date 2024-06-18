"use client";
import React, { useState, useContext } from 'react';
import { AuthContext } from "@/context/AuthContext";
import { Movie, MovieContext } from "@/context/MovieContext";
import Modal from '@/components/modal';
import Unauthorizaed from '@/components/unauthorizated';
import Loading from '@/components/loading';
import NoContent from '@/components/noContent';
import Image from 'next/image';

interface Genre {
  _id: string;
  style: string;
}

const Movies = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { updateMovie, deleteMovie } = useContext(MovieContext);

  const [isLoading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [genreList, setGenreList] = useState<Genre[]>([]);

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string>('all');

  const openModal = (movie: Movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const fetchMoviesAndGenres = async () => {
    try {
      const moviesRes = await fetch('http://127.0.0.1:3000/movies');
      const genresRes = await fetch('http://127.0.0.1:3000/genres');

      if (!moviesRes.ok || !genresRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const movies = await moviesRes.json();
      const genres = await genresRes.json();

      setMovieList(movies);
      setGenreList(genres);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  }; fetchMoviesAndGenres();

  const filterMovies = (genre: string) => {
    setSelectedGenre(genre);
  };

  function getGenreStyle(genre_id: string) {
    const genre = genreList.find(genre => genre._id === genre_id);
    return genre ? genre.style : "no genres available";
  };

  const filteredMovies = selectedGenre === 'all'
    ? movieList
    : movieList.filter(movie => movie.genre_id === selectedGenre);

    function handleUpdateMovie(movie: Movie) {
      updateMovie(movie);
    }

  function handleDeleteMovie(_id: string) {
    deleteMovie(_id);
  }

  if (!isAuthenticated) return <Unauthorizaed />;
  if (isLoading) return <Loading />;
  if (!movieList.length) return <NoContent />;
  if (!genreList.length) return <NoContent />;

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
        {filteredMovies.map(movie => (
          <div key={movie._id} className="bg-black bg-opacity-70 rounded p-4 shadow-2xl flex">
            <div className="w-1/2 relative">
              <Image src={movie.img_url} alt={movie.title} layout="fill" objectFit="cover" className="rounded-l" />
            </div>
            <div className="w-1/2 p-4">
              <p className="text-2xl font-semibold mb-2 text-[#EDF2F4]">{movie.title}</p>
              <p className="text-[#EDF2F4]"><span className="font-semibold">Sinopse:</span> {movie.synopsis}</p>
              <p className="text-[#EDF2F4]"><span className="font-semibold">Lançamento:</span> {movie.release}</p>
              <p className="text-[#EDF2F4]"><span className="font-semibold">Gênero:</span> {getGenreStyle(movie.genre_id)}</p>
              <div>
                <button onClick={() => openModal(movie)} className='text-center text-[#EDF2F4] py-2 px-4 rounded-md bg-[#D90429] hover:bg-[#EF233C] cursor-pointer'>Atualizar Filme</button>
                <button onClick={() => handleDeleteMovie(movie._id)} className='text-center text-[#EDF2F4] py-2 px-4 rounded-md bg-[#D90429] hover:bg-[#EF233C] cursor-pointer'>Deletar Filme</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && selectedMovie && (
        <Modal
          _id={selectedMovie._id}
          title={selectedMovie.title}
          synopsis={selectedMovie.synopsis}
          release={selectedMovie.release}
          img_url={selectedMovie.img_url}
          genre_id={selectedMovie.genre_id}
          onClose={closeModal}
          onUpdate={handleUpdateMovie}
        />
      )}
    </main >
  );
};

export default Movies;