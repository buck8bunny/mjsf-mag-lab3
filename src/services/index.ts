// services/index.ts
import { CategoriesService } from "@/services/categories.service";
import { ProductService } from "@/services/product.service";
import { UserService } from "@/services/user.service";
import httpClient from "@/utils/http-client";

class ServiceProvider {
    // Сервісні інстанси
    serviceInstances: Record<string, any> = {};

    // Отримати сервіс категорій
    getCategoriesService(): CategoriesService {
        if (!this.serviceInstances.categoriesService) {
            this.serviceInstances.categoriesService = new CategoriesService(httpClient);
        }
        return this.serviceInstances.categoriesService;
    }

    // Отримати сервіс продуктів
    getProductService(): ProductService {
        if (!this.serviceInstances.productService) {
            this.serviceInstances.productService = new ProductService(httpClient);
        }
        return this.serviceInstances.productService;
    }

    // Отримати сервіс користувачів
    getUserService(): UserService {
        if (!this.serviceInstances.userService) {
            this.serviceInstances.userService = new UserService(httpClient);
        }
        return this.serviceInstances.userService;
    }

    // Налаштувати сервісний інстанс
    setServiceInstance(serviceName: string, serviceInstance: any): void {
        this.serviceInstances[serviceName] = serviceInstance;
    }

    // Перевірити, чи існує сервісний інстанс
    hasServiceInstance(serviceName: string): boolean {
        return !!this.serviceInstances[serviceName];
    }
}

const serviceProvider: ServiceProvider = new ServiceProvider();
export default serviceProvider;
