"use client";

import { useForm, UseFormGetValues } from 'react-hook-form';
import { useState } from 'react';
import { Movie } from "@/context/MovieContext";

interface ModalProps {
    _id: string;
    title: string;
    synopsis: string;
    release: string;
    img_url: string;
    genre_id: string;
    onClose: () => void;
    onUpdate: (data: Movie) => void;
}

interface Genre {
    _id: string;
    style: string;
}

const Modal = ({ _id, title, synopsis, release, img_url, genre_id, onClose, onUpdate }: ModalProps) => {
    const { register, handleSubmit } = useForm<Movie>({ defaultValues: { _id, title, synopsis, release, img_url, genre_id } });
    const [genreList, setGenreList] = useState<Genre[]>([]);

    const fetchGenres = async () => {
        try {
            const genresRes = await fetch('http://127.0.0.1:3000/genres');

            if (!genresRes.ok) {
                throw new Error('Failed to fetch data');
            }

            const genres = await genresRes.json();

            setGenreList(genres);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }; fetchGenres();

    const onSubmit = (data: Movie) => {
        onUpdate(data);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-black bg-opacity-70 absolute inset-0" onClick={onClose}></div>
            <div className="w-full max-w-md p-6 bg-[#2B2D42] rounded-lg shadow-lg z-50">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-white">Título:</label>
                        <input
                            {...register('title')}
                            type="text"
                            id="title"
                            defaultValue={title}
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label htmlFor="synopsis" className="block text-white">Sinopse:</label>
                        <textarea
                            {...register('synopsis')}
                            id="synopsis"
                            defaultValue={synopsis}
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label htmlFor="img_url" className="block text-white">Url do banner:</label>
                        <input
                            {...register('img_url')}
                            type="text"
                            id="img_url"
                            defaultValue={img_url}
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <label htmlFor="release" className="block text-white">Data de lançamento:</label>
                            <input
                                {...register('release')}
                                type="date"
                                id="release"
                                defaultValue={release}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="genre_id" className="block text-white">Gênero:</label>
                            <select
                                {...register('genre_id')}
                                id="genre_id"
                                defaultValue={genre_id}
                                className="w-full px-3 py-2 border rounded-md"
                            >
                                {genreList.map(genre => (
                                    <option key={genre._id} value={genre.style}>
                                        {genre.style}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <button type="button" onClick={onClose} className="flex-1 py-2 px-4 bg-[#8D99AE] text-[#2B2D42] text-center rounded-md hover:bg-gray-400 cursor-pointer">
                            Cancelar
                        </button>
                        <button type="submit" className="flex-1 text-center text-[#ffffff] py-2 px-4 rounded-md bg-[#D90429] hover:bg-[#EF233C] cursor-pointer">
                            Atualizar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;
