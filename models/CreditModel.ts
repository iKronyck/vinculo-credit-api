import mongoose, { Document, Schema } from 'mongoose';

export interface ICredit extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  identification: string;
  department: string;
  municipio: string;
  direction?: string;
  income: number;
  createdAt: Date;
}

const creditSchema = new Schema<ICredit>({
  firstName: {
    type: String,
    required: [true, 'Firstname is required'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Lastname is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'Phone is required'],
    trim: true,
  },
  identification: {
    type: String,
    required: [true, 'Identification is required'],
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
  },
  municipio: {
    type: String,
    required: [true, 'Municipio is required'],
  },
  direction: {
    type: String,
  },
  income: {
    type: Number,
    required: [true, 'Income must have a value'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

export const CreditModel = mongoose.model<ICredit>('Credit', creditSchema);
