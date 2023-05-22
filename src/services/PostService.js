import axios from "axios";

export const PostService = {
  async getAllPosts() {
    const response = await axios.get(
      "https://webstar-post-app.onrender.com/api/post"
    );
    return response.data;
  },
  async createPost(formData, token) {
    const response = await axios.post(
      "https://webstar-post-app.onrender.com/api/post",
      formData,
      {
        headers: {
          access_token: token,
        },
      }
    );
    return response.data;
  },
  async deletePost(id, token) {
    const response = await axios.delete(
      `https://webstar-post-app.onrender.com/api/post/${id}`,
      {
        headers: {
          access_token: token,
        },
      }
    );
    return response.data;
  },
  async updatePost(id, data, token) {
    const response = await axios.put(
      `https://webstar-post-app.onrender.com/api/post/${id}`,
      data,
      {
        headers: {
          access_token: token,
        },
      }
    );
    return response.data;
  },
  async getPostById(id) {
    const response = await axios.get(
      `https://webstar-post-app.onrender.com/api/post/${id}`
    );
    return response.data;
  },
  async getMyPosts(token) {
    const response = await axios.get(
      "https://webstar-post-app.onrender.com/api/my",
      {
        headers: {
          access_token: token,
        },
      }
    );
    return response.data;
  },
  async getLike(id, token) {
    const response = await axios.get(
      `https://webstar-post-app.onrender.com/api/like/${id}`,
      {
        headers: {
          access_token: token,
        },
      }
    );
    return response.data;
  },
  async getDislike(id, token) {
    const response = await axios.get(
      `https://webstar-post-app.onrender.com/api/dislike/${id}`,
      {
        headers: {
          access_token: token,
        },
      }
    );
    return response.data;
  },
};
