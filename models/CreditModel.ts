import mongoose, { Document, Schema } from 'mongoose';

export interface ICredit extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  identification: string;
  department: string;
  municipio: string;
  direction?: string;
  income: number;
  document: string;
  selfie: string;
  createdAt: Date;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     creditSchema:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Identificador único del crédito
 *         firstName:
 *           type: string
 *           description: Nombre del solicitante
 *         lastName:
 *           type: string
 *           description: Apellido del solicitante
 *         email:
 *           type: string
 *           description: Correo electrónico del solicitante
 *         phone:
 *           type: string
 *           description: Número de teléfono del solicitante
 *         identification:
 *           type: string
 *           description: Identificación del solicitante
 *         department:
 *           type: string
 *           description: Departamento del solicitante
 *         municipio:
 *           type: string
 *           description: Municipio del solicitante
 *         direction:
 *           type: string
 *           description: Dirección del solicitante (opcional)
 *         document:
 *           type: string
 *           description: Documento del solicitante
 *         selfie:
 *           type: string
 *           description: Selfie del solicitante
 *         income:
 *           type: number
 *           description: Ingreso del solicitante
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del crédito
 */

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
  document: {
    type: String,
  },
  selfie: {
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
