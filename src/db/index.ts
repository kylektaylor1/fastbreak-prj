import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
}

export const db = drizzle({
    connection: {
        url: process.env.DATABASE_URL,
        authToken: process.env.TURSO_AUTH_TOKEN,
    },
    schema,
});
