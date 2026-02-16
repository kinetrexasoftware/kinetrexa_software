import axios from 'axios';

const ADMIN_API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

const adminApi = axios.create({
    baseURL: ADMIN_API_BASE_URL,
    withCredentials: true
});

// Add auth token to every request - NO LONGER NEEDED FOR COOKIES
// adminApi.interceptors.request.use((config) => {
//     if (typeof window !== 'undefined') {
//         const token = sessionStorage.getItem('token');
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//     }
//     return config;
// });

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

// Response interceptor
adminApi.interceptors.response.use(
    (response) => {
        let data = response.data.data ? response.data.data : response.data;
        return normalizeId(data);
    },
    (error) => {
        if (error.response?.status === 401 && typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
            // Force redirect to login on 401 to prevent loops
            window.location.href = '/admin/login';
        }
        console.error("Admin API Error:", error.response?.data || error);
        return Promise.reject(error.response?.data || error);
    }
);


// --- Auth ---
export const loginAdmin = async (email, password) => {
    try {
        const response = await adminApi.post('/auth/login', { email, password });
        return response; // response interceptor unwraps data
    } catch (error) {
        throw error;
    }
};

export const logoutAdmin = async () => {
    try {
        const response = await adminApi.post('/auth/logout');
        return response;
    } catch (error) {
        throw error;
    }
};

export const getAdminProfile = async () => {
    try {
        const response = await adminApi.get('/auth/me');
        return response;
    } catch (error) {
        throw error;
    }
};

// --- Stats & Dashboard ---
export const fetchAdminStats = async () => {
    try {
        const response = await adminApi.get('/dashboard/stats');
        // Backend returns: { success: true, data: { applications: {...}, ... } }
        // Interceptor handles response.data.data
        return response;
    } catch (error) {
        console.error("Fetch Stats Error", error);
        return {};
    }
};

export const fetchAdminChartData = async (range) => {
    try {
        const response = await adminApi.get(`/dashboard/chart?range=${range}`);
        // Backend returns: { success: true, data: [...] }
        // Interceptor handles response.data.data
        return response || [];
    } catch (error) {
        console.error("Fetch Chart Data Error", error);
        return [];
    }
};

export const fetchRecentActivity = async () => {
    try {
        const response = await adminApi.get('/notifications?limit=5');
        // Check if response has notifications array directly or nested
        const notifications = response.notifications || response.data?.notifications || [];

        return notifications.map(notif => ({
            id: notif._id || notif.id,
            type: notif.type === 'application' ? 'Application' :
                notif.type === 'contact' ? 'Inquiry' : 'System',
            user: notif.title || 'System', // Use title as the user/heading
            detail: notif.message,
            time: new Date(notif.createdAt).toLocaleString(), // Show date and time
            link: notif.type === 'application' ? '/admin/applications' :
                notif.type === 'contact' ? '/admin/inquiries' : '/admin/dashboard'
        }));
    } catch (error) {
        console.error("Fetch Activity Error", error);
        return [];
    }
};


// --- Products ---
// --- Products ---
export const fetchAdminProducts = async () => {
    try {
        const response = await adminApi.get('/products');
        return Array.isArray(response) ? response : (response.products || []);
    } catch (error) {
        console.error("Fetch Products Error", error);
        return [];
    }
};
export const createProduct = (data) => adminApi.post('/products', data);
export const updateProduct = (id, data) => adminApi.put(`/products/${id}`, data);
export const deleteProduct = (id) => adminApi.delete(`/products/${id}`);

// --- Services ---
export const fetchAdminServices = () => adminApi.get('/services');
export const createService = (data) => adminApi.post('/services', data);
export const updateService = (id, data) => adminApi.put(`/services/${id}`, data);
export const deleteService = (id) => adminApi.delete(`/services/${id}`);

// --- Training ---
export const fetchAdminTraining = () => adminApi.get('/training');
export const createTraining = (data) => adminApi.post('/training', data);
export const updateTraining = (id, data) => adminApi.put(`/training/${id}`, data);
export const deleteTraining = (id) => adminApi.delete(`/training/${id}`);
export const fetchAdminTrainingStudents = (id) => adminApi.get(`/training/${id}/students`);

// --- Internships ---
// --- Internships ---
export const fetchAdminInternships = async () => {
    try {
        const response = await adminApi.get('/internships?limit=100'); // Fetch all for admin
        // Interceptor already returns the data array
        return Array.isArray(response) ? response : (response.internships || []);
    } catch (error) {
        console.error("Fetch Internships Error", error);
        return [];
    }
};
export const createInternship = (data) => adminApi.post('/internships', data);
export const updateInternship = (id, data) => adminApi.put(`/internships/${id}`, data);
export const deleteInternship = (id) => adminApi.delete(`/internships/${id}`);
export const fetchInternshipApplications = (id) => adminApi.get(`/internships/${id}/applications`);

// --- Careers ---
export const fetchAdminCareers = () => adminApi.get('/careers');
export const createCareer = (data) => adminApi.post('/careers', data);
export const updateCareer = (id, data) => adminApi.put(`/careers/${id}`, data);
export const deleteCareer = (id) => adminApi.delete(`/careers/${id}`);
export const fetchJobApplications = (id) => adminApi.get(`/careers/${id}/applications`);

