import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api',
    withCredentials: true
});

// Helper to normalize ID
const normalizeId = (data) => {
    if (Array.isArray(data)) {
        return data.map(item => normalizeId(item));
    }
    if (data && typeof data === 'object') {
        if (data._id && !data.id) {
            data.id = data._id;
        }
        Object.keys(data).forEach(key => {
            if (typeof data[key] === 'object' && data[key] !== null) {
                data[key] = normalizeId(data[key]);
            }
        });
    }
    return data;
};

api.interceptors.response.use(
    (response) => {
        const data = response.data;
        // Backend returns { success: true, data: ... }
        // We want to return `data.data` if it exists, or `data` itself.
        // But often getOne returns { success: true, data: obj }, getAll returns { success: true, count: N, data: [] }
        // So we standardise on returning `data` property if success is true.
        let result = data;
        if (data && data.success && data.data) {
            result = data.data;
        } else if (data && data.data) {
            result = data.data;
        }

        return normalizeId(result);
    },
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error.response?.data || error);
    }
);

export const productAPI = {
    getAll: () => api.get('/products'),
    getPublic: () => api.get('/products/public'),
    getOne: (id) => api.get(`/products/${id}`),
};

export const serviceAPI = {
    getAll: () => api.get('/services'),
    getPublic: () => api.get('/services/public'),
    getOne: (id) => api.get(`/services/${id}`),
    getBySlug: (slug) => api.get(`/services/slug/${slug}`),
};

export const trainingAPI = {
    getAll: () => api.get('/training'),
    getPublic: () => api.get(`/training/public?t=${Date.now()}`),
    getOne: (id) => api.get(`/training/${id}`),
};

export const contentAPI = {
    getSection: (section) => api.get(`/content/${section}`),
};

export const internshipAPI = {
    getAll: (filters) => api.get('/internships', { params: filters }),
    getOne: (id) => api.get(`/internships/${id}`),
    // Use raw axios to handle 409 status manually without interceptor interference
    apply: (data) => axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api'}/internships/apply`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
        validateStatus: (status) => status < 500 // Allow 409/400 to resolve instead of throw
    }),
};

export const careerAPI = {
    getAll: () => api.get('/careers'),
    getOne: (id) => api.get(`/careers/${id}`),
};

export const applicationAPI = {
    create: (data, relatedId, type = 'internship') => { // generalized
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });
        if (relatedId) formData.append('relatedId', relatedId);
        formData.append('type', type);

        return api.post('/applications', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },
    track: (email) => api.get(`/applications/track/${email}`),
    verify: (data) => api.post('/applications/verify', data),
    download: (data) => api.post('/applications/download', data),
    downloadOfferLetter: (applicationId, email) => api.get(`/documents/offer-letter/${applicationId}`, {
        params: { email },
        responseType: 'blob'
    }),
    downloadCertificate: (applicationId, email) => api.get(`/documents/certificate/${applicationId}`, {
        params: { email },
        responseType: 'blob'
    }),
    downloadTaskAssignment: (applicationId, email) => api.get(`/documents/task-assignment/${applicationId}`, {
        params: { email },
        responseType: 'blob'
    }),
};

export const contactAPI = {
    submit: (data) => api.post('/contacts', data),
};

export const settingsAPI = {
    get: () => api.get('/settings'),
};

export default api;
