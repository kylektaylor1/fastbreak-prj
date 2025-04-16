'use client';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

type Props = {
    hornetsTeamId: string;
};

export function QuickActionsCard({ hornetsTeamId }: Props) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
                <div>
                    <Button asChild variant={'outline'}>
                        <Link href={`/dashboard/teams/${hornetsTeamId}`}>
                            View Hornets Info
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
