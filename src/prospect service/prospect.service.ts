import axios from 'axios';


export const createprospect=(obj:any)=>axios.post(`http://localhost:3003/prospect`,obj)