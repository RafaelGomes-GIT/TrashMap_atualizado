// src/App.js
import React, { useState, useEffect } from 'react';
import { APIProvider } from '@vis.gl/react-google-maps'; // <<< NOVO! Importa o APIProvider
import './App.css'; 

// Importando nossos componentes de "página"
import Home from './pages/Home';
import Caminhoes from './pages/Caminhoes';
import Pontos from './pages/Pontos';
import Enderecos from './pages/Enderecos';
import Usuarios from './pages/Usuarios';

// ⚠️ CHAVE DA API: Substitua "SUA_CHAVE_AQUI" pela sua chave real.
// É altamente recomendado que você use uma variável de ambiente aqui:
// Ex: const GOOGLE_MAPS_KEY = process.env.REACT_APP_GOOGLE_MAPS_KEY;
const GOOGLE_MAPS_KEY = "AIzaSyCBs_5rLELLShtl5MR3lnIqova7IBWDGZg"; // <<< NOVO! Definição da chave

function App() {
  // Lógica de Autenticação (do index.html)
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('userLoggedIn');
    const userProfile = localStorage.getItem('userProfile');

    if (isLoggedIn !== 'true' || (userProfile !== 'ADMIN' && userProfile !== 'MODERADOR')) {
      alert('Você precisa fazer login com um perfil válido para acessar o painel.');
      window.location.href = '/login.html';
    }
  }, []);

  // Agora o "state" guarda o COMPONENTE ATIVO
  const [ActiveComponent, setActiveComponent] = useState(() => Home); // Começa com o <Home />

  // Esta função agora é um "roteador" de componentes
  function loadPage(pageName) {
    switch (pageName) {
      case 'caminhoes':
        setActiveComponent(() => Caminhoes);
        alert('Componente Caminhoes ainda não criado');
        break;
      case 'pontos':
        setActiveComponent(() => Pontos);
        // Não mostrar alerta aqui, pois vamos implementar o mapa em Pontos.js!
        // alert('Componente Pontos ainda não criado'); 
        break;
      case 'enderecos':
        setActiveComponent(() => Enderecos);
        alert('Componente Enderecos ainda não criado');
        break;
      case 'usuarios':
        setActiveComponent(() => Usuarios);
        alert('Componente Usuarios ainda não criado');
        break;
      default:
        setActiveComponent(() => Home);
    }
  }

  // Lógica de Logout
  function logout() {
    localStorage.clear();
    alert('Você foi desconectado.');
    window.location.href = '/login.html';
  }

  // O JSX (HTML)
  return (
    // 2. ENVOLVENDO o conteúdo principal com o APIProvider
    // Isso garante que todos os componentes filhos (incluindo Pontos)
    // possam usar os componentes do Google Maps.
    <APIProvider apiKey={"AIzaSyCBs_5rLELLShtl5MR3lnIqova7IBWDGZg"}> 
      <div className="container">
        {/* Sidebar */}
        <nav className="sidebar">
          <h2>TrashMap</h2>
          <ul>
            {/* Note que o onClick agora chama 'loadPage' */}
            <li><a href="#" onClick={() => loadPage('caminhoes')}>Caminhões</a></li>
            <li><a href="#" onClick={() => loadPage('pontos')}>Pontos de Coleta</a></li>
            <li><a href="#" onClick={() => loadPage('enderecos')}>Endereços</a></li>
            <li><a href="#" onClick={() => loadPage('usuarios')}>Usuários</a></li>
            <li><a href="#" onClick={logout}>Sair</a></li>
          </ul>
        </nav>

        {/* Main Content */}
        <main className="content" id="main-content">
          <ActiveComponent />
        </main>
      </div>
    </APIProvider>
  );
}

export default App;