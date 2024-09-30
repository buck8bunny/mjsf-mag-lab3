// services/categories.service.ts
import type { AxiosInstance } from "axios";
import type { Category } from "@/types";
import type { Readable, Createable, Updateable, Deleteable } from "@/services/types";
import { CategoryModel } from "@/models/category.model";

export class CategoriesService implements Readable<Category>, Createable<Category>, Updateable<Category>, Deleteable<Category> {

    constructor(public httpClient: AxiosInstance) {}

    // Отримання всіх категорій
    async get(params: any): Promise<Category[]> {
        const response = await this.httpClient.get<Category[]>('/categories', { params });
        return response.data.map((category) => new CategoryModel(category));
    }

    // Отримання категорії за ідентифікатором
    async getById(id: number): Promise<Category> {
        const response = await this.httpClient.get<Category>(`/categories/${id}`);
        return new CategoryModel(response.data);
    }

    // Створення нової категорії
    async create(data: Category): Promise<Category> {
        const response = await this.httpClient.post<Category>('/categories', data);
        return new CategoryModel(response.data);
    }

    // Оновлення категорії
    async update(id: number, data: Category): Promise<Category> {
        const response = await this.httpClient.put<Category>(`/categories/${id}`, data);
        return new CategoryModel(response.data);
    }

    // Видалення категорії з поверненням об'єкта
      async delete(id: number): Promise<void> {
        await this.httpClient.delete(`/categories/${id}`);
    }
}
