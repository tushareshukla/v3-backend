// organization.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Organization,
  OrganizationSchema,
} from '../../database/schemas/organization.schema';
import { OrganizationService } from './organizations.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Organization.name, schema: OrganizationSchema },
    ]),
  ],
  providers: [OrganizationService],
  exports: [OrganizationService],
})
export class OrganizationModule {}
