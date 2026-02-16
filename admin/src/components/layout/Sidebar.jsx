import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    FiHome,
    FiFileText,
    FiBriefcase,
    FiMail,
    FiEdit,
    FiLogOut
} from 'react-icons/fi';

const Sidebar = () => {
    const { logout } = useAuth();

    const navItems = [
        { path: '/dashboard', icon: FiHome, label: 'Dashboard' },
        { path: '/applications', icon: FiFileText, label: 'Applications' },
        { path: '/internships', icon: FiBriefcase, label: 'Internships' },
        { path: '/contacts', icon: FiMail, label: 'Contacts' },
        { path: '/content', icon: FiEdit, label: 'Content' },
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h2>KineTrexa</h2>
                <p className="sidebar-subtitle">Admin Panel</p>
            </div>

            <nav className="sidebar-nav">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `nav-item ${isActive ? 'active' : ''}`
                        }
                    >
                        <item.icon className="nav-icon" />
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="sidebar-footer">
                <button onClick={logout} className="logout-btn">
                    <FiLogOut className="nav-icon" />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
