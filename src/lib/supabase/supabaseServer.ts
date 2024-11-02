// use this for accessing supabase server side

'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { getEnvVars } from '../env';
import { NextApiRequest, NextApiResponse } from 'next';

const { supabaseUrl, supabaseAnonKey } = getEnvVars();

export async function createClient() {
	const cookieStore = await cookies();

	return createServerClient(
		supabaseUrl!,
		supabaseAnonKey!,
		{
			cookies: {
				getAll() {
					return cookieStore.getAll();
				},
				setAll(cookiesToSet) {
					try {
						cookiesToSet.forEach(({ name, value, options }) =>
							cookieStore.set(name, value, options)
						);
					} catch (error) {
						// The `setAll` method was called from a Server Component.
						// This can be ignored if you have middleware refreshing
						// user sessions.
						console.error('Error setting cookies:', error);
					}
				},
			},
		}
	);
}

export function createAPIClient(req: NextApiRequest, res: NextApiResponse) {
    return createServerClient(
        supabaseUrl!,
        supabaseAnonKey!,
        {
            cookies: {
                getAll() {
					return Object.keys(req.cookies).map(name => ({ name, value: req.cookies[name] ?? '' }));
				},
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) => {
                            res.setHeader('Set-Cookie', `${name}=${value}; Path=/; HttpOnly`);
                        });
                    } catch (error) {
                        console.error('Error setting cookies:', error);
                    }
                },
            },
        }
    );
}