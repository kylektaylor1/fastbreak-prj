'use client';

import { type PlayerWithStats } from '@/app/(dashboard)/dashboard/teams/[teamId]/page';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
} from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

type Props = {
    playerStats: PlayerWithStats[];
};

export function BaseTeamPointsPerGameChart({ playerStats }: Props) {
    const chartData = playerStats
        .map((player) => {
            const totalPoints = player.playerGameStatsTable.reduce(
                (acc, game) => acc + (game.points ?? 0),
                0,
            );
            const gamesPlayed = player.playerGameStatsTable.length;
            const pointsPerGame =
                gamesPlayed > 0 ? totalPoints / gamesPlayed : 0;

            return {
                name: player.name,
                pointsPerGame: Number(pointsPerGame.toFixed(1)),
            };
        })
        .sort((a, b) => b.pointsPerGame - a.pointsPerGame); // Sort by PPG descending

    const config = {
        pointsPerGame: {
            label: 'Points Per Game',
            color: '#16a34a', // green
        },
    };

    return (
        <div className='h-[400px] w-full'>
            <ChartContainer config={config}>
                <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis
                        dataKey='name'
                        angle={-45}
                        textAnchor='end'
                        height={60}
                        interval={0}
                        tick={{ fontSize: 12 }}
                    />
                    <YAxis />
                    <ChartTooltip
                        content={({ active, payload }) => (
                            <ChartTooltipContent
                                active={active}
                                payload={payload}
                                label='Points Per Game'
                            />
                        )}
                    />
                    <ChartLegend
                        content={({ payload }) => (
                            <ChartLegendContent payload={payload} />
                        )}
                    />
                    <Bar
                        dataKey='pointsPerGame'
                        name='Points Per Game'
                        fill='#16a34a'
                    />
                </BarChart>
            </ChartContainer>
        </div>
    );
}
