import axios from "axios";
import { useSession } from "next-auth/react"; // Import getSession instead of useSession

const botAPI = axios.create({
  baseURL: "http://localhost:3000/",
});

// Add a request interceptor to include the user session in the request data
// botAPI.interceptors.request.use(
//   (config) => {
//     try {
//       const session = useSession();

//       if (!session) {
//         console.log(
//           "No user session exists, please make sure you are signed in!"
//         );

//         throw new Error("No user session");
//       }

//       config.data = {
//         ...config.data,
//         userSession: session,
//       };
//       return config;
//     } catch (error) {
//       console.error("Error fetching user session:", error);
//       return Promise.reject(error);
//     }
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default botAPI;
