import { NextRequest, NextResponse } from 'next/server';
import { getEnvVars } from './lib/env';
import { createClient } from '@supabase/supabase-js';

const { supabaseUrl, supabaseAnonKey } = getEnvVars();
const supabase = createClient(supabaseUrl!, supabaseAnonKey!);

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();

    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    // Check for errors or if session is null
    if (sessionError || !session) {
        console.error('Error getting session:', sessionError?.message || 'Session is null');
        return res;
    }

    // Access the token and check for user
    const token = session.access_token;
    const user = session.user;

    if (!user) {
        console.error('User not found in session');
        return res;
    }

    console.log('Access Token:', token);
    console.log('Session:', session);
    console.log('User:', user);

    // Fetch company_id from user_company table
    const { data, error: companyError } = await supabase
        .from('user_company')
        .select('company_id')
        .eq('user_id', user.id)
        .single();

    if (companyError) {
        console.error('Error fetching company:', companyError.message);
        return res;
    }

    const company_id = data?.company_id?.toString();
    const user_id = user.id.toString();

    if (token && company_id && user_id) {
        req.headers.set('company_id', company_id);
        req.headers.set('user_id', user_id);
    }

    return res;
}

export const config = {
    matcher: '/api/:path*', // Apply middleware only to API routes
};
