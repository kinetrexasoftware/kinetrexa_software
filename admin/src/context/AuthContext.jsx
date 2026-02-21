import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../lib/api';

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

    // Verify token is still valid
    useEffect(() => {
        if (token) {
            verifyToken();
        } else {
            setLoading(false);
        }
    }, [token]);

    const verifyToken = async () => {
        try {
            const response = await api.get('/auth/me');
            setAdmin(response.data.admin);
        } catch (error) {
            console.error('Token verification failed:', error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
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
