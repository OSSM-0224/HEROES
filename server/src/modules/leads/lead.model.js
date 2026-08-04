import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['STATUS_CHANGE', 'ASSIGNMENT', 'NOTE_ADDED', 'LEAD_CREATED'],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    performedByName: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true }
);

const noteSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    createdByName: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true }
);

const leadSchema = new mongoose.Schema(
  {
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
      required: [true, 'Organization is required'],
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Lead name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Lead email is required'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    company: {
      type: String,
      trim: true,
      default: 'N/A',
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Closed Won', 'Closed Lost'],
      default: 'New',
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Urgent'],
      default: 'Medium',
    },
    value: {
      type: Number,
      default: 0,
    },
    source: {
      type: String,
      enum: ['Website', 'Referral', 'Inbound Call', 'Cold Outreach', 'Event', 'Public Form', 'Other'],
      default: 'Website',
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    notes: [noteSchema],
    activityLog: [activityLogSchema],
    slaDueDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

leadSchema.index({ name: 'text', email: 'text', company: 'text' });
leadSchema.index({ organizationId: 1, status: 1 });
leadSchema.index({ organizationId: 1, assignedTo: 1 });
leadSchema.index({ organizationId: 1, createdAt: -1 });

export const Lead = mongoose.model('Lead', leadSchema);
