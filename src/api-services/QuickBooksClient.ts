import { getEnvVars } from "@/lib/env";
import axios, { AxiosResponse } from "axios";
import {ApiClient} from "@/api-services/ApiClient";

export class QuickBooksClient extends ApiClient {
    private realmId: string;

    constructor(authToken: string, realmId: string) {
        super(`https://quickbooks.ap.intuit.com/v3`, {authToken});
        this.realmId = realmId;
    }

    async get<T>(endpoint: string, params: Record<string, any> = {}, headers: Record<string, string> = {}): Promise<T> {
        const response: AxiosResponse<T> = await axios.get(`${this.baseUrl}/company/${this.realmId}/${endpoint}`,
            {
                params,
                headers: {
                    Authorization: `Bearer ${this.authConfig.authToken}`,
                    Accept: 'application/json',
                    ...headers,
                }
            }
        )
        return response.data;
    }

    async post<T>(endpoint: string, data: Record<string, any> = {}, headers: Record<string, string> = {}): Promise<T> {
        const response: AxiosResponse = await axios.post(`${this.baseUrl}/company/${this.realmId}/${endpoint}`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${this.authConfig.authToken}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    ...headers,
                }
            }
        )
        return response.data;
    }

}