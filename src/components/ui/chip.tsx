import React from 'react';
import { Button } from './button';
import { cn } from '@/lib/utils';

interface ChipProps extends React.ComponentProps<typeof Button> {
    name: string;
    size?: 'default' | 'sm' | 'lg' | 'icon' | null | undefined;
}

function Chip({ name, size = 'sm', className, ...props }: ChipProps) {
    return (
        <Button
            className={cn(
                'rounded-full h-7 border-2 border-yellow-400',
                className,
            )}
            size={size}
            variant={'secondary'}
            {...props}
        >
            {name}
        </Button>
    );
}

export default Chip;
