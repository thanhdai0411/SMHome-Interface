'use server';

import { clerkClient } from '@/configs/clerk';

export default async function getUserAction(
    id: string,
    userWithRole: boolean = true,
) {
    try {
        const res = await clerkClient.users.getUser(id);

        if (res && res.id) {
            if (userWithRole) {
                const roleUser =
                    await clerkClient.users.getOrganizationMembershipList({
                        userId: id,
                        limit: 100,
                    });

                return JSON.parse(
                    JSON.stringify({ ...res, roles: roleUser.data }),
                );
            }

            return JSON.parse(JSON.stringify(res));
        }
    } catch (e: unknown) {
        return JSON.parse(JSON.stringify(e));
    }
}
