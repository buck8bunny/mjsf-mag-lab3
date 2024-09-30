import type { AxiosInstance } from "axios";
import type { Product } from "@/types";
import type { Readable, Createable, Updateable, Deleteable } from "@/services/types";

export class ProductService implements Readable<Product>, Createable<Product>, Updateable<Product>, Deleteable<Product> {

    constructor(private httpClient: AxiosInstance) {}

    // Отримати всі продукти
    async get(params?: any): Promise<Product[]> {
        const response = await this.httpClient.get<Product[]>('/products', { params });
        return response.data;
    }

    // Отримати продукт за ідентифікатором
    async getById(id: number): Promise<Product> {
        const response = await this.httpClient.get<Product>(`/products/${id}`);
        return response.data;
    }

    // Створити новий продукт
    async create(data: Product): Promise<Product> {
        const response = await this.httpClient.post<Product>('/products', data);
        return response.data;
    }

    // Оновити продукт за ідентифікатором
    async update(id: number, data: Product): Promise<Product> {
        const response = await this.httpClient.put<Product>(`/products/${id}`, data);
        return response.data;
    }

    // Видалити продукт за ідентифікатором
    async delete(id: number): Promise<void> {
        await this.httpClient.delete(`/products/${id}`);
    }
}
