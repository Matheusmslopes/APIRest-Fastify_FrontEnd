"use client";

import { useContext, useState } from "react";
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Genre, GenreContext } from "@/context/GenreContext";
import Link from 'next/link';

const InsertGenreFunction = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Genre>();
    const genreContext = useContext(GenreContext);
    const { insertGenre, genreError } = genreContext;
    const router = useRouter();
    
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleGenre = async (data: Genre) => {
        try {
            await insertGenre(data);
            setSuccessMessage('Gênero cadastrado com sucesso!');
            router.push('/movie');
        } catch (error) {
            console.error('Erro ao cadastrar o gênero:', error);
        }
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-[#3f3c37]">
            <div className="w-full max-w-md p-6 bg-[#201F1B] rounded-lg shadow-md">
                <form className="flex flex-col" onSubmit={handleSubmit(handleGenre)}>
                    <label htmlFor="style" className="mb-2 text-[#ffffff]">Gênero:</label>
                    <input
                        {...register('style', { required: 'Gênero é obrigatório' })}
                        type="text"
                        name="style"
                        id="style"
                        className="px-3 py-2 border rounded-md mb-4"
                        placeholder="Gênero"
                    />
                    {errors.style && <span className="text-red-500">{errors.style.message}</span>}

                    <input
                        type="submit"
                        value="Criar"
                        className="bg-[#ff5e1e] text-white py-2 px-4 rounded-md hover:bg-[#ff8052] cursor-pointer"
                    />
                </form>
                {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
                {genreError && <p className="text-red-500 mt-2">{genreError}</p>}
            </div>
            <div className="fixed bottom-4 left-4">
                <Link href="/movie">
                    <p className='inline-block px-4 py-2 rounded bg-[#ff5e1e] font-bold text-[#ffffff] cursor-pointer'>Voltar</p>
                </Link>
            </div>
        </div>
    );
}

export default InsertGenreFunction;