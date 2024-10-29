import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { getEnvVars } from '@/lib/env';
import { createClient } from '@supabase/supabase-js';
import { apiProviderKey } from '@/constants/config';
import { HandlerContext, withSession } from '@/lib/withSession';

const { plaidClientId, plaidSecretKey, plaidEndpoint } = getEnvVars();

const { supabaseUrl, supabaseAnonKey } = getEnvVars();
const supabase = createClient(supabaseUrl!, supabaseAnonKey!);

const handler = async (req: NextApiRequest, res: NextApiResponse, context: HandlerContext) => {
    if (req.method === 'POST') {
        const { public_token } = req.body;

        try {
            // Make a request to Plaid to exchange the public token for an access token
            const response = await axios.post(`${plaidEndpoint}/item/public_token/exchange`, {
                client_id: plaidClientId,
                secret: plaidSecretKey,
                public_token,
            });

            const access_token = response.data.access_token;
            const { user, company } = context;
            const company_id = company.id;
            // const company_id = 1;

            // Insert new Access token
            const { data, error } = await supabase
                .from('api_token')
                .insert({
                    token: access_token,
                    type: 'Access',
                    // expiration_datetime: expire_datetime,
                    company_id: company_id,
                    provider_id: apiProviderKey['plaid'],
                });

            console.log('Insert Data:', data);
            console.log('Insert Error:', error);

            // Return the access token to the client
            res.status(200).json({ access_token: response.data.access_token });
            console.log("Access token:", response.data.access_token);
        } catch (error) {
            console.error("Error exchanging public token:", error);
            res.status(500).json({ message: "Error exchanging public token" });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ message: "Method not allowed" });
    }
};

export default withSession(handler);