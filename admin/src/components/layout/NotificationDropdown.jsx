import { useState, useEffect, useRef } from 'react';
import { api } from '../../lib/api';
import { formatDistanceToNow } from 'date-fns';
import { FiBell } from 'react-icons/fi';
import ApplicationDetailModal from '../applications/ApplicationDetailModal';

const NotificationDropdown = ({
    onNotificationClick,
    selectedApplicationId,
    showDetailModal,
    setShowDetailModal
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const dropdownRef = useRef(null);

    // Fetch notifications on mount and every 30 seconds
    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 30000);
        return () => clearInterval(interval);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const response = await api.get('/notifications?limit=10');
            setNotifications(response.data.notifications || []);
            setUnreadCount(response.data.unreadCount || 0);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (notificationId) => {
        try {
            await api.put(`/notifications/${notificationId}/read`);
            // Update local state
            setNotifications(prev =>
                prev.map(n => n._id === notificationId ? { ...n, isRead: true } : n)
            );
            setUnreadCount(prev => Math.max(0, prev - 1));
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    // CRITICAL: Handle notification click with props-based data passing
    const handleNotificationClick = (notification) => {
        // 1. Extract applicationId from notification.data
        const { applicationId } = notification.data || {};

        if (!applicationId) {
            console.error('No applicationId in notification data');
            return;
        }

        // 2. Mark notification as read
        if (!notification.isRead) {
            markAsRead(notification._id);
        }

        // 3. Pass applicationId to parent via callback (PROPS-BASED)
        onNotificationClick(applicationId);

        // 4. Close notification dropdown
        setIsOpen(false);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className="notification-container" ref={dropdownRef}>
                <button
                    className="notification-bell"
                    onClick={toggleDropdown}
                    aria-label="Notifications"
                >
                    <FiBell />
                    {unreadCount > 0 && (
                        <span className="notification-badge">{unreadCount}</span>
                    )}
                </button>

                {isOpen && (
                    <div className="notification-dropdown">
                        <div className="notification-header">
                            <h3>Notifications</h3>
                            {unreadCount > 0 && (
                                <span className="unread-count">{unreadCount} unread</span>
                            )}
                        </div>

                        <div className="notification-list">
                            {loading ? (
                                <div className="notification-loading">Loading...</div>
                            ) : notifications.length === 0 ? (
                                <div className="notification-empty">No notifications</div>
                            ) : (
                                notifications.map((notification) => (
                                    <div
                                        key={notification._id}
                                        className={`notification-item ${!notification.isRead ? 'unread' : ''}`}
                                        onClick={() => handleNotificationClick(notification)}
                                    >
                                        <div className="notification-content">
                                            <div className="notification-title">{notification.title}</div>
                                            <div className="notification-message">{notification.message}</div>
                                            <div className="notification-time">
                                                {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                                            </div>
                                        </div>
                                        {!notification.isRead && <div className="unread-dot"></div>}
                                    </div>
                                ))
                            )}
                        </div>

                        {notifications.length > 0 && (
                            <div className="notification-footer">
                                <button className="view-all-btn">View All</button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Application Detail Modal - Props-based state */}
            <ApplicationDetailModal
                applicationId={selectedApplicationId}
                isOpen={showDetailModal}
                onClose={() => setShowDetailModal(false)}
            />
        </>
    );
};

export default NotificationDropdown;
