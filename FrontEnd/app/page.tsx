import Link from 'next/link';

const Home = () => {
  return (
    <main className="min-h-screen bg-[#3f3c37] flex items-center justify-center">
      <div className="max-w-4xl w-full bg-[#201f1b] shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#ffffff]">API de Filmes</h1>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-[#ffffff]">O que é esta API?</h2>
          <p className="text-[#ccc6ba]">
            Esta API oferece acesso a informações detalhadas sobre uma variedade de filmes. Explore nosso banco de dados para descobrir detalhes como data de lançamento, sinopse e muito mais.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-[#ffffff]">Funcionalidades Principais</h2>
          <ul className="list-disc list-inside text-[#ccc6ba]">
            <li><strong>Explorar Catálogo de Filmes:</strong> Navegue pela lista completa de filmes disponíveis, com informações detalhadas sobre cada título.</li>
            <li><strong>Filtrar por Gêneros:</strong> Escolha entre uma variedade de gêneros para explorar filmes específicos de seu interesse.</li>
            <li><strong>Inserir Novos Filmes:</strong> Adicione novos títulos ao banco de dados da API para expandir constantemente o catálogo disponível.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-2 text-[#ffffff]">Experimente Agora!</h2>
          <p className="text-[#ccc6ba]">
            Explore nosso banco de dados de filmes e encontre novas descobertas cinematográficas.
          </p>
        </section>
        <div className='flex justify-end mt-4'>
          <Link href="/login">
            <p className='inline-block px-4 py-2 rounded bg-[#ff5e1e] font-bold text-[#ffffff] cursor-pointer'>Login</p>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Home;