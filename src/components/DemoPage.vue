<template>
    <div class="container mx-auto p-6">
      <h1 class="text-3xl font-bold mb-4">Service Demonstration</h1>

      <div class="mb-4">
        <button @click="activeTab = 'categories'" class="mr-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Categories</button>
        <button @click="activeTab = 'products'" class="mr-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Products</button>
        <button @click="activeTab = 'users'" class="mr-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Users</button>
      </div>

      <div v-if="activeTab === 'categories'">
        <h2 class="text-2xl font-bold mb-2">Categories</h2>
        <form @submit.prevent="createCategory" class="mb-4">
          <input v-model="newCategoryName" placeholder="New Category" required class="border rounded p-2 mr-2" />
          <button type="submit" class="p-2 bg-green-500 text-white rounded hover:bg-green-600">Add Category</button>
        </form>
        <table class="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th class="border px-4 py-2">Name</th>
              <th class="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="category in categories" :key="category.id">
              <td class="border px-4 py-2">
                <input v-model="category.name" @blur="updateCategory(category)" class="border rounded p-1 w-full" />
              </td>
              <td class="border px-4 py-2">
                <button @click="deleteCategory(category.id)" class="p-2 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="activeTab === 'products'">
        <h2 class="text-2xl font-bold mb-2">Products</h2>
        <form @submit.prevent="createProduct" class="mb-4">
          <input v-model="newProduct.title" placeholder="Product Name" required class="border rounded p-2 mr-2" />
          <input type="number" v-model="newProduct.price" placeholder="Price" required class="border rounded p-2 mr-2" />
          <input v-model="newProduct.description" placeholder="Description" required class="border rounded p-2 mr-2" />
          <input type="number" v-model="newProduct.categoryId" placeholder="Category ID" required class="border rounded p-2 mr-2" />
          <input v-model="newProduct.images[0]" placeholder="Image URL" required class="border rounded p-2 mr-2" />
          <button type="submit" class="p-2 bg-green-500 text-white rounded hover:bg-green-600">Add Product</button>
        </form>
        <table class="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th class="border px-4 py-2">Name</th>
              <th class="border px-4 py-2">Price</th>
              <th class="border px-4 py-2">Description</th>
              <th class="border px-4 py-2">Image</th>
              <th class="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td class="border px-4 py-2">
                <input v-model="product.title" @blur="updateProduct(product)" class="border rounded p-1 w-full" />
              </td>
              <td class="border px-4 py-2">
                <input type="number" v-model="product.price" @blur="updateProduct(product)" class="border rounded p-1 w-full" />
              </td>
              <td class="border px-4 py-2">
                <input v-model="product.description" @blur="updateProduct(product)" class="border rounded p-1 w-full" />
              </td>
              <td class="border px-4 py-2">
                <input v-model="product.images[0]" @blur="updateProduct(product)" class="border rounded p-1 w-full" />
              </td>
              <td class="border px-4 py-2">
                <button @click="deleteProduct(product.id)" class="p-2 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="activeTab === 'users'">
        <h2 class="text-2xl font-bold mb-2">Users</h2>
        <form @submit.prevent="createUser" class="mb-4">
          <input v-model="newUser.name" placeholder="Username" required class="border rounded p-2 mr-2" />
          <input v-model="newUser.email" type="email" placeholder="Email" required class="border rounded p-2 mr-2" />
          <input v-model="newUser.password" type="password" placeholder="Password" required class="border rounded p-2 mr-2" />
          <select v-model="newUser.role" required class="border rounded p-2 mr-2">
            <option disabled value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="customer">Customer</option>
          </select>
          <button type="submit" class="p-2 bg-green-500 text-white rounded hover:bg-green-600">Add User</button>
        </form>
        <table class="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th class="border px-4 py-2">Name</th>
              <th class="border px-4 py-2">Email</th>
              <th class="border px-4 py-2">Role</th>
              <th class="border px-4 py-2">Password</th>
              <th class="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td class="border px-4 py-2">
                <input v-model="user.name" @blur="updateUser(user)" class="border rounded p-1 w-full" />
              </td>
              <td class="border px-4 py-2">{{ user.email }}</td>
              <td class="border px-4 py-2">{{ user.role }}</td>
              <td class="border px-4 py-2">{{ user.password }}</td>
              <td class="border px-4 py-2">
                <button @click="deleteUser(user.id)" class="p-2 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import serviceProvider from '@/services/index';
