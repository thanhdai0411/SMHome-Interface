import { cn } from '@/lib/utils';
import { LoaderCircle } from 'lucide-react';

const LoadingSpinner = ({ className }: { className?: string }) => {
    return (
        <LoaderCircle
            className={cn('h-10 w-10 text-primary animate-spin', className)}
        />
    );
};

export default LoadingSpinner;
