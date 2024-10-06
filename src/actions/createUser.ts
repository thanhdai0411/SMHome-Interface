'use server';

import { FormCreateUserType } from '@/components/user/dialog-add-user';
import { clerkClient } from '@/configs/clerk';
import { revalidatePath } from 'next/cache';

export default async function createUserAction(values: FormCreateUserType) {
    try {
        const res = await clerkClient.users.createUser({
            lastName: values.lastName,
            firstName: values.firstName,
            password: values.password,
            emailAddress: [values.email],
            skipPasswordChecks: true,
        });

        if (res && res.id) {
            revalidatePath('/users');
        }
    } catch (e: unknown) {
        return JSON.parse(JSON.stringify(e));
    }
}
