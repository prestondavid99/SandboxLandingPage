// lib/withSession.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient, type User } from '@supabase/supabase-js';
import type { Company } from '@/types/types';
import { getEnvVars } from './env';

export interface HandlerContext {
    user: User;
    company: Company;
}

const { supabaseUrl, supabaseAnonKey } = getEnvVars();
const supabase = createClient(supabaseUrl!, supabaseAnonKey!);

export const withSession = (handler: any) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            // Check for the Supabase access token in the Authorization header
            const token = req.headers.authorization?.split(' ')[1]; // Bearer token
            if (!token) {
                console.log('No token provided');
                return res.status(401).json({ message: "Unauthorized: No token provided" });
            }

            // Validate the session using the token
            const { data: { user }, error } = await supabase.auth.getUser(token);
            if (error || !user) {
                console.error('Error in withSession middleware:', error);
                console.log('User:', user);
                return res.status(401).json({ message: "Unauthorized: Invalid session" });
            }

            const { data: { session }, error: sessionError } = await supabase.auth.getSession();
            console.log('Session:', session);
            console.log('Session Error:', sessionError);

            if (sessionError || !session) {
                console.error('Error in withSession middleware:', sessionError);
                return res.status(500).json({ error: 'Internal server error' });
            }

            const { data: companyId } = await supabase
                .from('user_company')
                .select('company_id')
                .eq('user_id', session.user.id)
                .single();


            const { data: company } = await supabase
                .from('company')
                .select('id, name')
                .eq('id', companyId?.company_id)
                .single();



            const context: HandlerContext = {
                user: session.user,
                company: company as Company,
            };

            return handler(req, res, context);
        } catch (error) {
            console.error('Error in withSession middleware:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };
};
