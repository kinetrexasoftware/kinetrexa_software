const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters']
    },
    email: {
        type: String,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ],
        required: [true, 'Please add an email']
    },
    subject: {
        type: String,
        required: [true, 'Please add a subject'],
        maxlength: [100, 'Subject can not be more than 100 characters']
    },
    message: {
        type: String,
        required: [true, 'Please add a message'],
        maxlength: [1000, 'Message can not be more than 1000 characters']
    },
    status: {
        type: String,
        enum: ['new', 'received', 'read', 'responded', 'replied', 'archived'],
        default: 'received'
    },
    replyMessage: {
        type: String,
        maxlength: [2000, 'Reply can not be more than 2000 characters']
    },
    repliedAt: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Contact', ContactSchema);
