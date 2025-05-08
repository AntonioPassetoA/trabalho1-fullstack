import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PostList from './components/PostList'; // Importando PostList

function App() {
  return (
    <Router>
      <Navbar />
      <div className="content">
        <div className="home-welcome">Bem-vindo à SPA</div>  
        <h2 className="api-description">
          Esta aplicação utiliza a API JSONPlaceholder, um serviço gratuito para testar requisições HTTP.
          Aqui, você pode visualizar posts, aprender sobre APIs RESTful e interagir com os dados exibidos.
        </h2>
        <Routes>
          <Route path="/posts" element={<PostList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
