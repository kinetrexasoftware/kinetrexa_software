import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import NotificationDropdown from './NotificationDropdown';
import { FiSearch, FiUser } from 'react-icons/fi';

const Header = () => {
    const { admin } = useAuth();
    const [selectedApplicationId, setSelectedApplicationId] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);

    // Handler passed to NotificationDropdown to manage selected application state
    const handleNotificationClick = (applicationId) => {
        setSelectedApplicationId(applicationId);
        setShowDetailModal(true);
    };

    return (
        <>
            <header className="admin-header">
                <div className="header-search">
                    <FiSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search applications, internships..."
                        className="search-input"
                    />
                </div>

                <div className="header-actions">
                    {/* CRITICAL: NotificationDropdown with props-based state management */}
                    <NotificationDropdown
                        onNotificationClick={handleNotificationClick}
                        selectedApplicationId={selectedApplicationId}
                        showDetailModal={showDetailModal}
                        setShowDetailModal={setShowDetailModal}
                    />

                    <div className="admin-profile">
                        <FiUser className="profile-icon" />
                        <span className="admin-name">{admin?.name || 'Admin'}</span>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
