import { cn } from '@/utils/helpers.utils';

export function BasePageContainer({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <main
            className={cn(
                'container mt-16 flex flex-col gap-12 py-16',
                className,
            )}
        >
            {children}
        </main>
    );
}
