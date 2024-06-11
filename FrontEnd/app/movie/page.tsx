'use client';
import { useState, useEffect } from 'react';

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
    <main className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
    <div id="filters" className="mb-4">
      <button onClick={() => filterMovies('all')} className="bg-blue-500 text-white py-2 px-4 m-2 rounded hover:bg-blue-700">Todos</button>
      {genreList.map(genre => (
        <button 
          key={genre._id} 
          onClick={() => filterMovies(genre._id)} 
          className="bg-blue-500 text-white py-2 px-4 m-2 rounded hover:bg-blue-700">
          {genre.style}
        </button>
      ))}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {filteredMovies.map(({ _id, title, synopsis }) => (
        <div key={_id} className="bg-white border border-gray-300 rounded p-4 shadow-md">
          <p className="text-xl font-semibold mb-2">{title}</p>
          <p className="text-gray-600">Sinopse: {synopsis}</p>
        </div>
      ))}
    </div>
  </main>
  );
};

export default Movies;