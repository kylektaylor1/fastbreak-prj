import { BasePageContainer } from '@/components/common/page-container';
import { QuickActionsCard } from '@/components/dashboard/quick-actions-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { db } from '@/db';
import { teamTable, userFavoriteTeamTable } from '@/db/schema';
import { auth0 } from '@/utils/auth0';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

export default async function Home() {
    const session = await auth0.getSession();

    if (!session) {
        redirect('/');
    }

    const hornetsTeam = await db.query.teamTable.findFirst({
        where: eq(teamTable.abbreviation, 'CHA'),
    });
    const hornetsTeamId = hornetsTeam?.id;

    // Get user's favorite teams
    const favoriteTeams = await db
        .select()
        .from(userFavoriteTeamTable)
        .where(eq(userFavoriteTeamTable.userId, session.user.sub));

    // Get team details for favorite teams
    const favoriteTeamDetails = await Promise.all(
        favoriteTeams.map(async (favorite) => {
            return await db.query.teamTable.findFirst({
                where: eq(teamTable.id, favorite.teamId),
            });
        })
    );

    return (
        <BasePageContainer>
            <div className='grid grid-cols-3 gap-8'>
                <Card>
                    <CardHeader>
                        <CardTitle>Welcome, {session.user.name}!</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{'You can...'}</p>
                        <ul>
                            <li>View team stats</li>
                            <li>View player stats</li>
                            <li>Favorite a team</li>
                        </ul>
                    </CardContent>
                </Card>

                {hornetsTeamId && (
                    <QuickActionsCard hornetsTeamId={hornetsTeamId} />
                )}

                <Card>
                    <CardHeader>
                        <CardTitle>Your Favorite Teams</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {favoriteTeamDetails.length > 0 ? (
                            <ul className="list-disc pl-4">
                                {favoriteTeamDetails.map((team) => (
                                    <li key={team?.id}>{team?.name}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No favorite teams yet. Visit the Teams page to add some!</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </BasePageContainer>
    );
}
