import { BasePageContainer } from '@/components/common/page-container';
import { BaseTeamByIdView } from '@/components/dashboard/BaseTeamByIdView';
import { db } from '@/db';
import {
    type BasePlayerGameStatsTable,
    type BasePlayerTable,
    playerTable,
} from '@/db/schema';
import { eq } from 'drizzle-orm';

export type PlayerWithStats = BasePlayerTable & {
    playerGameStatsTable: BasePlayerGameStatsTable[];
};

async function getTeamPlayerStats(teamId: string): Promise<PlayerWithStats[]> {
    // note this only works for one season in db
    const stats = await db.query.playerTable.findMany({
        where: eq(playerTable.teamId, teamId),
        with: {
            playerGameStatsTable: true,
        },
    });

    return stats;
}

export default async function TeamsByIdPage({
    params,
}: {
    params: Promise<{ teamId: string }>;
}) {
    const { teamId } = await params;
    if (!teamId) {
        return <div>Team ID is required</div>;
    }

    const playerStats = await getTeamPlayerStats(teamId);

    return (
        <BasePageContainer>
            <BaseTeamByIdView playerStats={playerStats} />
        </BasePageContainer>
    );
}
