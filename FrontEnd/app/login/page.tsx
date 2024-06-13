"use client";

import { AuthContext, SignIdData } from "@/context/AuthContext";
import { useForm } from 'react-hook-form';
import { useContext } from "react";

const Login = () => {
    const { register, handleSubmit } = useForm<SignIdData>();
    const { login, authError } = useContext(AuthContext);

    const handleLogin = async (data: SignIdData) => {
        await login(data);
    }

    return (
        <div className="flex justify-center items-center h-screen bg-[#3f3c37]">
            <div className="w-full max-w-md p-6 bg-[#201F1B] rounded-lg shadow-md">
                <form className="flex flex-col" onSubmit={handleSubmit(handleLogin)}>
                    <label htmlFor="username" className="mb-2 text-[#ffffff] ">Usuário:</label>
                    <input
                        {...register('username')}
                        type="text"
                        name='username'
                        id='username'
                        className="px-3 py-2 border rounded-md mb-4"
                        placeholder="username"
                    />
                    <label htmlFor="password" className="mb-2 text-white ">Senha:</label>
                    <input
                        {...register('password')}
                        type="password"
                        name='password'
                        id='password'
                        className="px-3 py-2 border rounded-md mb-4"
                        placeholder="password"
                    />
                    <input
                        type="submit"
                        value="Acessar"
                        className="bg-[#ff5e1e] text-white py-2 px-4 rounded-md hover:bg-[#ff8052] cursor-pointer"
                    />
                </form>
                {/* Exibe erro de autenticação */}
                {authError && <p className="text-red-500 mt-2">{authError}</p>}
            </div>
        </div>
    );
}

export default Login;