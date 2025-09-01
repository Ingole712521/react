import axios from "axios";

export interface Post {
  userId?: number;
  id?: number;
  title?: string;
  body?: string;
}
const baseURL = "https://jsonplaceholder.typicode.com";
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

export const createPost = async (post: Post): Promise<Post> => {
  const res = await fetch(`${baseURL}/posts`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(post),
  });

  if (!res.ok) {
    throw new Error("failed to create a post");
  }

  return res.json();
};

export const DeletePost = async (id: number): Promise<void> => {
  const res = await fetch(`${baseURL}/posts/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error(`Failed to delete post: ${res.statusText}`);
  }
  return;
};

// ProductGetData
// https://fakestoreapi.com/products
export const getProduct = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    // const data = response.json();
    return response
    console.log(data);
  } catch (error) {
    return { error };
  }
};
