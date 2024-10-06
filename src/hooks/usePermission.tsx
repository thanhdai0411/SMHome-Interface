'use client';

import { SMHomePermission } from '@/constants/roles';
import { useAuth } from '@clerk/nextjs';

interface Props {
    permissions: SMHomePermission[];
}
function usePermission({ permissions }: Props) {
    const { has } = useAuth();

    return permissions.some((p) => has?.({ permission: p })) || false;
}

export default usePermission;
