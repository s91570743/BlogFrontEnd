import axios from "axios";

const localURL : string = "http://localhost:8080";

export const postLoginAdmin: any = async (data:{email: string , password: string}) => await axios.post(`${localURL}/users/login`, data);
