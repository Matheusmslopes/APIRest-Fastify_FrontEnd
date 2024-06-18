"use client";

import { useContext, useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Genre, GenreContext } from "@/context/GenreContext";
import Link from 'next/link';
import { AuthContext } from "@/context/AuthContext";

const InsertGenreFunction = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Genre>();
    const genreContext = useContext(GenreContext);
    const { insertGenre, genreError } = genreContext;
    const router = useRouter();
    const { isAuthenticated } = useContext(AuthContext);
    
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    
    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
            return;
        }
    }, [isAuthenticated, router])

    const handleGenre = async (data: Genre) => {
        try {
            await insertGenre(data);
            setSuccessMessage('Gênero cadastrado com sucesso!');
            router.push('/movie');
        } catch (error) {
            console.error('Erro ao cadastrar o gênero:', error);
        }
    }

    if (!isAuthenticated) return <p className="text-center text-[#EDF2F4]">Você precisa estar logado para ver esta página</p>;


    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="w-full max-w-md p-6 bg-black bg-opacity-70 shadow-md rounded-lg shadow-md">
                <form className="flex flex-col" onSubmit={handleSubmit(handleGenre)}>
                    <label htmlFor="style" className="mb-2 text-[#EDF2F4]">Gênero:</label>
                    <input
                        {...register('style', { required: 'Gênero é obrigatório' })}
                        type="text"
                        name="style"
                        id="style"
                        className="px-3 py-2 border rounded-md mb-4"
                        placeholder="Gênero"
                    />
                    {errors.style && <span className="text-[#D90429]">{errors.style.message}</span>}

                    <input
                        type="submit"
                        value="Criar"
                        className="bg-[#D90429] text-[#EDF2F4] py-2 px-4 rounded-md hover:bg-[#EF233C] cursor-pointer"
                    />
                </form>
                {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
                {genreError && <p className="text-red-500 mt-2">{genreError}</p>}
            </div>
            <div className="fixed bottom-4 left-4">
                <Link href="/movie">
                    <p className='inline-block px-4 py-2 rounded bg-[#D90429] hover:bg-[#EF233C] font-bold text-[#EDF2F4] cursor-pointer'>Voltar</p>
                </Link>
            </div>
        </div>
    );
}

export default InsertGenreFunction;