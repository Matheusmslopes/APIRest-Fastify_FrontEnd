"use client";

import { createContext, useState, useEffect } from 'react';
import { request } from '../services/request';
import { parseCookies } from 'nookies';

export type User = {
   username: string;
   password: string;
   admin: boolean
}

type UserContextType = {
    insertUser: (data: User) => void;
    userError: string | null;
}

export const UserContext = createContext({} as UserContextType);

export default function UserProvider({ children }: { children: React.ReactNode }) {
    const [userError, setUserError] = useState<string | null>(null);

    async function insertUser({ username, password, admin }: User) {
            
            try {
                const response = await request<{}>('http://127.0.0.1:3000/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password, admin }),
                    referrerPolicy: 'no-referrer',
                    cache: 'no-store'
                });
                console.log('Response:', response); 
            } catch (error) {
                console.error('Insert User Error:', error);
            }
        }
    

    return (
        <UserContext.Provider value={{ insertUser, userError }}>
            {children}
        </UserContext.Provider>
    );
}