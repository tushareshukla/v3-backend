import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type OrganizationDocument = Organization & Document;

function genOrgId() {
  return 'org-' + uuidv4().replace(/-/g, '').slice(0, 8);
}

@Schema({ timestamps: true })
export class Organization {
  @Prop({ default: genOrgId, unique: true, index: true })
  orgId: string;

  @Prop({ required: true, unique: true })
  domain: string;

  @Prop({ required: true })
  displayName: string;

  @Prop({ required: true, unique: true })
  orgName: string;

  @Prop({ default: null })
  branding?: { logoUrl?: string };

  @Prop({
    type: Object,
    default: { currency: 'USD', amount: 0 },
  })
  budget?: { currency: string; amount: number };
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
