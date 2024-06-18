"use client";

import { createContext, useState, useEffect } from 'react';
import { request } from '../services/request';
import { parseCookies } from 'nookies';

export type Genre = {
    _id: string;
   style: string
}

type GenreContextType = {
    insertGenre: (data: Genre) => void;
    genreError: string | null;
}

export const GenreContext = createContext({} as GenreContextType);

export default function GenreProvider({ children }: { children: React.ReactNode }) {
    const [genreError, setGenreError] = useState<string | null>(null);

    async function insertGenre({ style }: Genre) {
            const cookies = parseCookies();
            const token = cookies['auth.token'];
            const adminToken = cookies['auth.admin-token'];
            
            try {
                const response = await request<{}>('http://127.0.0.1:3000/genres', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': token,
                        'admin-token': adminToken
                    },
                    body: JSON.stringify({ style }),
                    referrerPolicy: 'no-referrer',
                    cache: 'no-store'
                });
                console.log('Response:', response); 
            } catch (error) {
                console.error('Insert Movie Error:', error);
            }
        }
    

    return (
        <GenreContext.Provider value={{ insertGenre, genreError }}>
            {children}
        </GenreContext.Provider>
    );
}