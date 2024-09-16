'use server';

import { clerkClient } from '@/configs/clerk';

export default async function getPermissionUser(userId: string) {
    try {
        const response = await clerkClient.users.getOrganizationMembershipList({
            userId,
            limit: 100,
        });
        return response;
    } catch (e: unknown) {
        return JSON.parse(JSON.stringify(e));
    }
}
