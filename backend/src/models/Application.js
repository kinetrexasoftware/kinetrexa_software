const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    internshipId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Internship',
        required: false // Made optional for generic applications
    },
    applicationId: {
        type: String,
        unique: true,
        uppercase: true,
        index: true
    },
    // New fields
    domain: {
        type: String,
        required: [true, 'Please select a domain/role']
    },
    qualification: {
        type: String,
        required: false,
        enum: ['10+2', 'Diploma', 'Undergraduate', 'Postgraduate', 'Other']
    },
    // Applicant Details
    applicant: {
        firstName: {
            type: String,
            required: [true, 'Please add first name'],
            trim: true
        },
        lastName: {
            type: String,
            required: [true, 'Please add last name'],
            trim: true
        },
        email: {
            type: String,
            required: [true, 'Please add email']
        },
        phone: {
            type: String,
            required: [true, 'Please add phone number']
        },
        college: {
            type: String,
            required: [true, 'Please add college/university name']
        },
        // Optional fields
        graduationYear: Number,
        portfolio: String,
        github: String,
        linkedin: String,
        resumeUrl: String,

        // Removed separate skills array requirement if user wants simple text, but Schema had [String]. 
        // Plan said "Skills / Technologies Known - Text area". 
        // I'll keep it as String for simplicity or convert text area to array in controller. 
        // Let's make it String to match "Text area" requirement strictly.
        skills: {
            type: String,
            required: [true, 'Please add your skills']
        },

        // Consolidated message/motivation
        message: {
            type: String,
            default: '' // Optional
        }
    },
    status: {
        type: String,
        enum: ['applied', 'shortlisted', 'selected', 'rejected', 'completed'],
        default: 'applied'
    },
    statusHistory: [{
        status: String,
        changedAt: {
            type: Date,
            default: Date.now
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Admin'
        },
        comment: String
    }],
    notes: String,
    createdBy: {
        type: String,
        enum: ['user', 'admin', 'USER', 'ADMIN'],
        default: 'USER'
    },
    payment: {
        status: {
            type: String,
            enum: ['Pending', 'Paid', 'Failed', 'Waived', 'Not Required', 'ADMIN_EXEMPTED'],
            default: 'Pending'
        },
        transactionId: String,
        amount: Number,
        currency: String,
        initiatedAt: Date,
        paidAt: Date
    },
    appliedAt: {
        type: Date,
        default: Date.now
    },
    // Document Download Tracking
    offerLetterDownloaded: {
        type: Boolean,
        default: false
    },
    offerLetterDownloadedAt: Date,
    taskDownloaded: {
        type: Boolean,
        default: false
    },
    taskDownloadedAt: Date,
    certificateDownloaded: {
        type: Boolean,
        default: false
    },
    certificateDownloadedAt: Date
}, {
    timestamps: true
});

// Compound unique index: one application per email per domain
// NOTE: Commented out to support payment-first flow
// Duplicate prevention will be handled at application level after payment verification
// ApplicationSchema.index({ 'applicant.email': 1, domain: 1 }, { unique: true });

// Pre-save hook to generate Application ID
ApplicationSchema.pre('save', async function (next) {
    if (!this.applicationId) {
        const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Avoid ambiguous characters
        let isUnique = false;
        let generatedId = '';

        while (!isUnique) {
            generatedId = '';
            const length = Math.floor(Math.random() * 3) + 8; // 8-10 characters
            for (let i = 0; i < length; i++) {
                generatedId += characters.charAt(Math.floor(Math.random() * characters.length));
            }

            // Check if ID already exists
            const existing = await this.constructor.findOne({ applicationId: generatedId });
            if (!existing) {
                isUnique = true;
            }
        }
        this.applicationId = generatedId;
    }
    next();
});

// Prevent duplicate applications
ApplicationSchema.statics.hasApplied = async function (internshipId, email) {
    const count = await this.countDocuments({
        internshipId,
        'applicant.email': email
    });
    return count > 0;
};

// Instance method to update status
ApplicationSchema.methods.updateStatus = async function (newStatus, adminId, comment) {
    this.status = newStatus;
    this.statusHistory.push({
        status: newStatus,
        updatedBy: adminId,
        comment
    });
    return await this.save();
};

// Static method for stats
ApplicationSchema.statics.getStats = async function () {
    const stats = await this.aggregate([
        {
            $group: {
                _id: '$status',
                count: { $sum: 1 }
            }
        }
    ]);

    const result = {
        total: 0,
        byStatus: {}
    };

    stats.forEach(stat => {
        result.total += stat.count;
        result.byStatus[stat._id] = stat.count;
    });

    return result;
};

module.exports = mongoose.model('Application', ApplicationSchema);
