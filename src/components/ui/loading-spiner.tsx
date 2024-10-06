import { cn } from '@/lib/utils';
import { LoaderCircle } from 'lucide-react';

interface LoadingSpinnerProps {
    className?: string;
    text?: string;
}

const LoadingSpinner = ({ className, text }: LoadingSpinnerProps) => {
    return (
        <div className="flex flex-col items-center justify-center">
            <LoaderCircle
                className={cn('h-10 w-10 text-primary animate-spin', className)}
            />
            {text && <p className="text-sm text-gray-500 mt-2">{text}</p>}
        </div>
    );
};

export default LoadingSpinner;
