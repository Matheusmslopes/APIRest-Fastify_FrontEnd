'use client'

import Link from "next/link";

const Unauthorizaed = () => {

  return (
    <div className="flex min-h-screen bg-[#2B2D42] p-20">
      <div className="w-1/2 flex flex-col justify-center">
        <p className="text-6xl mb-4 font-bold text-white">401</p>
        <p className="text-4xl text-white font-bold mb-2">Acesso negado</p>
        <p className="text mb-4 text-[#EDF2F4]">Você precisa estar logado para ver esta página.</p>
        <Link href="/login">
          <p className='inline-block px-4 py-2 rounded bg-[#D90429] hover:bg-[#EF233C] font-bold text-[#EDF2F4] cursor-pointer'>Voltar</p>
        </Link>
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <img src="/unauthorized-page-3.png" alt="Imagem relacionada a funcionalidades" className="w-full h-full object-contain rounded-lg" />
      </div>
    </div>
  );
};

export default Unauthorizaed;
