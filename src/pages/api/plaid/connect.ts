import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@/lib/supabase/api';
import { plaidClient } from './plaidClient';
import { CountryCode, Products } from 'plaid';

// API route handler
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            const supabase = await createClient(req, res);

            const { data: { user }, error } = await supabase.auth.getUser();
            if (error || !user) {
                console.error('Unauthorized (invalid session):', error);
                return res.status(401).json({ message: "Unauthorized: Invalid session" });
            }

            const user_id = user.id;

            // Create the link token using Plaid client
            const request = {
                user: {
                    client_user_id: user_id,
                },
                client_name: "React Plaid Setup",
                products: [Products.Auth, Products.Transactions],
                country_codes: [CountryCode.Us],
                language: "en",
            };

            const response = await plaidClient.linkTokenCreate(request);
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