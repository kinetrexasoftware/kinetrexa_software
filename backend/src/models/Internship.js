const mongoose = require('mongoose');
const slugify = require('slugify');

const InternshipSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        maxlength: [100, 'Title can not be more than 100 characters']
    },
    image: {
        type: String,
        default: ''
    },
    slug: String,
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [2000, 'Description can not be more than 2000 characters']
    },
    shortDescription: {
        type: String,
        required: [true, 'Please add a short description'],
        maxlength: [200, 'Short description can not be more than 200 characters']
    },
    type: {
        type: String,
        required: [true, 'Please add internship type'],
        enum: ['Free', 'Paid']
    },
    amount: {
        type: Number,
        required: function () {
            return this.type === 'Paid';
        },
        default: 0
    },
    mode: {
        type: String,
        required: [true, 'Please select mode'],
        enum: ['Remote', 'Hybrid', 'Onsite']
    },
    location: {
        type: String,
        default: 'Remote'
    },
    duration: {
        type: String,
        required: [true, 'Please add duration (e.g. 1 Month, 2 Months)']
    },
    stipend: {
        amount: {
            type: Number,
            default: 0
        },
        currency: {
            type: String,
            default: 'INR'
        },
        isPaid: {
            type: Boolean,
            default: false
        }
    },
    applicationFee: {
        amount: {
            type: Number,
            default: 0
        },
        currency: {
            type: String,
            default: 'INR'
        },
        isMandatory: {
            type: Boolean,
            default: false
        }
    },
    technologies: {
        type: [String],
        required: true
    },
    requirements: {
        type: [String],
        required: true
    },
    responsibilities: {
        type: [String],
        default: []
    },
    perks: [String],
    startDate: {
        type: Date,
        required: [true, 'Please add start date']
    },
    endDate: Date,
    deadline: {
        type: Date,
        required: [true, 'Please add application deadline']
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Create internship slug and calculate end date
InternshipSchema.pre('save', function (next) {
    this.slug = slugify(this.title, { lower: true });

    // Auto-calculate end date if startDate and duration are present
    if (this.startDate && this.duration) {
        const durationValue = parseInt(this.duration);
        if (!isNaN(durationValue)) {
            const end = new Date(this.startDate);
            // Assuming duration is in months as per requirement
            end.setMonth(end.getMonth() + durationValue);
            this.endDate = end;
        }
    }
    next();
});

// Helper method to check if can apply
InternshipSchema.methods.canApply = function () {
    // Grace period: Allow applications until the end of the deadline day
    const deadlineDate = new Date(this.deadline);
    deadlineDate.setHours(23, 59, 59, 999);

    // Safety: If deadline is before start date, treat start date as the absolute last call
    const effectiveDeadline = this.startDate > deadlineDate ? new Date(this.startDate) : deadlineDate;
    effectiveDeadline.setHours(23, 59, 59, 999);

    const isExpired = new Date() > effectiveDeadline;
    return this.isActive && !isExpired;
};

module.exports = mongoose.model('Internship', InternshipSchema);
