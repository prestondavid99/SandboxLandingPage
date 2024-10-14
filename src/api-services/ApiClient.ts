export abstract class ApiClient {
    protected baseUrl: string;
    protected authConfig: Record<string, any>;
    protected constructor(baseUrl: string, authConfig: Record<string, any>) {
        this.baseUrl = baseUrl;
        this.authConfig = authConfig;
    }

    abstract get<T>(
        endpoint: string,
        params?: Record<string, any>,
        headers?: Record<string, string>
    ): Promise<T>;

    abstract post<T>(
        endpoint: string,
        data?: Record<string, any>,
        headers?: Record<string, string>
    ): Promise<T>;
}