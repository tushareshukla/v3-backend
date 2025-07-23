import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ default: uuidv4, unique: true, index: true })
  userId: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: Types.ObjectId, ref: 'Organization', required: true })
  organization: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }], default: [] })
  products: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: 'Role', required: true })
  role: Types.ObjectId;

  @Prop({ default: false })
  verified: boolean;

  @Prop({ type: String, enum: ['active', 'inactive'], default: 'active' })
  status: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
