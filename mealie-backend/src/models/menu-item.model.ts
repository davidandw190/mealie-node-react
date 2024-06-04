import mongoose, { InferSchemaType } from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  _id: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true, 
    default: () => new mongoose.Types.ObjectId() 
  },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

export type MenuItemType = InferSchemaType<typeof menuItemSchema>;
export default menuItemSchema;