// --- Applications (Unified) ---
// --- Applications (Unified) ---
export const fetchAdminApplications = async () => {
    try {
        const response = await adminApi.get('/applications/admin');
        // Backend returns: { success: true, count: N, applications: [...] }
        const data = response.applications || [];

        // Map to DataTable format: { id, type, name, email, subject, status, date, notes }
        return data.map(app => ({
            id: app._id,
            applicationId: app.applicationId || 'N/A', // New field
            type: app.trainingId ? 'Training' : 'Internship',
            name: `${app.applicant.firstName} ${app.applicant.lastName}`,
            email: app.applicant.email,
            phone: app.applicant.phone,
            subject: app.domain || app.internshipId?.title || app.trainingId?.title || 'General Application',
            status: app.status.charAt(0).toUpperCase() + app.status.slice(1),
            date: new Date(app.appliedAt).toLocaleDateString(),
            notes: app.notes,
            amount: app.payment?.amount, // Add amount payment info
            paymentStatus: app.payment?.status,
            // Details for modal
            college: app.applicant.college,
            qualification: app.qualification, // Fixed: Top-level field
            skills: app.applicant.skills,
            message: app.applicant.message || app.applicant.whyJoin, // Fallback to old whyJoin
            resumeUrl: app.applicant.resumeUrl,
            graduationYear: app.applicant.graduationYear,
            degree: app.applicant.degree, // For older records
            // Download Tracking
            offerLetterDownloaded: app.offerLetterDownloaded,
            offerLetterDownloadedAt: app.offerLetterDownloadedAt,
            taskDownloaded: app.taskDownloaded,
            taskDownloadedAt: app.taskDownloadedAt,
            certificateDownloaded: app.certificateDownloaded,
            certificateDownloadedAt: app.certificateDownloadedAt
        }));
    } catch (error) {
        console.error("Fetch Apps Error", error);
        return [];
    }
};

export const updateApplicationStatus = (id, status) => adminApi.put(`/applications/${id}/status`, { status });
export const addNoteToApplication = (id, notes) => adminApi.put(`/applications/${id}/notes`, { notes });
export const createAdminApplication = (data) => adminApi.post('/applications/admin/create', data);
export const deleteApplication = (id) => adminApi.delete(`/applications/${id}`);

// --- Inquiries ---
export const fetchAdminInquiries = async () => {
    try {
        const response = await adminApi.get('/contacts');
        // Backend returns: { success: true, count: N, contacts: [...] }
        const data = response.contacts || [];

        return data.map(item => ({
            id: item._id,
            name: item.name,
            email: item.email,
            subject: item.subject,
            message: item.message,
            replyMessage: item.replyMessage,
            status: item.status.charAt(0).toUpperCase() + item.status.slice(1),
            date: new Date(item.createdAt).toLocaleDateString(),
            createdAt: item.createdAt
        }));
    } catch (error) {
        console.error("Fetch Inquiries Error", error);
        return [];
    }
};

export const updateInquiryStatus = (id, status) => adminApi.put(`/contacts/${id}`, { status });
export const deleteInquiry = (id) => adminApi.delete(`/contacts/${id}`);
export const replyToInquiry = (id, replyMessage) => adminApi.post(`/contacts/${id}/reply`, { replyMessage });

// --- Content ---
export const fetchContent = async (section) => {
    try {
        const response = await adminApi.get(`/content/section/${section}`);
        // Response structure is { success: true, content: { ... } }
        // Our interceptor returns response.data, so we get the whole object
        // Return just the content part
        return response.content || response.data?.content || {};
    } catch (error) {
        // If 404, return empty object (content doesn't exist yet)
        if (error.status === 404) return {};
        throw error;
    }
};

export const saveContent = (data) => adminApi.post('/content', data);

// --- Settings ---
export const fetchSiteSettings = () => adminApi.get('/settings');
export const updateSiteSettings = (data) => adminApi.put('/settings', data);

// --- Users ---
export const fetchAdminUsers = () => adminApi.get('/auth/users'); // Assuming auth route manages users
export const createAdminUser = (data) => adminApi.post('/auth/users', data);
export const updateAdminUser = (id, data) => adminApi.put(`/auth/users/${id}`, data);
export const deleteAdminUser = (id) => adminApi.delete(`/auth/users/${id}`);

// --- Tasks ---
export const fetchAdminTasks = async () => {
    try {
        const response = await adminApi.get('/tasks');
        const tasks = response.tasks || [];
        return tasks.map(task => ({
            ...task,
            id: task._id || task.id,
            status: task.isActive ? 'Active' : 'Inactive'
        }));
    } catch (error) {
        console.error("Fetch Tasks Error", error);
        return [];
    }
};

export const createAdminTask = (data) => adminApi.post('/tasks', data);

export const updateAdminTask = (id, data) => adminApi.put(`/tasks/${id}`, data);

export const deleteAdminTask = (id) => adminApi.delete(`/tasks/${id}`);

export const toggleTaskStatus = (id) => adminApi.put(`/tasks/${id}/toggle`);

export default adminApi;
