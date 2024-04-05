import axios, { Axios } from "axios";

export const createnotes=(obj:any)=>axios.post(`http://localhost:3003/notes`,obj)

