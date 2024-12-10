import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});
instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;

  return config;
});

axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
  config.headers['Content-Type'] = `application/json`;

  return config;
});
axios.interceptors.request.use((config) => {
  config.withCredentials = true;
  return config;
});

// instance.interceptors.response.use(async(res) => {
//     const originalRequest = res.request
//     console.log(res.status);
//     if(res.status == 401 ){
//         originalRequest.isRetry = true
//         try {
//             const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/refresh`, {withCredentials: true})
//             console.log(response);
//             localStorage.setItem('accessToken', response.data.accessToken)
//             return instance.request(originalRequest)
//         } catch (error) {
//             console.log("AUTHORIZATION ERROR");
//         }
//     }
//     return res
// }, async (error) => {
//     const originalRequest = error.config
//     if(error.response.status == 401 && !error.config?.isRetry){
//         originalRequest.isRetry = true
//         try {
//             const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/refresh`, {withCredentials: true})
//             localStorage.setItem('accessToken', response.data.accessToken)
//             return instance.request(originalRequest)
//         } catch (error) {
//             console.log("AUTHORIZATION ERROR");
//         }

//     }
//     throw (error)
// })

export default instance;
