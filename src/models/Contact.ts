import mongoose, { Document, Schema } from 'mongoose';

export interface IContact extends Document {
    _id: string;
  name: string;
  email: string;
  phone?: string;
  group: 'Friends' | 'Family' | 'Work' | 'Other';
}

const ContactSchema: Schema<IContact> = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  phone: { type: String },
  group: {
    type: String,
    enum: ['Friends', 'Family', 'Work', 'Other'],
    default: 'Other'
  }
});

export default mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);
