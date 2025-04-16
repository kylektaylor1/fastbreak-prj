import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { NavBar } from '@/components/common/nav-bar';
import { Auth0Provider } from '@auth0/nextjs-auth0';
import { auth0 } from '@/utils/auth0';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Fastbreak Interview Project',
    description: 'Created by Kyle',
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth0.getSession();
    return (
        <html lang='en'>
            <body
                className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}
            >
                <Auth0Provider user={session?.user}>
                    <NavBar />
                    {children}
                </Auth0Provider>
                <Toaster />
            </body>
        </html>
    );
}
