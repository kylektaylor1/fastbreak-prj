'use client';

import { type ColumnDef } from '@tanstack/react-table';
import { DataTable } from '../ui/data-table';
import { useMemo, useState } from 'react';
import { type SortingState } from '@tanstack/react-table';
import { Checkbox } from '../ui/checkbox';
import { type BaseTeamTable } from '@/db/schema';

type TeamColumns = BaseTeamTable & {
    is_favorite?: boolean;
};

function FavoriteCheckbox({
    team,
    userId,
}: {
    team: TeamColumns;
    userId: string;
}) {
    const [isChecked, setIsChecked] = useState(team.is_favorite ?? false);

    const handleFavorite = async (checked: boolean) => {
        try {
            const response = await fetch('/api/teams/add-favorite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: userId,
                    team_id: team.id,
                    is_favorite: checked,
                }),
            });

            if (response.ok) {
                setIsChecked(checked);
            }
        } catch (error) {
            console.error('Error updating favorite:', error);
        }
    };

    return (
        <Checkbox
            checked={isChecked}
            onCheckedChange={handleFavorite}
            aria-label='Select team as favorite'
        />
    );
}

type Props = {
    teams: TeamColumns[];
    userId: string;
};

export function BaseTeamsTable({ teams, userId }: Props) {
    const columns: ColumnDef<TeamColumns>[] = useMemo(
        () => [
            {
                id: 'favorite',
                header: 'Favorite',
                cell: ({ row }) => (
                    <FavoriteCheckbox team={row.original} userId={userId} />
                ),
                enableSorting: false,
            },
            {
                accessorKey: 'name',
                header: 'Team',
                enableSorting: false,
            },
            {
                accessorKey: 'conference',
                header: 'Conference',
                enableSorting: true,
            },
            {
                accessorKey: 'wins',
                header: 'Wins',
                enableSorting: true,
            },
            {
                accessorKey: 'losses',
                header: 'Losses',
                enableSorting: true,
            },
        ],
        [userId],
    );

    const [sorting, setSorting] = useState<SortingState>([
        {
            id: 'wins',
            desc: true,
        },
    ]);

    return (
        <div>
            <DataTable
                columns={columns}
                data={teams}
                sorting={sorting}
                onSortingChange={setSorting}
            />
        </div>
    );
}
