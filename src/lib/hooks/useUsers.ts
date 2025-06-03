import { API_URL } from '$lib/config';
import type { User } from '$lib/types/user';
import { request } from '$lib/api/request';

const prefix = 'user';

const getUserBy = () => {
    return request<User[]>(`${API_URL}${prefix}`, {
        method: 'GET',
    });
};

const getUseByID = (user_id: string) => {
    return request<User>(`${API_URL}${prefix}/${user_id}`, {
        method: 'GET',
    });
};

const insertUser = (data: User) => {
    return request<User>(`${API_URL}${prefix}`, {
        method: 'POST',
        body: data,
    });
};

const updateUserBy = (data: User) => {
    return request<User>(`${API_URL}${prefix}/${data.user_id}`, {
        method: 'PUT',
        body: data,
    });
};
const deleteUserBy = (user_id: number) => {
    return request<User>(`${API_URL}${prefix}/${user_id}`, {
        method: 'DELETE',
    });
};

export default function useUser() {
    return {
        getUserBy,
        getUseByID,
        insertUser,
        updateUserBy,
        deleteUserBy,
    };
}
