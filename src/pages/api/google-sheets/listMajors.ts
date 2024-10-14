// pages/api/listMajors.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';

/**
 * API route handler.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Retrieve the access token from the user's session or request
        const accessToken = req.headers.authorization?.split(' ')[1];
        console.log("Headers: ", req.headers);
        console.log("Access Token: ", accessToken);

        if (!accessToken) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        // Create an OAuth2 client with the access token
        const auth = new google.auth.OAuth2();
        auth.setCredentials({ access_token: accessToken });

        // Verify the token and ensure it has the required scopes
        const tokenInfo = await auth.getTokenInfo(accessToken);
        if (!tokenInfo.scopes.includes('https://www.googleapis.com/auth/spreadsheets.readonly')) {
            return res.status(403).json({ error: 'Insufficient permissions' });
        }

        // Use the authenticated client to access Google Sheets API
        const sheets = google.sheets({ version: 'v4', auth });
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
            range: 'Class Data!A2:E',
        });

        const rows = response.data.values;
        if (!rows || rows.length === 0) {
            res.status(200).json({ data: [] });
            return;
        }

        const data = rows.map((row) => ({
            name: row[0],
            major: row[4],
        }));

        res.status(200).json({ data });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
}
