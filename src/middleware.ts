import { NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware'
import { createClient } from './lib/supabase/supabaseServer';

export async function middleware(req: NextRequest) {
    let res = NextResponse.next();
    res = await updateSession(req) || res;

    const supabase = await createClient();
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    // Check for errors or if session is null
    if (sessionError || !session) {
        console.error('Error getting session:', sessionError?.message || 'Session is null');
        return res;
    }

    // Access the token and check for user
    const token = session.access_token;
    const user = await supabase.auth.getUser();
    const user_id = user.data.user?.id;

    if (!user) {
        console.error('User not found in session');
        return res;
    }

    // Fetch company_id from user_company table
    const { data, error: companyError } = await supabase
        .from('user_company')
        .select('company_id')
        .eq('user_id', user_id)
        .single();

    if (companyError) {
        console.error('Error fetching company:', companyError.message);
        return res;
    }

    const company_id = data?.company_id?.toString();

    if (token && company_id && user_id) {
        res.headers.set('company_id', company_id);
        res.headers.set('user_id', user_id);
    }

    return res;
}

export const config = {
    matcher: [
        '/api/:path*',
        // '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ]
};