# APIRest-Fastify - Plataforma Integrada de Gestão de Filmes, Gêneros e Usuários

Este projeto acadêmico consiste em uma aplicação web para gerenciamento de `filmes`, `gêneros` e `usuários`, utilizando uma API REST como backend e uma aplicação frontend para interação com o usuário.

Foram lançadas releases à medida do desenvolvimento do projeto. O projeto teve continuação após o prazo de entrega estipulado pelo professor, visando alçancar a excelência. Para fins de correção do projeto acadêmico, utilizar a release 1.1.1.

### Backend

O backend deste projeto é uma API RESTful desenvolvida com Fastify e MongoDB. 

Ele oferece rotas para manipulação de recursos como `filmes`, `gêneros` e `usuários`, seguindo os princípios RESTful.

#### Como funciona o Backend

O servidor Fastify é responsável por lidar com as requisições HTTP, roteando-as para as funções correspondentes que realizam as operações no banco de dados MongoDB. 

As requisições HTTP podem ser feitas por qualquer cliente HTTP, como ThunderClient ou Postman.

Para mais detalhes sobre como executar o backend, consulte a seção [Executando o Projeto](https://github.com/Matheusmslopes/APIRest-Fastify_FrontEnd/blob/main/BackEnd/README.md) no README específico do backend.

### Frontend

O frontend deste projeto é uma aplicação web desenvolvida com Next.js e React.js. 

Ele consome a API REST fornecida pelo backend e oferece uma interface para interagir com os recursos disponíveis.

#### Funcionalidades do Frontend

* Autenticação de usuários
* Gestão de filmes e gêneros
* Navegação entre diferentes páginas da aplicação

## Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

![Fastify](https://img.shields.io/badge/Fastify-202020?style=for-the-badge&logo=fastify&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

## Instalação
<details>
<summary>Clique aqui!</summary>
<p>

### Pré-requisitos para instalação!

![Git](https://img.shields.io/badge/Git-E34F26?style=for-the-badge&logo=git&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
--------------------------------------------------------------------------------------------

Para começar, clone o repositório do projeto em seu ambiente local. Siga a etapa abaixo:

* Abra o terminal na pasta onde deseja clonar o repositório.

* Clone o repositório para o seu ambiente local usando o seguinte comando:

```git
git clone https://github.com/Matheusmslopes/APIRest-Fastify_FrontEnd.git
```

</p>
</details>

## Executando o Projeto

Para executar o projeto, siga os seguintes passos para o frontend e backend do projeto:

* Navegue até o diretório de cada um e execute o seguinte comando para instalar todas as dependências:

```git
npm install
```

* Após a instalação, você pode executar cada um usando o seguinte comando:

```node
npm run dev
```

### Backend

* Crie um arquivo `.env` no diretório raiz do projeto baseado no arquivo `.env.sample` já existente.
  
* Altere as configurações do arquivo ***.env*** para utilizar os ambientes desejados.

```javascript
STAGE = 'dev'
PORT= '3000'
HOST= '127.0.0.1'
JWT_SECRET= 'Abcd@1234'
DB_URL = 'mongodb://localhost:27017/api_fastify'
```

A API REST estará em execução em `http://127.0.0.1:3000`.

### Frontend

* Necessário executar apenas o seguinte comando:

```node
npm run dev
```

O servidor estará em execução em `http://localhost:3000`.

## Colaboradores

<table>
  <tr>
  <!-- João Lucas -->
    <td align="center">
      <a href="https://github.com/JoaoLucasAssis">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwxCRWlkfeigdbif83ap111RPNlGARl02wOF5OvW9zUA&s" width="100px;" height="100px;" alt="Foto do João Lucas"/><br>
        <sub>
          <b>JoaoLucasAssis</b>
        </sub>
      </a>
    </td>
    </td>
    <!-- Matheus Muruci -->
    <td align="center">
      <a href="https://github.com/Matheusmslopes">
        <img src="https://avatars.githubusercontent.com/u/100313664?v=4" width="100px;" height="100px;" alt="Foto do Matheus Muruci"/><br>
        <sub>
          <b>Matheusmslopes</b>
        </sub>
      </a>
    </td>
    </td>
  </tr>
</table>

## Licença

Este projeto possui uma licença MIT. Sinta-se à vontade para usar, modificar e distribuir este código conforme necessário.