'use client';
import { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { applicationAPI, internshipAPI, paymentAPI } from '@/lib/api';
import api from '@/lib/api';
import { toast } from 'react-hot-toast';
import { Upload } from 'lucide-react';

export default function ApplicationForm({ internship, initialDomain, onSuccess, onCancel, onAlreadyRegistered }) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        domain: initialDomain || 'Web Development', // Use passed domain, lock it
        qualification: 'Undergraduate',
        college: '',
        skills: '',
        message: '',
        resume: null
    });
    const [errors, setErrors] = useState({});

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size > 5 * 1024 * 1024) { // 5MB limit
            toast.error('File size must be less than 5MB');
            return;
        }
        setFormData({ ...formData, resume: file });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.fullName) newErrors.fullName = 'Full Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.phone) newErrors.phone = 'Phone is required';
        if (!formData.domain) newErrors.domain = 'Domain is required';
        if (!formData.qualification) newErrors.qualification = 'Qualification is required';
        if (!formData.college) newErrors.college = 'College/Institute is required';
        if (!formData.skills) newErrors.skills = 'Skills are required';
        // Resume is optional
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Dynamically load Razorpay Script
    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        setLoading(true);
        try {
            // 1. Load Razorpay Script
            const isLoaded = await loadRazorpayScript();
            if (!isLoaded) {
                toast.error('Razorpay SDK failed to load. Check your internet.');
                setLoading(false);
                return;
            }

            // 2. Create Razorpay Order (NO APPLICATION YET)
            const orderData = await paymentAPI.createOrder(internship._id);
            if (!orderData) throw new Error('Failed to create payment order');

            const { orderId, amount, currency, key } = orderData;

            // 3. Open Razorpay Checkout
            const options = {
                key: key,
                amount: amount.toString(),
                currency: currency,
                name: "KineTrexa",
                description: `Internship Fee for ${formData.domain}`,
                order_id: orderId,
                handler: async function (response) {
                    // 4. Verify Payment and CREATE APPLICATION on Backend
                    try {
                        const formDataToSend = new FormData();

                        // Add application fields
                        formDataToSend.append('fullName', formData.fullName);
                        formDataToSend.append('email', formData.email);
                        formDataToSend.append('phone', formData.phone);
                        formDataToSend.append('domain', formData.domain);
                        formDataToSend.append('qualification', formData.qualification);
                        formDataToSend.append('college', formData.college);
                        formDataToSend.append('skills', formData.skills);
                        formDataToSend.append('message', formData.message);
                        formDataToSend.append('internshipId', internship._id);

                        // Add resume if exists
                        if (formData.resume) {
                            formDataToSend.append('resume', formData.resume);
                        }

                        // Add Razorpay details
                        formDataToSend.append('razorpay_order_id', response.razorpay_order_id);
                        formDataToSend.append('razorpay_payment_id', response.razorpay_payment_id);
                        formDataToSend.append('razorpay_signature', response.razorpay_signature);

                        const submitRes = await api.post('/internships/submit-application', formDataToSend, {
                            headers: { 'Content-Type': 'multipart/form-data' }
                        });

                        const submitData = submitRes; // Axios interceptor returns the data directly

                        if (submitData.success) {
                            toast.success('Payment Successful! Application Submitted.');
                            if (onSuccess) onSuccess(submitData.application);
                        } else if (submitData.code === 'ALREADY_REGISTERED') {
                            setLoading(false);
                            if (onAlreadyRegistered) onAlreadyRegistered();
                        } else {
                            throw new Error(submitData.message || 'Submission failed');
                        }
                    } catch (err) {
                        console.error("Submission Error:", err);
                        toast.error(err.message || 'Payment verified but application submission failed. Contact support.');
                        setLoading(false);
                    }
                },
                prefill: {
                    name: formData.fullName,
                    email: formData.email,
                    contact: formData.phone
                },
                theme: { color: "#0f172a" },
                modal: {
                    ondismiss: function () {
                        setLoading(false);
                        toast('Payment Cancelled');
                    }
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function (response) {
                console.error("Payment Failed:", response.error);
                toast.error(response.error.description || 'Payment Failed');
                setLoading(false);
            });
            rzp.open();

        } catch (error) {
            console.error("Submit/Payment Error:", error);
            const msg = error.message || 'Failed to process application';
            toast.error(msg);
            setLoading(false);
        }
        // Note: loading stays true until payment window closes or succeeds
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                label="Full Name"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                error={errors.fullName}
            />

            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="Email Address"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    error={errors.email}
                />
                <Input
                    label="Phone Number"
                    placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    error={errors.phone}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Internship Domain / Role
                    </label>
                    <input
                        type="text"
                        className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-sm cursor-not-allowed focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                        value={formData.domain}
                        readOnly
                        disabled
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        * You are applying for the specific domain you selected.
                    </p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Application Fee
                    </label>
                    <div className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-900 dark:bg-gray-800 dark:border-gray-600 dark:text-white flex items-center">
                        ₹{internship?.amount || 0}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Current Qualification
                    </label>
                    <select
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600"
                        value={formData.qualification}
                        onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    >
                        <option value="10+2">10+2</option>
                        <option value="Diploma">Diploma</option>
                        <option value="Undergraduate">Undergraduate</option>
                        <option value="Postgraduate">Postgraduate</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    <Input
                        label="College / Institute Name"
                        placeholder="XYZ Institute of Technology"
                        value={formData.college}
                        onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                        error={errors.college}
                    />
                </div>
            </div>

            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Skills / Technologies Known
                </label>
                <textarea
                    className="w-full min-h-[80px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all"
                    placeholder="HTML, CSS, React, Node.js..."
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                />
                {errors.skills && <p className="text-sm text-red-500">{errors.skills}</p>}
            </div>

            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Resume Upload (Optional)
                </label>
                <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-2 pb-3">
                            <Upload className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400" />
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                {formData.resume ? formData.resume.name : 'Click to upload PDF (Max 5MB)'}
                            </p>
                        </div>
                        <input type="file" className="hidden" accept=".pdf" onChange={handleFileChange} />
                    </label>
                </div>
            </div>

            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Short Message (Optional)
                </label>
                <textarea
                    className="w-full min-h-[60px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all"
                    placeholder="Any motivation or query..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
            </div>

            <div className="flex justify-end gap-3 pt-2">
                <Button variant="ghost" type="button" onClick={() => onCancel && onCancel()}>
                    Cancel
                </Button>
                <Button type="submit" loading={loading} className="w-full sm:w-auto bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/30">
                    Proceed to Pay ₹{internship?.amount || 0}
                </Button>
            </div>
        </form>
    );
}
