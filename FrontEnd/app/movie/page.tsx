"use client";
import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import { parseCookies } from 'nookies';
import { AuthContext } from "@/context/AuthContext";
import { Movie } from "@/context/MovieContext";
import { useRouter } from 'next/navigation';

interface Genre {
  _id: string;
  style: string;
}

interface FormData {
  title: string;
  synopsis: string;
  release: string;
  genre_id: string;
  img_url: string;
}

const Movies = () => {
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [genreList, setGenreList] = useState<Genre[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const { isAuthenticated, isAdmin } = useContext(AuthContext);
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<FormData>();

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
  };

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    fetchMoviesAndGenres();
  }, [isAuthenticated, router]);

  const deleteMovie = (movieId: string) => {
    const cookies = parseCookies();
    const token = cookies['auth.token'];
    const adminToken = cookies['auth.admin-token'];

    fetch(`http://127.0.0.1:3000/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
        'admin-token': adminToken
      },
    })
    .then((res) => {
      if (res.ok) {
        setMovieList(movieList.filter(movie => movie._id !== movieId));
      } else {
        console.error('Failed to delete movie');
      }
    })
    .catch((error) => {
      console.error('Error deleting movie:', error);
    });
  };

  const onSubmit: SubmitHandler<FormData> = data => {
    if (!editingMovie) return;

    const cookies = parseCookies();
    const token = cookies['auth.token'];
    const adminToken = cookies['auth.admin-token'];

    fetch(`http://127.0.0.1:3000/movies/${editingMovie._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
        'admin-token': adminToken
      },
      body: JSON.stringify(data)
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then(updatedMovie => {
      setMovieList(movieList.map(movie => movie._id === updatedMovie._id ? updatedMovie : movie));
      setEditingMovie(null);
      reset();
    })
    .catch(error => {
      console.error('Error updating movie:', error);
    });
  };

  const filterMovies = (genre: string) => {
    setSelectedGenre(genre);
  };

  const getGenreStyle = (genre_id: string) => {
    const genre = genreList.find(genre => genre._id === genre_id);
    return genre ? genre.style : "no genres available";
  };

  const filteredMovies = selectedGenre === 'all'
    ? movieList
    : movieList.filter(movie => movie.genre_id === selectedGenre);

  if (!isAuthenticated) return <p className="text-center text-[#EDF2F4]">Você precisa estar logado para ver esta página</p>;
  if (isLoading) return <p className="text-center text-[#EDF2F4]">Loading...</p>;
  if (!movieList.length) return <p className="text-center text-[#EDF2F4]">No movies available</p>;
  if (!genreList.length) return <p className="text-center text-[#EDF2F4]">No genres available</p>;

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
              <Link href={`movie/${_id}`}>
                <Image src={img_url} alt={title} layout="fill" objectFit="cover" className="rounded-l" />
              </Link>
            </div>
            <div className="w-1/2 p-4">
              <p className="text-2xl font-semibold mb-2 text-[#EDF2F4]">{title}</p>
              <p className="text-[#EDF2F4]"><span className="font-semibold">Sinopse:</span> {synopsis}</p>
              <p className="text-[#EDF2F4]"><span className="font-semibold">Lançamento:</span> {release}</p>
              <p className="text-[#EDF2F4]"><span className="font-semibold">Gênero:</span> {getGenreStyle(genre_id)}</p>
              <div>
                <button onClick={() => deleteMovie(_id)} className='text-center text-[#EDF2F4] py-2 px-4 rounded-md bg-[#D90429] hover:bg-[#EF233C] cursor-pointer'>Deletar Filme</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      
    </main>
  );
};

export default Movies;