import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { getEnvVars } from '@/lib/env';
import { supabase } from '@/lib/supabaseClient';

const { plaidClientId, plaidSecretKey, plaidEndpoint, plaidEnvironment } = getEnvVars();

// API route handler
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            // Check for the Supabase access token in the Authorization header
            const token = req.headers.authorization?.split(' ')[1]; // Bearer token
            if (!token) {
                return res.status(401).json({ message: "Unauthorized: No token provided" });
            }

            // Validate the session using the token
            const { data: { user }, error } = await supabase.auth.getUser(token);
            if (error || !user) {
                return res.status(401).json({ message: "Unauthorized: Invalid session" });
            }

            const userId = user.id;

            // Create the link token using Plaid API
            const response = await axios.post(`${plaidEndpoint}/link/token/create`, {
                client_id: plaidClientId,
                secret: plaidSecretKey,
                user: {
                    client_user_id: userId, // Unique identifier for your user
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
