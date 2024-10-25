import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { getEnvVars } from '@/lib/env';

const { plaidClientId, plaidSecretKey, plaidEndpoint } = getEnvVars();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { public_token } = req.body;

        try {
            // Make a request to Plaid to exchange the public token for an access token
            const response = await axios.post(`${plaidEndpoint}/item/public_token/exchange`, {
                client_id: plaidClientId,
                secret: plaidSecretKey,
                public_token,
            });

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

export default handler;
