import { NextResponse } from 'next/server';
import { db } from '@/db';
import { userFavoriteTeamTable } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { getApiSession } from '@/utils/auth0';

export async function POST(req: Request) {
    try {
        const session = await getApiSession(req);
        console.log('Session object:', JSON.stringify(session, null, 2));

        if (!session?.user) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        // Make sure we're using the right property for user ID
        const userId = session.user.id || session.user.sub;
        if (!userId) {
            return new NextResponse('User ID not found in session', {
                status: 401,
            });
        }

        const body = await req.json();
        const { team_id, is_favorite } = body;

        if (!team_id || typeof is_favorite !== 'boolean') {
            return new NextResponse('Missing required fields', { status: 400 });
        }

        if (is_favorite) {
            // Add to favorites
            await db.insert(userFavoriteTeamTable).values({
                id: nanoid(),
                userId: userId, // Use the userId from session
                teamId: team_id,
            });
        } else {
            // Remove from favorites
            await db.delete(userFavoriteTeamTable).where(
                and(
                    eq(userFavoriteTeamTable.userId, userId), // Use the userId from session
                    eq(userFavoriteTeamTable.teamId, team_id),
                ),
            );
        }

        return new NextResponse('Success', { status: 200 });
    } catch (error) {
        console.error('Error in add-favorite:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
