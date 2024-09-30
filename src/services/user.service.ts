import type { AxiosInstance } from "axios";
import type { User } from "@/types";
import type { Readable, Createable, Updateable, Deleteable } from "@/services/types";

export class UserService implements Readable<User>, Createable<User>, Updateable<User>, Deleteable<User> {

    constructor(private httpClient: AxiosInstance) {}

    // Отримати всіх користувачів
    async get(params?: any): Promise<User[]> {
        const response = await this.httpClient.get<User[]>('/users', { params });
        return response.data;
    }

    // Отримати користувача за ідентифікатором
    async getById(id: number): Promise<User> {
        const response = await this.httpClient.get<User>(`/users/${id}`);
        return response.data;
    }

    // Створити нового користувача
    async create(data: User): Promise<User> {
        const response = await this.httpClient.post<User>('/users', data);
        return response.data;
    }

    // Оновити користувача за ідентифікатором
    async update(id: number, data: User): Promise<User> {
        const response = await this.httpClient.put<User>(`/users/${id}`, data);
        return response.data;
    }

    // Видалити користувача за ідентифікатором
    async delete(id: number): Promise<void> {
        await this.httpClient.delete(`/users/${id}`);
    }
}
