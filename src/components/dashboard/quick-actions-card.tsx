'use client';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

export function QuickActionsCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
                <div>
                    <Button asChild variant={'outline'}>
                        <Link href={'/dashboard/teams/Ca5obWeEeadRmJy9AfoGp'}>
                            View Hornets Info
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
