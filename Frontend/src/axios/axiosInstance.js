import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:7777',
    withCredentials: true
})

axiosInstance.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => Promise.reject(error)
);
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // if accessToken expires , call refresh token endpoint
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const res = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL || "http://localhost:7777"}/api/auth/refresh-token`,
                    {},
                    { withCredentials: true }
                );

                if (res.data.success) {
                    return axiosInstance(originalRequest); // retry original request
                }
            } catch (err) {
                console.log("Refresh token failed", err);
                return Promise.reject(err);
            }
        }
    }
)

export default axiosInstance;