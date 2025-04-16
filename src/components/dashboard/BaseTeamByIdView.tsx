'use client';
import { type PlayerWithStats } from '@/app/(dashboard)/dashboard/teams/[teamId]/page';
import { useState } from 'react';
import { BaseTeamStatsTable } from './BaseTeamStatsTable';
import { BaseTeamFgVsThreeChart } from './BaseTeamFgVsThreeChart';
import { BaseTeamPointsPerGameChart } from './BaseTeamPointsPerGameChart';
import { BaseTeamShootingPercentagesChart } from './BaseTeamShootingPercentagesChart';
import { Button } from '@/components/ui/button';

type ViewDef =
    | 'all-stats'
    | 'fg-vs-three'
    | 'points-per-game'
    | 'shooting-percentages';

type Props = {
    playerStats: PlayerWithStats[];
};

export function BaseTeamByIdView({ playerStats }: Props) {
    const [view, setView] = useState<ViewDef>('all-stats');

    return (
        <div className='space-y-4'>
            <div className='flex gap-2'>
                <Button
                    variant={view === 'all-stats' ? 'default' : 'outline'}
                    onClick={() => setView('all-stats')}
                >
                    All Stats
                </Button>
                <Button
                    variant={view === 'fg-vs-three' ? 'default' : 'outline'}
                    onClick={() => setView('fg-vs-three')}
                >
                    FG vs 3P (Shots Made)
                </Button>
                <Button
                    variant={
                        view === 'shooting-percentages' ? 'default' : 'outline'
                    }
                    onClick={() => setView('shooting-percentages')}
                >
                    FG vs 3P (%)
                </Button>
                <Button
                    variant={view === 'points-per-game' ? 'default' : 'outline'}
                    onClick={() => setView('points-per-game')}
                >
                    Points Per Game
                </Button>
            </div>
            {view === 'all-stats' && (
                <BaseTeamStatsTable playerStats={playerStats} />
            )}
            {view === 'fg-vs-three' && (
                <BaseTeamFgVsThreeChart playerStats={playerStats} />
            )}
            {view === 'shooting-percentages' && (
                <BaseTeamShootingPercentagesChart playerStats={playerStats} />
            )}
            {view === 'points-per-game' && (
                <BaseTeamPointsPerGameChart playerStats={playerStats} />
            )}
        </div>
    );
}
