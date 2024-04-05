import axios from 'axios';

// export const getclients = async (user: Object) => {
//   try {
//     const response = await axios.post('http://localhost:3003/clients');
//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };

export const createcliet=(obj:any)=>axios.post(`http://localhost:3003/client-details`,obj)


// import axios, { Axios } from "axios";

// export const clients = async (user: Object) => {
//   try {
//     return await axios.get('http://localhost:3003/Company/clients', user);
//   } catch (error) {
//     console.error(error);
//   }
// }