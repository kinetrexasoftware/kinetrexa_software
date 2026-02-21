import { useState, useEffect } from 'react';
import { api } from '../../lib/api';
import { format } from 'date-fns';

const ApplicationList = ({ onApplicationClick }) => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        status: '',
        search: ''
    });

    useEffect(() => {
        fetchApplications();
    }, [filters]);

    const fetchApplications = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (filters.status) params.append('status', filters.status);
            if (filters.search) params.append('search', filters.search);

            const response = await api.get(`/applications?${params}`);
            setApplications(response.data.applications || []);
        } catch (error) {
            console.error('Error fetching applications:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRowClick = (application) => {
        // PROPS-BASED: Pass application ID to parent via callback
        onApplicationClick(application._id);
    };

    const getStatusClass = (status) => {
        const classes = {
            'Applied': 'status-applied',
            'Shortlisted': 'status-shortlisted',
            'Selected': 'status-selected',
            'Rejected': 'status-rejected'
        };
        return classes[status] || '';
    };

    return (
        <div className="application-list-container">
            <div className="filters">
                <input
                    type="text"
                    placeholder="Search by name, email, or college..."
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    className="search-input"
                />

                <select
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    className="status-filter"
                >
                    <option value="">All Status</option>
                    <option value="Applied">Applied</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Selected">Selected</option>
                    <option value="Rejected">Rejected</option>
                </select>
            </div>

            {loading ? (
                <div className="loading-state">Loading applications...</div>
            ) : applications.length === 0 ? (
                <div className="empty-state">No applications found</div>
            ) : (
                <div className="table-container">
                    <table className="applications-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Domain</th>
                                <th>College</th>
                                <th>Status</th>
                                <th>Applied Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((application) => (
                                <tr
                                    key={application._id}
                                    onClick={() => handleRowClick(application)}
                                    className="clickable-row"
                                >
                                    <td>
                                        {application.applicant.firstName} {application.applicant.lastName}
                                    </td>
                                    <td>{application.applicant.email}</td>
                                    <td>{application.domain}</td>
                                    <td>{application.applicant.college}</td>
                                    <td>
                                        <span className={`status-badge ${getStatusClass(application.status)}`}>
                                            {application.status}
                                        </span>
                                    </td>
                                    <td>{format(new Date(application.appliedAt), 'PP')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ApplicationList;
