"use client";

import { useContext, useState } from "react";
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { User, UserContext } from "@/context/UserContext";
import Link from 'next/link';

const InsertUserFunction = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<User>();
    const userContext = useContext(UserContext);
    const { insertUser, userError } = userContext;
    const router = useRouter();
    
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleUser = async (data: User) => {
        try {
            await insertUser(data);
            setSuccessMessage('Usuário cadastrado com sucesso!');
            router.push('/login');
        } catch (error) {
            console.error('Erro ao cadastrar o usuário:', error);
        }
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen relative w-full h-screen bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('/bg-hero-section-3.jpg')"}}>
            <div className="w-full max-w-md p-6 bg-black bg-opacity-70 rounded-lg shadow-md">
                <form className="flex flex-col" onSubmit={handleSubmit(handleUser)}>
                    <label htmlFor="username" className="mb-2 text-[#ffffff]">Usuário:</label>
                    <input
                        {...register('username', { required: 'username é obrigatório' })}
                        type="text"
                        name="username"
                        id="username"
                        className="px-3 py-2 border rounded-md mb-4"
                        placeholder="username"
                    />
                    {errors.username && <span className="text-red-500">{errors.username.message}</span>}

                    <label htmlFor="password" className="mb-2 text-[#ffffff]">Senha:</label>
                    <input
                        {...register('password', { required: 'password é obrigatório' })}
                        type="password"
                        name="password"
                        id="password"
                        className="px-3 py-2 border rounded-md mb-4"
                        placeholder="password"
                    />
                    {errors.password && <span className="text-red-500">{errors.password.message}</span>}

                    <div className="flex items-center mb-4">
                        <input
                            {...register('admin')}
                            type="checkbox"
                            name="admin"
                            id="admin"
                            className="mr-2"
                        />
                        <label htmlFor="admin" className="text-[#ffffff]">Administrador</label>
                    </div>

                    <input
                        type="submit"
                        value="Criar"
                        className="bg-[#D90429] hover:bg-[#EF233C] text-white py-2 px-4 rounded-md cursor-pointer"
                    />
                </form>
                {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
                {userError && <p className="text-red-500 mt-2">{userError}</p>}
            </div>
            <div className="fixed bottom-4 left-4">
                <Link href="/movie">
                    <p className='inline-block px-4 py-2 rounded bg-[#D90429] hover:bg-[#EF233C] font-bold text-[#ffffff] cursor-pointer'>Voltar</p>
                </Link>
            </div>
        </div>
    );
}

export default InsertUserFunction;