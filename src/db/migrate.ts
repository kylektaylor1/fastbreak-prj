import { drizzle } from 'drizzle-orm/libsql';
import { migrate } from 'drizzle-orm/libsql/migrator';
import { createClient } from '@libsql/client';

const runMigrate = async () => {
    if (!process.env.DATABASE_URL) throw new Error('Bad env variables');

    console.log(
        process.env.REQUIRES_DB_AUTH_TOKEN,
        'process.env.REQUIRES_DB_AUTH_TOKEN',
    );

    const client = createClient({
        url: process.env.DATABASE_URL,
        // if we are in prod, we need thea auth token
        ...(process.env.REQUIRES_DB_AUTH_TOKEN === 'true' && {
            authToken: process.env.TURSO_AUTH_TOKEN,
        }),
    });

    const db = drizzle(client, { logger: true });

    console.log('Running migrations...');

    const start = Date.now();

    await migrate(db, { migrationsFolder: './drizzle' });

    const end = Date.now();

    console.log(`Migrations complete in ${end - start}ms`);

    process.exit(0);
};

runMigrate().catch((err) => {
    console.error('Migrations failed');
    console.error(err);
    process.exit(1);
});
