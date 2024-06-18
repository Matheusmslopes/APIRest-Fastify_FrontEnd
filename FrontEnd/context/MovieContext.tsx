"use client";

import { createContext, useState } from 'react';
import { request } from '../services/request';
import { parseCookies } from 'nookies';

export type Movie = {
    _id: string;
    title: string;
    synopsis: string;
    release: string;
    img_url: string;
    genre_id: string;
}

type MovieContextType = {
    insertMovie: (data: Movie) => void;
    updateMovie: (data: Movie) => void;
    deleteMovie: (_id: string) => void;
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
                await request<{}>('http://127.0.0.1:3000/movies', {
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

    async function updateMovie({ _id, title, synopsis, img_url, release, genre_id }: Movie) {
        const cookies = parseCookies();
        const token = cookies['auth.token'];
        const adminToken = cookies['auth.admin-token'];
        console.log(_id)
        console.log(title)
        console.log(synopsis)
        console.log(img_url)
        console.log(release)
        console.log(genre_id)
        try {
            await request<{}>(`http://127.0.0.1:3000/movies/${_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token,
                    'admin-token': adminToken
                },
                body: JSON.stringify({ _id, title, synopsis, img_url, release, genre_id }),
                referrerPolicy: 'no-referrer',
                cache: 'no-store'
            });
        } catch (error) {
            console.error('PUT Movie Error:', error);
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
        <MovieContext.Provider value={{ insertMovie, updateMovie, deleteMovie, movieError }}>
            {children}
        </MovieContext.Provider>
    );
}