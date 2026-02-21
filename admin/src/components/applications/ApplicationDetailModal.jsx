import { useState, useEffect } from 'react';
import { api } from '../../lib/api';
import { format } from 'date-fns';
import { FiX, FiMail, FiPhone, FiMapPin, FiCalendar, FiFileText } from 'react-icons/fi';

const ApplicationDetailModal = ({ applicationId, isOpen, onClose }) => {
    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch application details when applicationId changes and modal is open
    useEffect(() => {
        if (isOpen && applicationId) {
            fetchApplicationDetails();
        }
    }, [applicationId, isOpen]);

    const fetchApplicationDetails = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await api.get(`/applications/${applicationId}`);
            setApplication(response.data.application);
        } catch (err) {
            console.error('Error fetching application details:', err);
            setError(err.response?.data?.message || 'Failed to load application details');
        } finally {
            setLoading(false);
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    const getStatusColor = (status) => {
        const colors = {
            'Applied': 'status-applied',
            'Shortlisted': 'status-shortlisted',
            'Selected': 'status-selected',
            'Rejected': 'status-rejected'
        };
        return colors[status] || 'status-default';
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content application-detail-modal">
                <div className="modal-header">
                    <h2>Application Details</h2>
                    <button className="close-btn" onClick={onClose} aria-label="Close">
                        <FiX />
                    </button>
                </div>

                <div className="modal-body">
                    {loading ? (
                        <div className="loading-state">
                            <div className="spinner"></div>
                            <p>Loading application details...</p>
                        </div>
                    ) : error ? (
                        <div className="error-state">
                            <p>{error}</p>
                            <button onClick={fetchApplicationDetails} className="retry-btn">
                                Retry
                            </button>
                        </div>
                    ) : application ? (
                        <div className="application-details">
                            {/* Status Badge */}
                            <div className="detail-section status-section">
                                <span className={`status-badge ${getStatusColor(application.status)}`}>
                                    {application.status}
                                </span>
                            </div>

                            {/* Applicant Information */}
                            <div className="detail-section">
                                <h3 className="section-title">Applicant Information</h3>
                                <div className="detail-grid">
                                    <div className="detail-item">
                                        <label>Full Name</label>
                                        <p className="detail-value">
                                            {application.applicant.firstName} {application.applicant.lastName}
                                        </p>
                                    </div>

                                    <div className="detail-item">
                                        <label><FiMail /> Email</label>
                                        <p className="detail-value">
                                            <a href={`mailto:${application.applicant.email}`}>
                                                {application.applicant.email}
                                            </a>
                                        </p>
                                    </div>

                                    <div className="detail-item">
                                        <label><FiPhone /> Phone</label>
                                        <p className="detail-value">
                                            <a href={`tel:${application.applicant.phone}`}>
                                                {application.applicant.phone}
                                            </a>
                                        </p>
                                    </div>

                                    <div className="detail-item">
                                        <label><FiMapPin /> College</label>
                                        <p className="detail-value">{application.applicant.college}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Application Details */}
                            <div className="detail-section">
                                <h3 className="section-title">Application Details</h3>
                                <div className="detail-grid">
                                    <div className="detail-item">
                                        <label>Applied For (Domain)</label>
                                        <p className="detail-value highlight">{application.domain}</p>
                                    </div>

                                    <div className="detail-item">
                                        <label>Qualification</label>
                                        <p className="detail-value">{application.qualification}</p>
                                    </div>

                                    <div className="detail-item">
                                        <label><FiCalendar /> Applied Date</label>
                                        <p className="detail-value">
                                            {format(new Date(application.appliedAt), 'PPP')}
                                        </p>
                                    </div>

                                    {application.internshipId && (
                                        <div className="detail-item">
                                            <label>Internship</label>
                                            <p className="detail-value">
                                                {application.internshipId.title || 'N/A'}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Skills & Message */}
                            <div className="detail-section">
                                <h3 className="section-title">Skills & Additional Information</h3>

                                <div className="detail-item full-width">
                                    <label><FiFileText /> Skills / Technologies</label>
                                    <p className="detail-value skills-text">{application.applicant.skills}</p>
                                </div>

                                {application.applicant.message && (
                                    <div className="detail-item full-width">
                                        <label>Message</label>
                                        <p className="detail-value message-text">{application.applicant.message}</p>
                                    </div>
                                )}

                                {application.applicant.resumeUrl && (
                                    <div className="detail-item full-width">
                                        <label>Resume</label>
                                        <a
                                            href={application.applicant.resumeUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="resume-link"
                                        >
                                            View Resume
                                        </a>
                                    </div>
                                )}
                            </div>

                            {/* Admin Notes */}
                            {application.notes && (
                                <div className="detail-section">
                                    <h3 className="section-title">Admin Notes</h3>
                                    <p className="detail-value">{application.notes}</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <p>No application data available</p>
                        </div>
                    )}
                </div>

                <div className="modal-footer">
                    <button onClick={onClose} className="btn btn-secondary">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ApplicationDetailModal;
