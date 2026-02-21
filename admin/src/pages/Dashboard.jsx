import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { FiFileText, FiUsers, FiCheckCircle, FiClock } from 'react-icons/fi';

const Dashboard = () => {
    const [stats, setStats] = useState({
        total: 0,
        byStatus: {}
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await api.get('/applications/stats/overview');
            setStats(response.data.stats || { total: 0, byStatus: {} });
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        {
            title: 'Total Applications',
            value: stats.total || 0,
            icon: FiFileText,
            color: 'blue'
        },
        {
            title: 'Applied',
            value: stats.byStatus?.Applied || 0,
            icon: FiClock,
            color: 'orange'
        },
        {
            title: 'Shortlisted',
            value: stats.byStatus?.Shortlisted || 0,
            icon: FiUsers,
            color: 'purple'
        },
        {
            title: 'Selected',
            value: stats.byStatus?.Selected || 0,
            icon: FiCheckCircle,
            color: 'green'
        }
    ];

    return (
        <div className="dashboard-page">
            <div className="page-header">
                <h1>Dashboard</h1>
                <p className="page-description">Welcome to KineTrexa Admin Panel</p>
            </div>

            <div className="dashboard-stats">
                {loading ? (
                    <div className="loading-state">Loading statistics...</div>
                ) : (
                    <div className="stat-cards">
                        {statCards.map((card, index) => (
                            <div key={index} className={`stat-card stat-${card.color}`}>
                                <div className="stat-icon">
                                    <card.icon />
                                </div>
                                <div className="stat-info">
                                    <p className="stat-title">{card.title}</p>
                                    <p className="stat-value">{card.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="dashboard-content">
                <div className="welcome-message">
                    <h2>🔔 Notification System Active</h2>
                    <p>
                        You'll receive notifications for new applications. Click on any notification
                        in the header to view full application details.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
