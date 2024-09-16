'use server';

import { clerkClient } from '@/configs/clerk';
import { revalidatePath } from 'next/cache';

export default async function deleteUserAction(id: string) {
    try {
        const res = await clerkClient.users.deleteUser(id);

        if (res && res.id) {
            revalidatePath('/users');
        }
    } catch (e: unknown) {
        return JSON.parse(JSON.stringify(e));
    }
}
