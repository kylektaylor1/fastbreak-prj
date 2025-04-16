'use client';

import { type PlayerWithStats } from '@/app/(dashboard)/dashboard/teams/[teamId]/page';
import {
    ChartContainer,
    ChartTooltip,
    ChartLegend,
    ChartLegendContent,
} from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

type Props = {
    playerStats: PlayerWithStats[];
};

export function BaseTeamFgVsThreeChart({ playerStats }: Props) {
    const chartData = playerStats
        .map((player) => {
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

            const fgPercentage =
                totalFgAttempts > 0 ? (totalFgMade / totalFgAttempts) * 100 : 0;
            const threePercentage =
                totalThreeAttempts > 0
                    ? (totalThreeMade / totalThreeAttempts) * 100
                    : 0;

            return {
                name: player.name,
                fgMade: totalFgMade,
                threeMade: totalThreeMade,
                fgPercentage: Number(fgPercentage.toFixed(1)),
                threePercentage: Number(threePercentage.toFixed(1)),
            };
        })
        .sort((a, b) => b.fgPercentage - a.fgPercentage); // Sort by FG% descending

    const config = {
        fgMade: {
            label: 'Field Goals Made',
            color: '#2563eb', // blue
        },
        threeMade: {
            label: 'Three Pointers Made',
            color: '#dc2626', // red
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
                        content={({ active, payload }) => {
                            if (!active || !payload?.length) return null;

                            const data = payload[0].payload;
                            return (
                                <div className='bg-background rounded-lg border p-2 shadow-sm'>
                                    <div className='font-medium'>
                                        {data.name}
                                    </div>
                                    <div className='text-muted-foreground text-sm'>
                                        FG%: {data.fgPercentage}%
                                    </div>
                                    <div className='text-muted-foreground text-sm'>
                                        3P%: {data.threePercentage}%
                                    </div>
                                    <div className='text-sm'>
                                        Field Goals: {data.fgMade}
                                    </div>
                                    <div className='text-sm'>
                                        Three Pointers: {data.threeMade}
                                    </div>
                                </div>
                            );
                        }}
                    />
                    <ChartLegend
                        content={({ payload }) => (
                            <ChartLegendContent payload={payload} />
                        )}
                    />
                    <Bar
                        dataKey='fgMade'
                        name='Field Goals Made'
                        fill='#2563eb'
                    />
                    <Bar
                        dataKey='threeMade'
                        name='Three Pointers Made'
                        fill='#dc2626'
                    />
                </BarChart>
            </ChartContainer>
        </div>
    );
}
