// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function middleware(req: NextRequest) {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError) {
        console.error('Error getting session:', sessionError.message);
        return null;
    }

    // Access the token
    const token = session?.access_token;
    console.log('Access Token:', token);

    const { data, error: companyError } = await supabase
        .from('user_company')
        .select('company_id')
        .eq('user_id', session?.user.id)
        .single();

    if (companyError) {
        console.error('Error fetching company:', companyError.message);
        return null;
    }

    const company_id = data?.company_id.toString();
    const user_id = session?.user.id.toString();

    if (token && company_id && user_id) {
        req.headers.set('company_id', company_id);
        req.headers.set('user_id', user_id);
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/api/:path*', // Apply middleware only to API routes
};
