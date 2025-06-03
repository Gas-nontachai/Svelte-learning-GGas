export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface RequestOptions {
    method?: HTTPMethod;
    body?: any;
    headers?: Record<string, string>;
}