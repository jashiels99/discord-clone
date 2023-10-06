'use client';

import qs from 'query-string';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useModal } from '@/hooks/use-modal-store';
import { ServerWithMembersWithProfiles } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import UserAvatar from '@/components/user-avatar';
import {
    Check,
    Gavel,
    Loader2,
    MoreVertical,
    Shield,
    ShieldAlert,
    ShieldCheck,
    ShieldQuestion,
} from 'lucide-react';
import { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MemberRole } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const roleIconMap = {
    GUEST: null,
    MODERATOR: <ShieldCheck className="w-5 h-5 text-indigo-500" />,
    ADMIN: <ShieldAlert className="w-5 h-5 text-rose-500" />,
};

export default function MembersModal() {
    const router = useRouter();
    const { onOpen, isOpen, onClose, type, data } = useModal();
    const [loadingId, setLoadingId] = useState('');

    const isModalOpen = isOpen && type === 'members';
    const { server } = data as { server: ServerWithMembersWithProfiles };

    async function onKick(memberId: string) {
        try {
            setLoadingId(memberId);
            const url = qs.stringifyUrl({
                url: `/api/members/${memberId}`,
                query: {
                    serverId: server?.id,
                },
            });
            const response = await axios.delete(url);

            router.refresh();
            onOpen('members', { server: response.data });
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingId('');
        }
    }

    async function onRoleChange(memberId: string, role: MemberRole) {
        try {
            setLoadingId(memberId);
            const url = qs.stringifyUrl({
                url: `/api/members/${memberId}`,
                query: {
                    serverId: server?.id,
                    memberId,
                },
            });
            const response = await axios.patch(url, { role });

            router.refresh();
            onOpen('members', { server: response.data });
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingId('');
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="overflow-hidden text-black bg-white">
                <DialogHeader className="px-6 pt-2">
                    <DialogTitle className="text-2xl font-bold text-center">
                        Manage Members
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        {server?.members?.length} Member
                        {server?.members?.length > 1 ? 's' : ''}
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="mt-8 max-h-[26.25rem] pr-6">
                    {server?.members?.map((member) => (
                        <div
                            key={member.id}
                            className="flex items-center mb-6 gap-x-2"
                        >
                            <UserAvatar src={member.profile.imageUrl} />
                            <div className="flex flex-col gap-y-1">
                                <div className="flex items-center text-xs font-semibold gap-x-1">
                                    {member.profile.name}
                                    {roleIconMap[member.role]}
                                </div>
                                <p className="text-xs text-zinc-500">
                                    {member.profile.email}
                                </p>
                            </div>
                            {server.profileId !== member.profileId &&
                                loadingId !== member.profileId && (
                                    <div className="ml-auto">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <MoreVertical className="w-4 h-4 text-zinc-500" />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent side="left">
                                                <DropdownMenuSub>
                                                    <DropdownMenuSubTrigger className="flex items-center">
                                                        <ShieldQuestion className="w-4 h-4 mr-2" />
                                                        <span>Role</span>
                                                    </DropdownMenuSubTrigger>
                                                    <DropdownMenuPortal>
                                                        <DropdownMenuSubContent>
                                                            <DropdownMenuItem
                                                                onClick={() =>
                                                                    onRoleChange(
                                                                        member.id,
                                                                        MemberRole.GUEST
                                                                    )
                                                                }
                                                            >
                                                                <Shield className="w-4 h-4 mr-2" />
                                                                Guest&nbsp;
                                                                {member.role ===
                                                                    MemberRole.GUEST && (
                                                                    <Check className="w-4 h-4 ml-auto" />
                                                                )}
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                onClick={() =>
                                                                    onRoleChange(
                                                                        member.id,
                                                                        MemberRole.MODERATOR
                                                                    )
                                                                }
                                                            >
                                                                <ShieldCheck className="w-4 h-4 mr-2" />
                                                                Moderator&nbsp;
                                                                {member.role ===
                                                                    MemberRole.MODERATOR && (
                                                                    <Check className="w-4 h-4 ml-auto" />
                                                                )}
                                                            </DropdownMenuItem>
                                                        </DropdownMenuSubContent>
                                                    </DropdownMenuPortal>
                                                </DropdownMenuSub>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        onKick(member.id)
                                                    }
                                                >
                                                    <Gavel className="w-4 h-4 mr-2" />
                                                    Kick
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                )}
                            {loadingId === member.id && (
                                <Loader2 className="w-4 h-4 ml-auto animate-spin text-zinc-500" />
                            )}
                        </div>
                    ))}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}