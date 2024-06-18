'use client'
import Link from "next/link";

const NoContent = () => {

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#2B2D42] p-20">
            <div className="w-1/2 flex items-center justify-center ml-2">
                <img src="/no-content-page.webp" alt="Imagem de conteúdo não disponível" className="max-w-full h-auto" />
            </div>
            <div className="w-1/2 flex flex-col text-[#EDF2F4] mr-2">
                <p className="text-4xl font-bold mb-4 text-white text-right">Nenhum conteúdo disponível</p>
                <p className="text-right mb-4">Nós não conseguimos encontrar o que você estava procurando. Tente procurar novamente.</p>
                <Link href="/login" className="text-right">
                    <p className='inline-block px-4 py-2 rounded bg-[#D90429] hover:bg-[#EF233C] font-bold text-[#EDF2F4] cursor-pointer'>Voltar</p>
                </Link>
            </div>
        </div>
    );
};

export default NoContent;

