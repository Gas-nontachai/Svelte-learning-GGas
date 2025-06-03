import type { RequestOptions } from '$lib/types/request-options';

export async function request<T>(
    url: string,
    options: RequestOptions = {}
): Promise<T> {
    const { method = 'GET', body, headers = {} } = options;

    try {
        const fetchOptions: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
        };

        if (body) {
            fetchOptions.body = JSON.stringify(body);
        }

        const response = await fetch(url, fetchOptions);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(
                `HTTP error! status: ${response.status}, message: ${errorText}`
            );
        }

        const data = (await response.json()) as T;
        return data;
    } catch (error) {
        throw error;
    }
}
