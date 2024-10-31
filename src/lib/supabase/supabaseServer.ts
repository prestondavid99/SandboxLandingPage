// use this for accessing supabase server side

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { getEnvVars } from '../env';

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
						console.error('error setting cookies:', error);
					}
				},
			},
		}
	);
}