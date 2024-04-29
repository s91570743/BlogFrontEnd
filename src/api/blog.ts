import axios from "axios";

const localURL : string = "http://localhost:8080";

export const crateBlog =  async (data:any) => await axios.post(`${localURL}/blog`, data);
export const updateBlog =  async (id:any,data:any) => await axios.post(`${localURL}/blog/${id}`, data);
export const getBlogs =  async () => await axios.get(`${localURL}/blog`,);
export const getBlogByID = async(id:any) => await axios.get(`${localURL}/blog/${id}`);

export const removeBlogByID = async(id:any) => await axios.delete(`${localURL}/blog/${id}`);