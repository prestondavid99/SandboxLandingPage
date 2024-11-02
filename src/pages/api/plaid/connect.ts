import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { getEnvVars } from '@/lib/env';
import { createClient, createAPIClient } from '@/lib/supabase/supabaseServer';

const { 
    plaidClientId, 
    plaidSecretKey, 
    plaidEndpoint, 
    plaidEnvironment,
    supabaseUrl,
    supabaseAnonKey
} = getEnvVars();

// API route handler
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            const supabase = createAPIClient(req, res);

            const { data: { user }, error } = await supabase.auth.getUser();
            if (error || !user) {
                console.error('Unauthorized (invalid session):', error);
                return res.status(401).json({ message: "Unauthorized: Invalid session" });
            }

            const user_id = user.id;

            // Create the link token using Plaid API
            const response = await axios.post(`${plaidEndpoint}/link/token/create`, {
                client_id: plaidClientId,
                secret: plaidSecretKey,
                user: {
                    client_user_id: user_id, // Unique identifier for your user
                },
                client_name: "React Plaid Setup",
                products: ["auth", "transactions"],
                country_codes: ["US"],
                language: "en",
            });

            res.json({ link_token: response.data.link_token });
        } catch (error) {
            console.error("Error creating link token:", error);
            res.status(500).json({ message: "Error creating link token" });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ message: "Method not allowed" });
    }
};

export default handler;
