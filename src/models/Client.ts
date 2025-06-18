import { Schema, model } from 'mongoose';

const clientSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String },
    address: {
      street: { type: String },
      city: { type: String },
      zip: { type: String },
      country: { type: String },
    },
  },
  {
    timestamps: true, // créé automatiquement createdAt et updatedAt
  },
);

export const Client = model('Client', clientSchema);
