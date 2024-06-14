"use client";

import { createContext, useState } from "react";
import { request } from '../services/request';
import { setCookie } from 'nookies';
import { useRouter } from "next/navigation";

export type SignIdData = {
    username: string;
    password: string;
    admin: boolean;
}

type AuthContextType = {
    login: (data: SignIdData) => void;
    authError: string | null;
    isAuthenticated: boolean;
    isAdmin: boolean;
}

type UserAuthentication = {
    'x-access-token': string;
    'admin-token': string;
}

export const AuthContext = createContext({} as AuthContextType);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [authError, setAuthError] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    const router = useRouter();

    async function login({ username, password }: SignIdData) {
        try {
            const { 'x-access-token': token, 'admin-token': adminToken } = await request<UserAuthentication>('http://127.0.0.1:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password }),
                referrerPolicy: 'no-referrer',
                cache: 'no-store'
            });

            if (!token) {
                setAuthError('Autenticação falhou. Por favor, verifique suas credenciais.');
                return;
            } else {
                setCookie(null, 'auth.token', token, {
                    maxAge: 60 * 60 * 1,
                });
                setCookie(null, 'auth.admin-token', adminToken, {
                    maxAge: 60 * 60 * 1,
                });

                setIsAuthenticated(true);

                if(adminToken) setIsAdmin(true);
    
                router.push('/');
            }
            
        } catch (error) {
            setAuthError('Ocorreu um erro ao tentar fazer login.');
        }
    }

    return (
        <AuthContext.Provider value={{ login, authError, isAuthenticated, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
}