'use server';

import { auth } from '@clerk/nextjs/server';

export default async function hasPermission(pms: string) {
    const { has } = auth();
    has({ permission: pms });
}
