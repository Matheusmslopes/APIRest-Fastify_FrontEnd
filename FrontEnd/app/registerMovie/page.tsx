"use client";

import { useContext } from "react";
import { useForm } from 'react-hook-form';
import { MovieContext, Movie } from "@/context/MovieContext";
import { useRouter } from "next/navigation";

const InsertMovieFunction = () => {
    const { register, handleSubmit } = useForm<Movie>();
    const movieContext = useContext(MovieContext);
    const { insertMovie, movieError } = movieContext;
    const router = useRouter();  

    const handleMovie = (data: Movie) => {
        insertMovie(data);
        router.push('/movie');
    }

    return (
        <div className="flex justify-center items-center h-screen bg-[#3f3c37]">
            <div className="w-full max-w-md p-6 bg-[#201F1B] rounded-lg shadow-md">
                <form className="flex flex-col" onSubmit={handleSubmit(handleMovie)}>
                    <label htmlFor="title" className="mb-2 text-[#ffffff]">Título:</label>
                    <input
                        {...register('title')}
                        type="text"
                        name="title"
                        id="title"
                        className="px-3 py-2 border rounded-md mb-4"
                        placeholder="title"
                    />
                    <label htmlFor="synopsis" className="mb-2 text-white">Sinopse:</label>
                    <input
                        {...register('synopsis')}
                        type="text"
                        name="synopsis"
                        id="synopsis"
                        className="px-3 py-2 border rounded-md mb-4"
                        placeholder="synopsis"
                    />
                    <label htmlFor="img_url" className="mb-2 text-white">URL da imagem:</label>
                    <input
                        {...register('img_url')}
                        type="text"
                        name="img_url"
                        id="img_url"
                        className="px-3 py-2 border rounded-md mb-4"
                        placeholder="img_url"
                    />
                    <label htmlFor="release" className="mb-2 text-white">Data de lançamento:</label>
                    <input
                        {...register('release')}
                        type="text"
                        name="release"
                        id="release"
                        className="px-3 py-2 border rounded-md mb-4"
                        placeholder="release"
                    />
                    <label htmlFor="genre_id" className="mb-2 text-white">Gênero:</label>
                    <input
                        {...register('genre_id')}
                        type="text"
                        name="genre_id"
                        id="genre_id"
                        className="px-3 py-2 border rounded-md mb-4"
                        placeholder="genre_id"
                    />
                    <input
                        type="submit"
                        value="Criar"
                        className="bg-[#ff5e1e] text-white py-2 px-4 rounded-md hover:bg-[#ff8052] cursor-pointer"
                    />
                </form>
                {movieError && <p className="text-red-500 mt-2">{movieError}</p>}
            </div>
        </div>
    );
}

export default InsertMovieFunction;