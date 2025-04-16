import { BasePageContainer } from '@/components/common/page-container';
import { QuickActionsCard } from '@/components/dashboard/quick-actions-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { db } from '@/db';
import { teamTable } from '@/db/schema';
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
            </div>
        </BasePageContainer>
    );
}
