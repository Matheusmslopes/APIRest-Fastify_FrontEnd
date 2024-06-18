"use client";

import { createContext, useState } from 'react';
import { request } from '../services/request';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/navigation';

export type Movie = {
    _id: string;
    title: string;
    synopsis: string;
    release: string;
    img_url: string;
    genre_id: string;
}

type MovieContextType = {
    // getMovie: (data: Movie) => void;
    insertMovie: (data: Movie) => void;
    deleteMovie: (_id: string) => void;
    movieError: string | null;
}

export const MovieContext = createContext({} as MovieContextType);

export default function MovieProvider({ children }: { children: React.ReactNode }) {
    const [movieError, setMovieError] = useState<string | null>(null);
    const router = useRouter();

    // async function getMovie({ _id }: Movie) {        
    //     try {
    //         return await request<Movie>(`http://127.0.0.1:3000/movies/${_id}`, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             referrerPolicy: 'no-referrer',
    //             cache: 'no-store'
    //         });
    //     } catch (error) {
    //         console.error('Insert Movie Error:', error);
    //     }
    // }

    async function insertMovie({ title, synopsis, img_url, release, genre_id }: Movie) {
            const cookies = parseCookies();
            const token = cookies['auth.token'];
            const adminToken = cookies['auth.admin-token'];
            
            try {
                const response = await request<{}>('http://127.0.0.1:3000/movies', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': token,
                        'admin-token': adminToken
                    },
                    body: JSON.stringify({ title, synopsis, img_url, release, genre_id }),
                    referrerPolicy: 'no-referrer',
                    cache: 'no-store'
                });
            } catch (error) {
                console.error('POST Movie Error:', error);
            }
    }

    async function deleteMovie(_id: string) {
        const cookies = parseCookies();
        const token = cookies['auth.token'];
        const adminToken = cookies['auth.admin-token'];
        
        try {
            await request<{}>(`http://127.0.0.1:3000/movies/${_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token,
                    'admin-token': adminToken
                },
                referrerPolicy: 'no-referrer',
                cache: 'no-store'
            });
        } catch (error) {
            console.error('DELETE Movie Error:', error);
        }
}
    
    return (
        <MovieContext.Provider value={{ insertMovie, deleteMovie, movieError }}>
            {children}
        </MovieContext.Provider>
    );
}