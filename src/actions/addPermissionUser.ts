'use server';

import { clerkClient } from '@/configs/clerk';
import { revalidatePath } from 'next/cache';

const organizationId =
    process.env.NEXT_PUBLIC_ORGANIZATION_ID ||
    'org_2lq0y5HaYSZCCzXC7lAlfjC1Jy1';

export default async function addPermissionUser(role: string, userId: string) {
    try {
        const permission =
            await clerkClient.users.getOrganizationMembershipList({
                userId,
                limit: 100,
            });

        const listRole = permission.data.map((v) => v.role);
        let response;
        const dataAcion = {
            organizationId,
            userId,
            role,
        };
        if (listRole.length > 0) {
            response =
                await clerkClient.organizations.updateOrganizationMembership(
                    dataAcion,
                );
        } else {
            response =
                await clerkClient.organizations.createOrganizationMembership(
                    dataAcion,
                );
        }

        if (response && response.id) {
            revalidatePath('/users');
            return JSON.parse(JSON.stringify(response));
        }
    } catch (e: unknown) {
        return JSON.parse(JSON.stringify(e));
    }
}
