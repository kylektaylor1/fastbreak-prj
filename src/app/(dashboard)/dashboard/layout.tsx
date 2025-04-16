import { auth0 } from '@/utils/auth0';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth0.getSession();
    if (!session) {
        redirect('/');
    }
    return <main className={``}>{children}</main>;
}
