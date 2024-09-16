import { ErrorClerk } from '@/types/error';
import { toast } from 'sonner';

export const handleErrorClerk = (error: ErrorClerk) => {
    if (error && error.clerkError) {
        const msgs =
            error.errors
                ?.map((v: any) => v?.longMessage)
                .filter((v2: any) => v2) || [];

        toast.error(
            msgs.join('. ') ||
                'Trường nhập không đúng. Vui lòng nhập an toàn hơn',
        );

        return true;
    }
    return false;
};
