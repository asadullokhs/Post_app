import axios from "axios";

export const CommentServices = {
  async addComment(comment, token) {
    const response = await axios.post(
      "https://webstar-post-app.onrender.com/api/comment",
      comment,
      {
        headers: {
          access_token: token,
        },
      }
    );
    return response.data;
  },
  async deleteComment(id, token) {
    const response = await axios.delete(
      `https://webstar-post-app.onrender.com/api/comment/${id}`,
      {
        headers: {
          access_token: token,
        },
      }
    );
    return response.data;
  },
  async updateComment(id, token, content) {
    const response = await axios.put(
      `https://webstar-post-app.onrender.com/api/comment/${id}`,
      content,
      {
        headers: {
          access_token: token,
        },
      }
    );
    return response.data;
  },
};
