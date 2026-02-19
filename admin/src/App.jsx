import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Applications from './pages/Applications';
import Internships from './pages/Internships';
import Careers from './pages/Careers';
import Team from './pages/Team';
import Contacts from './pages/Contacts';
import Content from './pages/Content';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="loading-screen">
                <div className="spinner"></div>
                <p>Loading...</p>
            </div>
        );
    }

    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
    const { isAuthenticated } = useAuth();

    return (
        <Routes>
            {/* Public Route */}
            <Route
                path="/login"
                element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />}
            />

            {/* Protected Routes */}
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Layout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="applications" element={<Applications />} />
                <Route path="internships" element={<Internships />} />
                <Route path="careers" element={<Careers />} />
                <Route path="team" element={<Team />} />
                <Route path="contacts" element={<Contacts />} />
                <Route path="content" element={<Content />} />
            </Route>

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
    );
}

export default App;
