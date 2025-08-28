import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const getPost = () => {
  return api.get("/posts");
};

// post method
export const PostData = (post: any) => {
  return api.post("/posts", post);
};

export const detele = (id: number) => {
  return api.delete(`/posts/${id}`);
};
