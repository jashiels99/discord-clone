'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import ActionTooltip from '@/components/action-tooltip';

interface NavigationItemProps {
    id: string;
    imageUrl: string;
    name: string;
}

export default function NavigationItem({
    id,
    imageUrl,
    name,
}: NavigationItemProps) {
    const params = useParams();
    const router = useRouter();

    const handleClick = () => {
        router.push(`/servers/${id}`);
    };

    return (
        <ActionTooltip side="right" align="center" label={name}>
            <button
                onClick={handleClick}
                className="relative flex items-center group"
            >
                <div
                    className={cn(
                        'absolute left-0 bg-primary rounded-r-full transition-all w-1',
                        params?.serverId !== id && 'group-hover:h-[1.25rem]',
                        params?.serverId === id ? 'h-9' : 'h-2'
                    )}
                />
                <div
                    className={cn(
                        'relative group flex mx-3 h-12 w-12 rounded-3xl group-hover:rounded-2xl transition-all overflow-hidden',
                        params?.serverId === id &&
                            'bg-primary/10 text-primary rounded-2xl'
                    )}
                >
                    <Image fill src={imageUrl} alt="Channel" />
                </div>
            </button>
        </ActionTooltip>
    );
}
