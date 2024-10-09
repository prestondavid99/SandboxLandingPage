import { promises as fs } from 'fs';
import * as path from 'path';
import { authenticate } from '@google-cloud/local-auth';
import { google, sheets_v4 } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

// Define the necessary scopes and paths
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

const CREDENTIALS_PATH = process.env.GOOGLE_CREDENTIALS_PATH || path.join(process.cwd(), 'credentials.json');
const TOKEN_PATH = process.env.GOOGLE_TOKEN_PATH || path.join(process.cwd(), 'token.json');

/**
 * Reads previously authorized credentials from the save file.
 *
 * @returns {Promise<OAuth2Client | null>}
 */
async function loadSavedCredentialsIfExist(): Promise<OAuth2Client | null> {
    try {
        const content = await fs.readFile(TOKEN_PATH, 'utf8');
        const credentials = JSON.parse(content);
        return google.auth.fromJSON(credentials) as OAuth2Client;
    } catch (err) {
        return null;
    }
}

/**
 * Serializes credentials to a file compatible with GoogleAuth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @returns {Promise<void>}
 */
async function saveCredentials(client: OAuth2Client): Promise<void> {
    const content = await fs.readFile(CREDENTIALS_PATH, 'utf8');
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
        type: 'authorized_user',
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request authorization to call APIs.
 *
 * @returns {Promise<OAuth2Client>}
 */
export async function authorize(): Promise<OAuth2Client> {
    let client = await loadSavedCredentialsIfExist();
    if (client) {
        return client;
    }
    client = await authenticate({
        scopes: SCOPES,
        keyfilePath: CREDENTIALS_PATH,
    });
    if (client.credentials) {
        await saveCredentials(client);
    }
    return client;
}

/**
 * Prints the names and majors of students in a sample spreadsheet.
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {OAuth2Client} auth The authenticated Google OAuth client.
 */
export async function listMajors(auth: OAuth2Client): Promise<void> {
    const sheets = google.sheets({ version: 'v4', auth });
    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
        range: 'Class Data!A2:E',
    });
    const rows = res.data.values;
    if (!rows || rows.length === 0) {
        console.log('No data found.');
        return;
    }
    console.log('Name, Major:');
    rows.forEach((row) => {
        console.log(`${row[0]}, ${row[4]}`);
    });
}

authorize().then(listMajors).catch(console.error);
