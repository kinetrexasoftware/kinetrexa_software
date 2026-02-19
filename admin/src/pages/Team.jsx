import TeamManager from '../components/content/TeamManager';

const Team = () => {
    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Team Management</h1>
                <p className="text-text-secondary">Manage your team members and their profiles.</p>
            </div>

            <TeamManager />
        </div>
    );
};

export default Team;
