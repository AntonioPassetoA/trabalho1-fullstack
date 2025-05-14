import React, { useState, useEffect, useRef, useMemo } from 'react';
import axios from 'axios';
import './PostList.css';
import { useUser } from '../contexts/UserContext';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostBody, setNewPostBody] = useState('');
  const [formError, setFormError] = useState('');

  const titleInputRef = useRef(null);
  const { addPost } = useUser(); // usamos addPost do contexto

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        setPosts(response.data);
        setLoading(false);

        if (titleInputRef.current) {
          titleInputRef.current.focus();
        }
      })
      .catch(() => {
        setError('Erro ao carregar os posts');
        setLoading(false);
      });
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!newPostTitle || !newPostBody) {
      setFormError('O título e o corpo do post são obrigatórios.');
      return;
    }

    const newPost = {
      title: newPostTitle,
      body: newPostBody
    };

    axios.post('https://jsonplaceholder.typicode.com/posts', newPost)
      .then(response => {
        const post = response.data;
        setPosts([post, ...posts]); // adiciona à lista local
        addPost(post); // salva no contexto
        setNewPostTitle('');
        setNewPostBody('');
        setFormError('');
      })
      .catch(() => {
        setFormError('Erro ao criar o post. Tente novamente.');
      });
  };

  const filteredPosts = useMemo(() => {
    return posts.filter(post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.body.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [posts, searchQuery]);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="post-list">
      <h2>Posts</h2>

      <input 
        type="text" 
        placeholder="Buscar..." 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)} 
        className="search-input" 
      />

      <div>
        <h3>Criar Novo Post</h3>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label>Título:</label>
            <input 
              type="text" 
              value={newPostTitle} 
              onChange={(e) => setNewPostTitle(e.target.value)} 
              ref={titleInputRef}
            />
          </div>
          <div>
            <label>Corpo:</label>
            <textarea 
              value={newPostBody} 
              onChange={(e) => setNewPostBody(e.target.value)} 
            />
          </div>
          <button type="submit">Criar Post</button>
        </form>

        {formError && <p style={{ color: 'red' }}>{formError}</p>}
      </div>

      <ul>
        {filteredPosts.length === 0 ? (
          <li>Não foram encontrados posts para sua busca.</li>
        ) : (
          filteredPosts.map(post => (
            <li key={post.id} className="post-item">
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default PostList;
