import React, { useEffect, useState } from 'react';
import axios from "axios";
const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    const { token } = JSON.parse(localStorage.getItem('profile'));
    req.headers.Authorization = `Bearer ${token}`;
  }

  // Other interceptor logic (if any)
  return req;
});


export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);

export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value });

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);


const MyApiComponent = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const checkAPIConnection = async () => {
      try {
        await axios.get("http://localhost:5000/posts");
        setIsConnected(true);
      } catch (error) {
        setIsConnected(false);
      }
    };

    checkAPIConnection();
  }, []);

  return (
    <div>
      {isConnected ? (
        <p>API connection successful</p>
      ) : (
        <p>API connection failed</p>
      )}
    </div>
  );
};
export default MyApiComponent;