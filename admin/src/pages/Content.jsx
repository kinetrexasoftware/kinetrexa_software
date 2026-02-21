import TeamManager from '../components/content/TeamManager';
import ContactManager from '../components/content/ContactManager';

const Content = () => {
    return (
        <div className="content-page">
            <div className="page-header mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Content Management</h1>
                <p className="text-text-secondary">Manage website content and assets</p>
            </div>

            <div className="space-y-12">
                {/* Team Management Section */}
                <section>
                    <TeamManager />
                </section>

                {/* Contact & Social Management Section */}
                <section>
                    <ContactManager />
                </section>

                {/* Other content sections can be added here */}
            </div>
        </div>
    );
};

export default Content;
