import React, { useState } from 'react';
import axios from 'axios';

function CreatePost({ onPostCreated }) {
  const [content, setContent] = useState('');
  const [image_url, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('https://yappers-yevm.onrender.com/api/posts', {
        content,
        image_url
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setContent('');
      setImageUrl('');
      onPostCreated();
    } catch (err) {
      alert('Failed to create post');
    }
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h5 className="card-title mb-3">Create a Post 📝</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <textarea
              className="form-control"
              rows="3"
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <input
              type="url"
              className="form-control"
              placeholder="Image URL (optional)"
              value={image_url}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Post ✨
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
