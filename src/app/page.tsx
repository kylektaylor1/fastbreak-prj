import { BasePageContainer } from '@/components/common/page-container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { auth0 } from '@/utils/auth0';
import { redirect } from 'next/navigation';

export default async function Home() {
    const session = await auth0.getSession();

    if (session) {
        redirect('/dashboard');
    }
    return (
        <BasePageContainer>
            <Card>
                <CardHeader>
                    <CardTitle>Welcome to the Fastbreak NBA!</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>
                        {
                            'Start by logging in or creating an account to access your dashboard.'
                        }
                    </p>
                </CardContent>
            </Card>
        </BasePageContainer>
    );
}
