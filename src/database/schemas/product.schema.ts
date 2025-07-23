import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type ProductDocument = Product & Document;

function genProductId() {
  return 'prod-' + uuidv4().replace(/-/g, '').slice(0, 8);
}

@Schema({ timestamps: true })
export class Product {
  @Prop({ default: genProductId, unique: true, index: true })
  productId: string;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  description?: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
