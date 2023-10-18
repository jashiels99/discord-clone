'use client';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface ActionTooltipProps {
    label: string;
    labelClass?: string;
    children: React.ReactNode;
    side?: 'top' | 'right' | 'bottom' | 'left';
    align?: 'start' | 'center' | 'end';
}

export default function ActionTooltip({
    label,
    labelClass,
    children,
    side,
    align,
}: ActionTooltipProps) {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={50}>
                <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipContent side={side} align={align}>
                    <p className={cn('text-sm font-semibold', labelClass)}>{label}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
