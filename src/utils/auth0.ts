import { Auth0Client } from '@auth0/nextjs-auth0/server';
import { NextRequest } from 'next/server';

export const auth0 = new Auth0Client();

// Helper function to get session in API routes
export async function getApiSession(req: Request) {
    // Create a NextRequest from the standard Request
    const nextReq = new NextRequest(req.url, {
        headers: req.headers,
        method: req.method,
        body: req.body,
    });

    try {
        // Use the edge-compatible getSession
        const session = await auth0.getSession(nextReq);
        return session;
    } catch (error) {
        console.error('Error getting Auth0 session:', error);
        return null;
    }
}
