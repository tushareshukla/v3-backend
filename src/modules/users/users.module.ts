// user.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { Role, RoleSchema } from './role.schema';
import { UserService } from './user.service';
// Do **not** import OrganizationService directly!
import { OrganizationModule } from '../organization/organization.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema }
    ]),
    OrganizationModule, // 👈 Import the whole module
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
