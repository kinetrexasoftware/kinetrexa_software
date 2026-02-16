import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('adminToken'));
    const [loading, setLoading] = useState(true);

    // Set default axios authorization header
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            // Verify token is still valid
            verifyToken();
        } else {
            delete axios.defaults.headers.common['Authorization'];
            setLoading(false);
        }
    }, [token]);

    const verifyToken = async () => {
        try {
            const response = await axios.get('/api/auth/me');
            setAdmin(response.data.data);
        } catch (error) {
            console.error('Token verification failed:', error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await axios.post('/api/auth/login', { email, password });
            const { token: newToken, admin: adminData } = response.data;

            localStorage.setItem('adminToken', newToken);
            setToken(newToken);
            setAdmin(adminData);

            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('adminToken');
        setToken(null);
        setAdmin(null);
        delete axios.defaults.headers.common['Authorization'];
    };

    const value = {
        admin,
        token,
        loading,
        login,
        logout,
        isAuthenticated: !!token && !!admin
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
