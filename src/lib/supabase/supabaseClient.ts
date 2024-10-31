// use this for accessing supabase client side

import { getEnvVars } from '../env';
import { createBrowserClient } from '@supabase/ssr';

const { supabaseUrl, supabaseAnonKey } = getEnvVars();

export function createClient() { 
    return createBrowserClient(
        supabaseUrl as string,
        supabaseAnonKey as string,
    )
};

export const supabase = createClient();