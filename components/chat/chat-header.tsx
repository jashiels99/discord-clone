import { Hash } from 'lucide-react';
import MobileToggle from '@/components/mobile-toggle';
import UserAvatar from '../user-avatar';
import SocketIndicator from '@/components/socket-indicator';

interface ChatHeaderProps {
    serverId: string;
    name: string;
    type: 'channel' | 'conversation';
    imageUrl?: string;
}

export default function ChatHeader({
    serverId,
    name,
    type,
    imageUrl,
}: ChatHeaderProps) {
    return (
        <div className="flex items-center h-12 px-3 font-semibold border-b-2 text-md border-neutral-200 dark:border-neutral-800">
            <MobileToggle serverId={serverId} />
            {type === 'channel' && (
                <Hash className="w-5 h-5 mr-2 text-zinc-500 dark:text-zinc-400" />
            )}
            {type === 'conversation' && (
                <UserAvatar
                    src={imageUrl}
                    className="mr-2 w-7 h-7 md:h-7 md:w-7"
                />
            )}
            <p className="font-semibold text-black text-md dark:text-white">
                {name}
            </p>
            <div className="flex items-center ml-auto">
                <SocketIndicator />
            </div>
        </div>
    );
}
