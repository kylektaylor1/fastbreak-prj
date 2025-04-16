'use client';
import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import { Button } from '../ui/button';

export function NavBar() {
    const { user, isLoading } = useUser();
    return (
        <nav className='fixed top-0 z-50 flex h-16 w-full bg-zinc-900 px-4'>
            <div className='container flex h-full w-full items-center justify-between'>
                <div className='flex items-center gap-4'>
                    <p className='font-sans text-lg font-semibold uppercase'>
                        Fastbreak NBA
                    </p>
                    <Button variant={'ghost'} size={'sm'}>
                        <Link href={'/dashboard'}>Dashboard</Link>
                    </Button>
                    <Button variant={'ghost'} size={'sm'}>
                        <Link href={'/dashboard/teams'}>Teams</Link>
                    </Button>
                </div>
                <div className='flex items-center gap-8'>
                    {!isLoading && user ? (
                        <Button asChild>
                            <Link href={'/auth/logout'}>Logout</Link>
                        </Button>
                    ) : (
                        <div className='flex items-center gap-2'>
                            <Button asChild variant={'outline'}>
                                <Link href={'/auth/login'}>Login</Link>
                            </Button>
                            <Button asChild>
                                <Link href={'/auth/login?screen_hint=signup'}>
                                    Sign up
                                </Link>
                            </Button>
                        </div>
                    )}
                    {isLoading && (
                        <p className='text-primary'>Loading Auth...</p>
                    )}
                </div>
            </div>
        </nav>
    );
}
