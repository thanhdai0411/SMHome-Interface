'use client';

import { SMHomeRole } from '@/constants/roles';
import { useAuth } from '@clerk/nextjs';

interface Props {
    role: SMHomeRole;
}
function useRole({ role }: Props) {
    const { has } = useAuth();

    return has?.({ role: role }) || false;
}

export default useRole;
