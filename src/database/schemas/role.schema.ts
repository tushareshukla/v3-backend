import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type RoleDocument = Role & Document;

function genRoleId() {
  return 'role-' + uuidv4().replace(/-/g, '').slice(0, 8);
}

@Schema({ timestamps: true })
export class Role {
  @Prop({ default: genRoleId, unique: true, index: true })
  roleId: string; // Public role ID, e.g., "role-2a45e8d1"

  @Prop({ required: true })
  name: string; // "admin", "member", etc.

  @Prop({ type: [String], default: [] })
  features: string[]; // List of feature/permission keys, e.g., ["create_campaign", "edit_user"]
}

export const RoleSchema = SchemaFactory.createForClass(Role);
