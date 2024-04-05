import axios from 'axios';

// export const getStudents = async () => {
//   try {
//     const response = await axios.get('http://localhost:3000/students');
//     // console.log(response.data);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };

export const login = async (user: Object) => {
  try {
    return await axios.get('http://localhost:3003/auth/login', user);
  } catch (error) {
    console.error(error);
  }
};

  export const signUp = async (user: Object) => {
    try {
      return await axios.post('http://localhost:3003/auth/signup', user);
    } catch (error) {
      console.error(error);
    }
};

// export const deleteStudent = async (id: any) => {
//   try {
//     console.log(id);
//     return await axios.delete(`http://localhost:3000/students/${id}`);
//   } catch (error) {
//     console.error(error);
//   }
// };
