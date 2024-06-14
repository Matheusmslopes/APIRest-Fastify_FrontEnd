'use client'

import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

const Home = () => {
  const { isAuthenticated, isAdmin } = useContext(AuthContext);

  return (
    <main className="text-white">
      <section className="relative w-full h-screen bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('/bg-hero-section-2.jpg')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative flex flex-col items-center justify-center h-full text-center px-4">
          <div className="max-w-[60%] mx-auto">
            <h1 className="text-2xl md:text-6xl mb-6 font-bold">Bem-vindo ao Cabaré</h1>
            <p className="text-[#ffffff] leading-relaxed mb-12">
              Explore o vasto catálogo de filmes disponíveis no Cabaré e mergulhe em uma experiência cinematográfica única. Descubra novos favoritos e encontre filmes que vão te surpreender a cada sessão.
            </p>
            {isAuthenticated
              ? <Link href={'/movie'} className="text-[#ffffff] font-bold px-8 py-4 bg-[#9e0b0f] px-4 py-2 rounded transition">Ver filmes</Link>
              : <div></div>}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-[#9e0b0f]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:space-x-6">
          <div className="flex-1 mb-4 md:mb-0">
            <h2 className="text-2xl font-semibold mb-10 text-white">O que é esta API?</h2>
            <p className="text-[#e6b8b7]">
              Esta API oferece acesso a informações detalhadas sobre uma variedade de filmes. Explore nosso banco de dados para descobrir detalhes como data de lançamento, sinopse e muito mais.
            </p>
          </div>
          <div className="flex-1">
            <img src="/info-section.jpg" alt="Imagem relacionada a API" className="w-full rounded-lg" />
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-[#7b3d43]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:space-x-6">
          <div className="flex-1 mb-4 md:mb-0 order-2 md:order-1">
            <img src="/api-section.jpg" alt="Imagem relacionada a funcionalidades" className="w-full rounded-lg" />
          </div>
          <div className="flex-1 order-1 md:order-2">
            <h2 className="text-2xl font-semibold mb-10 text-white">Funcionalidades Principais</h2>
            <p className='text-[#e6b8b7] mb-4'><strong className='text-[#ffd700]'>Explorar Catálogo de Filmes:</strong> Navegue pela lista completa de filmes disponíveis, com informações detalhadas sobre cada título.</p>
            <p className='text-[#e6b8b7] mb-4'><strong className='text-[#ffd700]'>Filtrar por Gêneros:</strong> Escolha entre uma variedade de gêneros para explorar filmes específicos de seu interesse.</p>
            <p className='text-[#e6b8b7]'><strong className='text-[#ffd700]'>Inserir Novos Filmes:</strong> Adicione novos títulos ao banco de dados da API para expandir constantemente o catálogo disponível.</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
