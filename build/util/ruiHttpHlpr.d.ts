declare class HttpHlpr {
    post(requestURL: string, data: Record<string, unknown>): Promise<Record<string, unknown>>;
    get(requestURL: string, data: Record<string, unknown>): Promise<Record<string, unknown>>;
}
export declare const httpHlpr: HttpHlpr;
export {};
