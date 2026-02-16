'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { applicationAPI } from '@/lib/api';
import toast from 'react-hot-toast';
import { getStatusColor, formatDate } from '@/lib/utils';

export default function StatusTracker() {
    const [email, setEmail] = useState('');
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const handleTrack = async (e) => {
        e.preventDefault();

        if (!email.trim()) {
            toast.error('Please enter your email');
            return;
        }

        try {
            setLoading(true);
            const response = await applicationAPI.track(email);
            setApplications(response.applications || []);
            setSearched(true);

            if (response.applications.length === 0) {
                toast.info('No applications found for this email');
            }
        } catch (error) {
            toast.error('Error fetching applications');
            setApplications([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">Track Your Application</h3>

            <form onSubmit={handleTrack} className="flex gap-2 mb-6">
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1"
                />
                <Button type="submit" loading={loading}>
                    <Search className="w-4 h-4" />
                    Track
                </Button>
            </form>

            {searched && (
                <div className="space-y-4">
                    {applications.length === 0 ? (
                        <p className="text-center text-gray-600 dark:text-gray-400 py-8">
                            No applications found for this email
                        </p>
                    ) : (
                        applications.map((app) => (
                            <div
                                key={app._id}
                                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-grow">
                                        <h4 className="font-semibold text-gray-900 dark:text-white">
                                            {app.internshipId?.title || 'Internship'}
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                            Applied on {formatDate(app.appliedAt)}
                                        </p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(app.status)}`}>
                                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}