import type { Category } from '@/types';
import type { Product } from '@/types';
import type { User } from '@/types';

export default defineComponent({
    setup() {
        const activeTab = ref<'categories' | 'products' | 'users'>('categories');
        const categories = ref<Category[]>([]);
        const products = ref<Product[]>([]);
        const users = ref<User[]>([]);

        // New item references
        const newCategoryName = ref('');
        const newProduct = ref<Product>({
            id: 0,
            title: '',
            price: 0,
            description: '',
            categoryId: 0,
            images: [''],
        });
        
        // Updated newUser structure
        const newUser = ref<User>({
            id: 0,
            name: '',
            email: '',
            role: 'customer', // default role
        });

        // Fetch functions
        const fetchCategories = async () => {
            const categoriesService = serviceProvider.getCategoriesService();
            categories.value = await categoriesService.get({});
        };

        const fetchProducts = async () => {
            const productService = serviceProvider.getProductService();
            products.value = await productService.get({});
        };

        const fetchUsers = async () => {
            const userService = serviceProvider.getUserService();
            users.value = await userService.get({});
        };

        // Create functions
        const createCategory = async () => {
            const categoryData = {
                name: newCategoryName.value, // Убедитесь, что это поле не пустое
                image: "https://placeimg.com/640/480/any" // Или используйте URL изображения, которое хотите
            };

            const categoriesService = serviceProvider.getCategoriesService();
            try {
                const response = await categoriesService.create(categoryData);
                console.log('Категория создана:', response);
                newCategoryName.value = ''; // Сброс поля после успешного создания
                fetchCategories(); // Обновить список категорий
            } catch (error) {
                console.error('Ошибка при создании категории:', error.response.data); // Логируем ошибку
            }
        };

        const createProduct = async () => {
            const productService = serviceProvider.getProductService();

            // Проверяем, чтобы все необходимые поля были заполнены
            if (!newProduct.value.title || !newProduct.value.price || !newProduct.value.description || !newProduct.value.categoryId || !newProduct.value.images.length) {
                console.error("Все поля должны быть заполнены");
                return;
            }

            // Создаем новый продукт, используя данные из newProduct
            const productData = {
                title: newProduct.value.title,
                price: newProduct.value.price,
                description: newProduct.value.description,
                categoryId: newProduct.value.categoryId,
                images: newProduct.value.images,
            };

            try {
                // Отправляем запрос на создание нового продукта
                const response = await productService.create(productData);
                console.log('Продукт успешно создан:', response);

                // Сброс данных для нового продукта после успешного создания
                Object.assign(newProduct.value, { id: 0, title: '', price: 0, description: '', categoryId: 0, images: [''] });
                
                // Обновляем список продуктов
                fetchProducts();
            } catch (error) {
                // Обработка ошибки
                if (error.response) {
                    console.error('Ошибка при создании продукта:', error.response.data);
                } else if (error.request) {
                    console.error('Ошибка при отправке запроса:', error.request);
                } else {
                    console.error('Ошибка:', error.message);
                }
            }
        };

      
        const createUser = async () => {
            const userService = serviceProvider.getUserService();

            // Проверка на заполненность обязательных полей
            if (!newUser.value.name || !newUser.value.email || !newUser.value.password) {
                console.error("Имя, email и пароль являются обязательными полями");
                return;
            }

            try {
                // Создание нового пользователя с указанными полями
                const response = await userService.create({
                    name: newUser.value.name,
                    email: newUser.value.email,
                    password: newUser.value.password,
                    avatar: "https://picsum.photos/800", // Укажите изображение аватара по умолчанию
                });
                
                console.log('Пользователь создан:', response.data); // Логируем ответ
                // Сброс значений полей
                Object.assign(newUser.value, { id: 0, name: '', email: '', password: '', role: 'customer' });
                
                fetchUsers(); // Обновляем список пользователей
            } catch (error) {
                // Обработка ошибки
                if (error.response) {
                    console.error('Ошибка при создании пользователя:', error.response.data);
                } else if (error.request) {
                    console.error('Ошибка при отправке запроса:', error.request);
                } else {
                    console.error('Ошибка:', error.message);
                }
            }
        };


        // Update functions
        const updateCategory = async (category: Category) => {
            const categoriesService = serviceProvider.getCategoriesService();

            // поле `name` не пустое
            if (!category.name) {
                console.error("Имя категории не может быть пустым");
                return;
            }

            try {
                // Обновляем категорию по указанному id
                const response = await categoriesService.update(category.id, { name: category.name });
                console.log('Категория обновлена:', response);
                fetchCategories(); // Обновить список категорий
            } catch (error) {
                // Обработка ошибки
                if (error.response) {
                    console.error('Ошибка при обновлении категории:', error.response.data);
                } else if (error.request) {
                    console.error('Ошибка при отправке запроса:', error.request);
                } else {
                    console.error('Ошибка:', error.message);
                }
            }
        };


        const updateProduct = async (product: Product) => { 
            const productService = serviceProvider.getProductService();

            // Проверяем, чтобы поле id было задано
            if (!product.id) {
                console.error("ID продукта должен быть задан");
                return;
            }

            // Проверяем, чтобы поле title было заполнено
            if (!product.title) {
                console.error("Название продукта не может быть пустым");
                return;
            }

            // Создаем объект с обновленными данными
            const updatedData = {
                title: product.title,
                price: product.price, // Если цена также нужно обновить, убедитесь, что она задана
            };

            try {
                // Отправляем запрос на обновление продукта по указанному ID
                const response = await productService.update(product.id, updatedData);
                console.log('Продукт успешно обновлен:', response);
                
                // Обновляем список продуктов после успешного обновления
                fetchProducts();
            } catch (error) {
                // Обработка ошибки
                if (error.response) {
                    console.error('Ошибка при обновлении продукта:', error.response.data);
                } else if (error.request) {
                    console.error('Ошибка при отправке запроса:', error.request);
                } else {
                    console.error('Ошибка:', error.message);
                }
            }
        };


        // updateUser function
        const updateUser = async (user: User) => {
            const userService = serviceProvider.getUserService();

            // Поле `name` не пустое
            if (!user.name) {
                console.error("Имя пользователя не может быть пустым");
                return;
            }

            // Поле `email` не пустое
            if (!user.email) {
                console.error("Email пользователя не может быть пустым");
                return;
            }

            try {
                // Обновляем пользователя по указанному id
                const response = await userService.update(user.id, {
                    email: user.email,
                    name: user.name,
                });
                console.log('Пользователь обновлен:', response);
                fetchUsers(); // Обновить список пользователей
            } catch (error) {
                // Обработка ошибки
                if (error.response) {
                    console.error('Ошибка при обновлении пользователя:', error.response.data);
                } else if (error.request) {
                    console.error('Ошибка при отправке запроса:', error.request);
                } else {
                    console.error('Ошибка:', error.message);
                }
            }
        };


        // Delete functions
        const deleteCategory = async (id: number) => {
            const categoriesService = serviceProvider.getCategoriesService();
            await categoriesService.delete(id);
            fetchCategories();
        };

        const deleteProduct = async (id: number) => {
            const productService = serviceProvider.getProductService();
            await productService.delete(id);
            fetchProducts();
        };

        // Updated deleteUser function
        const deleteUser = async (id: number) => {
            const userService = serviceProvider.getUserService();
            await userService.delete(id);
            fetchUsers();
        };

        // Lifecycle hooks
        fetchCategories();
        fetchProducts();
        fetchUsers();

        return {
            activeTab,
            categories,
            products,
            users,
            newCategoryName,
            newProduct,
            newUser,
            createCategory,
            createProduct,
            createUser,
            updateCategory,
            updateProduct,
            updateUser,
            deleteCategory,
            deleteProduct,
            deleteUser,
        };
    },
});
</script>

<style scoped>
.container {
    max-width: 1200px;
}

.table {
    width: 100%;
    border-collapse: collapse;
}

.table th,
.table td {
    padding: 10px;
    border: 1px solid #ddd;
}
</style>
