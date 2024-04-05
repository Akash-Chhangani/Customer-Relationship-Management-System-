import axios from 'axios';

export const createoffice=(obj:any)=>axios.post(`http://localhost:3003/office`,obj)