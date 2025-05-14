import React, { createContext, useState, useContext } from 'react';

// Criação do Contexto
const UserContext = createContext();

// Componente Provider para envolver a árvore de componentes
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado global do usuário
  const [createdPosts, setCreatedPosts] = useState([]); // Lista de posts criados pelo usuário

  const login = (username) => {
    setUser({ name: username }); // Simula o login
  };

  const logout = () => {
    setUser(null); // Simula o logout
    setCreatedPosts([]); // Limpa os posts ao sair
  };

  const addPost = (post) => {
    setCreatedPosts((prevPosts) => [post, ...prevPosts]);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, createdPosts, addPost }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personalizado para acessar o contexto
export const useUser = () => {
  return useContext(UserContext);
};
