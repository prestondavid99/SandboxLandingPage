import { getEnvVars } from "@/lib/env";
import { ApiClient } from "@/api-services/ApiClient";
import axios, { AxiosResponse } from "axios";
import {headers} from "next/headers";

export class GoogleSheetsClient extends ApiClient {
    constructor(authToken: string) {
        super('https://sheets.googleapis.com/v4', {authToken});
    }

    async get<T>(
        endpoint: string,
        params: Record<string, any> = {},
        headers: Record<string, string> = {}
    ): Promise<T> {
        const response = await axios.get(`${this.baseUrl}/${endpoint}`, {
                params, headers: {
                    Authorization: `Bearer ${this.authConfig.authToken}`,
                    ...headers,
                }
            }
        );
        return response.data;
    }

    async post<T>(
        endpoint: string,
        data: Record<string, any> = {},
        headers: Record<string, string> = {}
    ): Promise<T> {
        const response = await axios.post(`${this.baseUrl}/${endpoint}`, data, {
                headers: {
                    Authorization: `Bearer ${this.authConfig.authToken}`,
                    ...headers,
                },
            }
        )
        return response.data;
    }
}