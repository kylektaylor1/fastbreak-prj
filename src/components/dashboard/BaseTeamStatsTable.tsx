'use client';

import { type ColumnDef } from '@tanstack/react-table';
import { type PlayerWithStats } from '@/app/(dashboard)/dashboard/teams/[teamId]/page';
import { DataTable } from '../ui/data-table';

type PlayerStatsColumns = {
    name: string;
    ppg: number;
    fgPercentage: number;
    threePercentage: number;
    assists: number;
    minutes: number;
    rebounds: number;
};

const columns: ColumnDef<PlayerStatsColumns>[] = [
    {
        accessorKey: 'name',
        header: 'Player',
        enableSorting: false,
    },
    {
        accessorKey: 'ppg',
        header: 'Pts per Game',
        enableSorting: true,
    },
    {
        accessorKey: 'fgPercentage',
        header: 'FG Percentage',
        enableSorting: true,
    },
    {
        accessorKey: 'threePercentage',
        header: '3P Percentage',
        enableSorting: true,
    },
    {
        accessorKey: 'assists',
        header: 'Assists',
        enableSorting: true,
    },
    {
        accessorKey: 'minutes',
        header: 'Minutes',
        enableSorting: true,
    },
    {
        accessorKey: 'rebounds',
        header: 'Rebounds',
        enableSorting: true,
    },
];

type Props = {
    playerStats: PlayerWithStats[];
};

export function BaseTeamStatsTable({ playerStats }: Props) {
    const stats = playerStats.map((player) => {
        const totalGames = player.playerGameStatsTable.length;
        const totalPoints = player.playerGameStatsTable.reduce(
            (acc, game) => acc + (game.points ?? 0),
            0,
        );
        const totalFgMade = player.playerGameStatsTable.reduce(
            (acc, game) => acc + (game.fgMade ?? 0),
            0,
        );
        const totalFgAttempts = player.playerGameStatsTable.reduce(
            (acc, game) => acc + (game.fgAttempts ?? 0),
            0,
        );
        const totalThreeMade = player.playerGameStatsTable.reduce(
            (acc, game) => acc + (game.fgThreeMade ?? 0),
            0,
        );
        const totalThreeAttempts = player.playerGameStatsTable.reduce(
            (acc, game) => acc + (game.fgThreeAtt ?? 0),
            0,
        );
        const totalAssists = player.playerGameStatsTable.reduce(
            (acc, game) => acc + (game.assists ?? 0),
            0,
        );
        const totalMinutes = player.playerGameStatsTable.reduce(
            (acc, game) => acc + (game.minutesPlayed ?? 0),
            0,
        );
        const totalOffensiveRebounds = player.playerGameStatsTable.reduce(
            (acc, game) => acc + (game.offensiveRebounds ?? 0),
            0,
        );
        const totalDefensiveRebounds = player.playerGameStatsTable.reduce(
            (acc, game) => acc + (game.defensiveRebounds ?? 0),
            0,
        );

        return {
            name: player.name || '',
            ppg:
                totalGames > 0
                    ? Number((totalPoints / totalGames).toFixed(1))
                    : 0,
            fgPercentage:
                totalFgAttempts > 0
                    ? Number(((totalFgMade / totalFgAttempts) * 100).toFixed(1))
                    : 0,
            threePercentage:
                totalThreeAttempts > 0
                    ? Number(
                          ((totalThreeMade / totalThreeAttempts) * 100).toFixed(
                              1,
                          ),
                      )
                    : 0,
            assists: totalAssists,
            minutes: totalMinutes,
            rebounds: totalOffensiveRebounds + totalDefensiveRebounds,
        };
    });

    return (
        <div>
            <DataTable columns={columns} data={stats} />
        </div>
    );
}
