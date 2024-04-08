import axios from 'axios';


export const createlocation=(obj:any)=>axios.post(`http://localhost:3003/locations`,obj)