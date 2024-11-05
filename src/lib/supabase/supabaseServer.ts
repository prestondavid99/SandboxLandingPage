// use this for accessing supabase server side

'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { getEnvVars } from '../env';

const { supabaseUrl, supabaseAnonKey } = getEnvVars();

export function createClient() {
	const cookieStore = cookies();

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