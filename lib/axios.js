import axios from "axios";

const api = axios.create({ baseURL: "/api" });

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("sehatalk_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let refreshing = false;
let queue = [];

function processQueue(error, token = null) {
  queue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve(token);
  });
  queue = [];
}

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    if (err.response && err.response.status === 401 && !original.__retry) {
      original.__retry = true;
      if (refreshing) {
        return new Promise((resolve, reject) => {
          queue.push({ resolve, reject });
        }).then((token) => {
          original.headers.Authorization = `Bearer ${token}`;
          return api(original);
        });
      }
      refreshing = true;
      try {
        const refreshToken = localStorage.getItem("sehatalk_refresh");
        if (!refreshToken) throw new Error("No refresh token");
        const r = await api.post("/auth/refresh", { refreshToken });
        const { token, refreshToken: newRefresh } = r.data;
        localStorage.setItem("sehatalk_token", token);
        localStorage.setItem("sehatalk_refresh", newRefresh);
        processQueue(null, token);
        original.headers.Authorization = `Bearer ${token}`;
        return api(original);
      } catch (e) {
        processQueue(e, null);
        localStorage.removeItem("sehatalk_token");
        localStorage.removeItem("sehatalk_refresh");
        return Promise.reject(e);
      } finally {
        refreshing = false;
      }
    }
    return Promise.reject(err);
  }
);

export default api;
