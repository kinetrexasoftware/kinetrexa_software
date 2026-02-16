const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  section: {
    type: String,
    required: [true, 'Section identifier is required'],
    unique: true,
    trim: true,
    lowercase: true
    // Examples: 'hero', 'about', 'services', 'footer', 'mission', 'vision'
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
    required: [true, 'Content is required']
    // Flexible structure for different content types
  },
  metadata: {
    title: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    keywords: [{
      type: String,
      trim: true
    }]
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  version: {
    type: Number,
    default: 1
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for optimization

contentSchema.index({ isPublished: 1 });

// Method to increment version
contentSchema.methods.incrementVersion = async function () {
  this.version += 1;
  await this.save();
};

// Method to publish/unpublish
contentSchema.methods.togglePublish = async function () {
  this.isPublished = !this.isPublished;
  await this.save();
};

// Static method to get published content by section
contentSchema.statics.getPublished = async function (section) {
  return await this.findOne({ section, isPublished: true });
};

// Static method to get all published content
contentSchema.statics.getAllPublished = async function () {
  return await this.find({ isPublished: true });
};

// Pre-save hook to increment version on update
contentSchema.pre('save', function (next) {
  if (this.isModified('content') && !this.isNew) {
    this.version += 1;
  }
  next();
});

module.exports = mongoose.model('Content', contentSchema);