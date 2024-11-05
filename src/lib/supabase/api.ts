import { createServerClient, serializeCookieHeader } from "@supabase/ssr";
import { NextApiRequest, NextApiResponse } from "next";
import { getEnvVars } from "../env";

const { supabaseUrl, supabaseAnonKey } = getEnvVars();

export function createClient(req: NextApiRequest, res: NextApiResponse) {
    return createServerClient(
        supabaseUrl!,
        supabaseAnonKey!,
        {
            cookies: {
                getAll() {
                    return Object.keys(req.cookies).map((name) => ({ name, value: req.cookies[name] || '' }))
                },
                setAll(cookiesToSet) {
                    res.setHeader(
                        'Set-Cookie',
                        cookiesToSet.map(({ name, value, options }) =>
                            serializeCookieHeader(name, value, options)
                        )
                    )
                },
            },
        }
    );
}