// App.jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';


// Lazy loading para PostList
const PostList = lazy(() => import('./components/PostList'));
const MyPosts = lazy(() => import('./components/MyPosts'));


function App() {
  return (
    <Router>
      <Navbar />  {/* Aqui está o seu Header de Navegação */}

      <div className="content">
        <Suspense fallback={<div>Carregando...</div>}> {/* Lazy loading */}
          <Routes>
            <Route path="/" element={<div>Bem-vindo à página inicial!</div>} />
            <Route path="/posts" element={<PostList />} />
            <Route path="/home" element={<Home />} />
            <Route path="/meus-posts" element={<MyPosts />} />
            {/* Rota com redirecionamento */}
            <Route path="*" element={<Navigate to="/" />} /> {/* Redireciona para a Home caso a rota não seja encontrada */}
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
