"use client";

import { AuthContext, SignIdData } from "@/context/AuthContext";
import { useForm } from 'react-hook-form';
import { useContext } from "react";
import Link from 'next/link';

const Login = () => {
    const { register, handleSubmit } = useForm<SignIdData>();
    const { login, authError } = useContext(AuthContext);

    const handleLogin = async (data: SignIdData) => {
        await login(data);
    }

    return (
        <div className="flex justify-center items-center h-screen bg-[#3f3c37] relative w-full h-screen bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('/bg-hero-section-2.jpg')" }}>
            <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
            <div className="w-full max-w-md p-6 bg-black bg-opacity-70 rounded-lg shadow-md z-20">
                <form className="flex flex-col" onSubmit={handleSubmit(handleLogin)}>
                    <label htmlFor="username" className="mb-2 text-[#ffffff]">Usuário:</label>
                    <input
                        {...register('username')}
                        type="text"
                        name='username'
                        id='username'
                        className="px-3 py-2 border rounded-md mb-4 text-[#000000] placeholder-[#ccc6ba]::placeholder"
                        placeholder="username"
                    />
                    <label htmlFor="password" className="mb-2 text-[#ffffff]">Senha:</label>
                    <input
                        {...register('password')}
                        type="password"
                        name='password'
                        id='password'
                        className="px-3 py-2 border rounded-md mb-4 text-[#000000] placeholder-[#ccc6ba]::placeholder"
                        placeholder="password"
                    />
                    <input
                        type="submit"
                        value="Acessar"
                        className="text-[#ffffff] py-2 px-4 rounded-md bg-[#9e0b0f] cursor-pointer"
                    />

                    <Link href={'/registerUser'} className="inline-block px-4 py-2 rounded bg-[#ff5e1e] font-bold text-[#ffffff] cursor-pointer">Criar Conta</Link>
                </form>
                {/* Exibe erro de autenticação */}
                {authError && <p className="text-red-500 mt-2">{authError}</p>}
            </div>
        </div>
    );
}

export default Login;
