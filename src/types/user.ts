import { OrganizationMembership, User } from '@clerk/backend';

export interface UserMapping extends User {
    roles: OrganizationMembership[];
}
