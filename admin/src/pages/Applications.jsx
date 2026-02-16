import { useState } from 'react';
import ApplicationList from '../components/applications/ApplicationList';
import ApplicationDetailModal from '../components/applications/ApplicationDetailModal';

const Applications = () => {
    const [selectedApplicationId, setSelectedApplicationId] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);

    // PROPS-BASED: Handle application click from list
    const handleApplicationClick = (applicationId) => {
        setSelectedApplicationId(applicationId);
        setShowDetailModal(true);
    };

    return (
        <div className="applications-page">
            <div className="page-header">
                <h1>Applications</h1>
                <p className="page-description">Manage internship and training applications</p>
            </div>

            <div className="page-content">
                <ApplicationList onApplicationClick={handleApplicationClick} />
            </div>

            {/* PROPS-BASED: Application Detail Modal */}
            <ApplicationDetailModal
                applicationId={selectedApplicationId}
                isOpen={showDetailModal}
                onClose={() => setShowDetailModal(false)}
            />
        </div>
    );
};

export default Applications;
