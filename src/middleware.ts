import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/supabaseServer';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
    // Create Supabase client for SSR
    const supabase = createClient();

    // Get user session
    const { data: { session } } = await supabase.auth.getSession();

    // Create a response object
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    // Handle API routes
    if (request.nextUrl.pathname.startsWith('/api')) {
        if (!session) {
            console.error('No session found for API route');
            return response;
        }

        const user = session.user;
        const user_id = user.id;

        // Fetch company_id from user_company table
        const { data, error: companyError } = await supabase
            .from('user_company')
            .select('company_id')
            .eq('user_id', user_id)
            .single();

        if (companyError) {
            console.error('Error fetching company:', companyError.message);
            return response;
        }

        const company_id = data?.company_id?.toString();

        if (company_id && user_id) {
            response.headers.set('company_id', company_id);
            response.headers.set('user_id', user_id);
        }
    } else {
        // define protected routes (user must be logged in to access)
        const isProtectedRoute = 
            request.nextUrl.pathname.startsWith('/profile') ||
            request.nextUrl.pathname.startsWith('/cashflow');

        if (!session && isProtectedRoute) {
            const redirectUrl = request.nextUrl.clone();
            redirectUrl.pathname = '/login';
            return NextResponse.redirect(redirectUrl);
        }
    }

    // Update the session
    const newResponse = await updateSession(request);

    return newResponse;
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};