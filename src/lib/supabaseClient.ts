// lib/supabaseClient.ts

import { createPagesBrowserClient, SupabaseClient } from '@supabase/auth-helpers-nextjs';
import { getEnvVars } from './env';

const { supabaseUrl, supabaseAnonKey } = getEnvVars();

export const supabase = createPagesBrowserClient<SupabaseClient>({
    supabaseUrl: supabaseUrl as string,
    supabaseKey: supabaseAnonKey as string,
});
