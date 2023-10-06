import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function DELETE(
    req: Request,
    { params }: { params: { memberId: string } }
) {
    try {
        const { searchParams } = new URL(req.url);
        const profile = await currentProfile();

        const serverId = searchParams.get('serverId');

        if (!serverId) {
            return new NextResponse('Server ID missing', { status: 401 });
        }

        if (!params.memberId) {
            return new NextResponse('Member ID missing', { status: 401 });
        }

        if (!profile) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const server = await db.server.update({
            where: {
                id: serverId,
                profileId: profile.id,
            },
            data: {
                members: {
                    deleteMany: {
                        id: params.memberId,
                        profileId: {
                            not: profile.id, // Can't kick yourself
                        },
                    },
                },
            },
            include: {
                members: {
                    include: {
                        profile: true,
                    },
                    orderBy: {
                        role: 'asc',
                    },
                },
            },
        });

        return NextResponse.json(server);
    } catch (error) {
        console.log('[MEMBERS_ID_DELETE]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { memberId: string } }
) {
    try {
        const profile = await currentProfile();
        const { searchParams } = new URL(req.url);
        const { role } = await req.json();

        const serverId = searchParams.get('serverId');

        if (!serverId) {
            return new NextResponse('Server ID missing', { status: 400 });
        }

        if (!params.memberId) {
            return new NextResponse('Member ID missing', { status: 400 });
        }

        if (!profile) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const server = await db.server.update({
            where: {
                id: serverId,
                profileId: profile.id,
            },
            data: {
                members: {
                    update: {
                        where: {
                            id: params.memberId,
                            profileId: {
                                not: profile.id, // Ensure admin isn't changing their own role as we always need an admin
                            },
                        },
                        data: {
                            role,
                        },
                    },
                },
            },
            include: {
                members: {
                    include: {
                        profile: true,
                    },
                    orderBy: {
                        role: 'asc',
                    },
                },
            },
        });

        return NextResponse.json(server);
    } catch (error) {
        console.log('[MEMBERS_ID_PATCH]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}
