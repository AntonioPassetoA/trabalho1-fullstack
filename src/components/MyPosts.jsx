import React from 'react';
import { useUser } from '../contexts/UserContext';

function MyPosts() {
  const { createdPosts } = useUser();

  return (
    <div className="post-list">
      <h2>Meus Posts Criados</h2>
      {createdPosts.length === 0 ? (
        <p>Você ainda não criou nenhum post.</p>
      ) : (
        <ul>
          {createdPosts.map((post) => (
            <li key={post.id} className="post-item">
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyPosts;
