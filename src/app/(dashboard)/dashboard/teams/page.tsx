import { BasePageContainer } from '@/components/common/page-container';
import { BaseTeamsTable } from '@/components/dashboard/BaseTeamsTable';
import { db } from '@/db';
import { gameTable, teamTable, userFavoriteTeamTable } from '@/db/schema';
import { auth0 } from '@/utils/auth0';
import { eq } from 'drizzle-orm';

export default async function TeamsPage() {
    const session = await auth0.getSession();
    if (!session) {
        throw new Error('No session found');
    }

    const userId = session.user.sub;

    // Get all teams
    const teams = await db.select().from(teamTable);

    // Get all games
    const games = await db.select().from(gameTable);

    // Get user's favorite teams
    const favoriteTeams = await db
        .select()
        .from(userFavoriteTeamTable)
        .where(eq(userFavoriteTeamTable.userId, userId));

    const favoriteTeamIds = new Set(favoriteTeams.map((ft) => ft.teamId));

    // Calculate team stats
    const teamsWithStats = teams.map((team) => {
        const teamGames = games.filter(
            (game) =>
                game.homeTeamId === team.id || game.visitorTeamId === team.id,
        );

        const wins = teamGames.reduce((acc, game) => {
            if (!game.homeTeamScore || !game.visitorTeamScore) return acc;
            if (game.homeTeamId === team.id) {
                return (
                    acc + (game.homeTeamScore > game.visitorTeamScore ? 1 : 0)
                );
            } else {
                return (
                    acc + (game.visitorTeamScore > game.homeTeamScore ? 1 : 0)
                );
            }
        }, 0);

        const losses = teamGames.reduce((acc, game) => {
            if (!game.homeTeamScore || !game.visitorTeamScore) return acc;
            if (game.homeTeamId === team.id) {
                return (
                    acc + (game.homeTeamScore < game.visitorTeamScore ? 1 : 0)
                );
            } else {
                return (
                    acc + (game.visitorTeamScore < game.homeTeamScore ? 1 : 0)
                );
            }
        }, 0);

        return {
            ...team,
            games: teamGames,
            is_favorite: favoriteTeamIds.has(team.id),
            wins,
            losses,
        };
    });

    return (
        <BasePageContainer>
            <h1 className='mb-4 text-2xl font-bold'>Teams</h1>
            <BaseTeamsTable teams={teamsWithStats} userId={userId} />
        </BasePageContainer>
    );
}
