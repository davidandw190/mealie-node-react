import { Schema, model } from 'mongoose';

interface IUser extends Document {
  auth0_id: string;
  email: string;
  name: string;
  addressLine1?: string;
  city?: string;
  country?: string;
}

const userSchema: Schema = new Schema(
  {
    auth0_id: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    name: { type: String, required: false },
    addressLine1: { type: String, required: false },
    city: { type: String, required: false },
    country: { type: String, required: false },
  },
  { timestamps: true },
);

const UserModel = model<IUser>("User", userSchema);

export default UserModel;
