'use client';

import ActionTooltip from '@/components/action-tooltip';
import { useModal } from '@/hooks/use-modal-store';

interface NavigationActionProps {
    icon: React.ReactNode;
    tooltip: string;
}

export default function NavigationAction({
    icon,
    tooltip,
}: NavigationActionProps) {
    const { onOpen } = useModal();

    return (
        <div>
            <ActionTooltip side="right" align="center" label={tooltip}>
                <button
                    onClick={() => onOpen('createServer')}
                    className="flex items-center group"
                >
                    <div className="flex items-center justify-center w-12 h-12 mx-3 overflow-hidden transition-all rounded-3xl group-hover:rounded-2xl group-hover:bg-emerald-500 bg-background dark:bg-neutral-700">
                        {icon}
                    </div>
                </button>
            </ActionTooltip>
        </div>
    );
}
