"use client";

import { useContext, useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { MovieContext, Movie } from "@/context/MovieContext";
import Link from 'next/link';
import { AuthContext } from "@/context/AuthContext";

const InsertMovieFunction = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Movie>();
    const movieContext = useContext(MovieContext);
    const { insertMovie, movieError } = movieContext;
    const router = useRouter();
    const { isAuthenticated } = useContext(AuthContext);
    
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
            return;
        }
    }, [isAuthenticated, router])

    const handleMovie = async (data: Movie) => {
        try {
            await insertMovie(data);
            setSuccessMessage('Filme cadastrado com sucesso!');
            router.push('/movie');
        } catch (error) {
            console.error('Erro ao cadastrar o filme:', error);
        }
    }

    if (!isAuthenticated) return <p className="text-center text-[#EDF2F4]">Você precisa estar logado para ver esta página</p>;

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-[#2B2D42]">
            <div className="w-full max-w-md p-6 bg-black bg-opacity-70 rounded-lg shadow-md">
                <form className="flex flex-col" onSubmit={handleSubmit(handleMovie)}>
                    <label htmlFor="title" className="mb-2 text-[#EDF2F4]">Título:</label>
                    <input
                        {...register('title', { required: 'Título é obrigatório' })}
                        type="text"
                        name="title"
                        id="title"
                        className="px-3 py-2 border rounded-md mb-4"
                        placeholder="Título"
                    />
                    {errors.title && <span className="text-[#D90429]">{errors.title.message}</span>}

                    <label htmlFor="synopsis" className="mb-2 text-[#EDF2F4]">Sinopse:</label>
                    <input
                        {...register('synopsis', { required: 'Sinopse é obrigatória' })}
                        type="text"
                        name="synopsis"
                        id="synopsis"
                        className="px-3 py-2 border rounded-md mb-4"
                        placeholder="Sinopse"
                    />
                    {errors.synopsis && <span className="text-[#D90429]">{errors.synopsis.message}</span>}

                    <label htmlFor="img_url" className="mb-2 text-[#EDF2F4]">URL da imagem:</label>
                    <input
                        {...register('img_url', { required: 'URL da imagem é obrigatória' })}
                        type="text"
                        name="img_url"
                        id="img_url"
                        className="px-3 py-2 border rounded-md mb-4"
                        placeholder="URL da imagem"
                    />
                    {errors.img_url && <span className="text-[#D90429]">{errors.img_url.message}</span>}

                    <label htmlFor="release" className="mb-2 text-[#EDF2F4]">Data de lançamento:</label>
                    <input
                        {...register('release', { required: 'Data de lançamento é obrigatória' })}
                        type="text"
                        name="release"
                        id="release"
                        className="px-3 py-2 border rounded-md mb-4"
                        placeholder="Data de lançamento"
                    />
                    {errors.release && <span className="text-[#D90429]">{errors.release.message}</span>}

                    <label htmlFor="genre_id" className="mb-2 text-[#EDF2F4]">Gênero:</label>
                    <input
                        {...register('genre_id', { required: 'Gênero é obrigatório' })}
                        type="text"
                        name="genre_id"
                        id="genre_id"
                        className="px-3 py-2 border rounded-md mb-4"
                        placeholder="Gênero"
                    />
                    {errors.genre_id && <span className="text-[#D90429]">{errors.genre_id.message}</span>}

                    <input
                        type="submit"
                        value="Criar"
                        className="bg-[#D90429] text-[#EDF2F4] py-2 px-4 rounded-md hover:bg-[#EF233C] cursor-pointer"
                    />
                </form>
                {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
                {movieError && <p className="text-red-500 mt-2">{movieError}</p>}
            </div>
            <div className="fixed bottom-4 left-4">
                <Link href="/movie">
                    <p className='inline-block px-4 py-2 rounded bg-[#D90429] hover:bg-[#EF233C] font-bold text-[#EDF2F4] cursor-pointer'>Voltar</p>
                </Link>
            </div>
        </div>
    );
}

export default InsertMovieFunction;