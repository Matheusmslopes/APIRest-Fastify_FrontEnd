"use client";

// import { useContext } from "react";
import {  MovieContext } from "@/context/MovieContext";

interface ModalProps {
    _id: string;
    title: string;
    synopsis: string;
    release: string;
    img_url: string;
    genre_id: string;
    onClose: () => void; // Função para fechar o modal
  }

const Modal = ({ _id, title, synopsis, release, img_url, genre_id, onClose }: ModalProps) => {
    // const { getMovie } = useContext(MovieContext);

    // function getData(data: Movie) {
    //     getMovie(data);
    // }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-black bg-opacity-70 absolute inset-0"></div>
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg z-50">
                <h2 className="text-2xl font-semibold mb-4">{title}</h2>
                <p className="text-gray-800 mb-2"><strong>Sinopse:</strong> {synopsis}</p>
                <p className="text-gray-800 mb-2"><strong>Lançamento:</strong> {release}</p>
                <p className="text-gray-800 mb-4"><strong>Gênero:</strong> {genre_id}</p>
                <img src={img_url} alt={title} className="w-full rounded-lg mb-4" />
                <div className="flex justify-end">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 cursor-pointer">
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Modal;
