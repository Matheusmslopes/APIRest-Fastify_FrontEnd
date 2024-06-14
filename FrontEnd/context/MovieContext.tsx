"use client";

import { createContext, useState, useEffect } from 'react';
import { request } from '../services/request';
import { parseCookies } from 'nookies';

export type Movie = {
    title: string;
    synopsis: string;
    img_url: string;
    release: string;
    genre_id: string;
}

type MovieContextType = {
    insertMovie: (data: Movie) => void;
    movieError: string | null;
}

export const MovieContext = createContext({} as MovieContextType);

export default function MovieProvider({ children }: { children: React.ReactNode }) {
    const [movieError, setMovieError] = useState<string | null>(null);

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
                console.log('Response:', response); // Log the response for debugging
            } catch (error) {
                console.error('Insert Movie Error:', error); // Log any errors
            }
        }
    

    return (
        <MovieContext.Provider value={{ insertMovie, movieError }}>
            {children}
        </MovieContext.Provider>
    );
}