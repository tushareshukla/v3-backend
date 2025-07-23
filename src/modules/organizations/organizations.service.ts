// organization.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Organization,
  OrganizationDocument,
} from '../../database/schemas/organization.schema';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectModel(Organization.name)
    private orgModel: Model<OrganizationDocument>,
  ) {}

  async findOrCreateOrganizationByDomain(
    domain: string,
  ): Promise<OrganizationDocument> {
    const normDomain = domain.toLowerCase();
    let organization = await this.orgModel.findOne({ domain: normDomain });

    if (!organization) {
      const orgName = normDomain.split('.')[0];
      organization = await this.orgModel.create({
        domain: normDomain,
        displayName: orgName.charAt(0).toUpperCase() + orgName.slice(1),
        orgName,
        branding: {},
        budget: { currency: 'USD', amount: 0 },
      });
    }
    return organization;
  }
}
