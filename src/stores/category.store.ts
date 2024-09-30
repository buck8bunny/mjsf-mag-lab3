// stores/category.store.ts
import { defineStore } from 'pinia';
import serviceProvider from '@/services/index';
import { CategoryModel } from '@/models/category.model';

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [] as CategoryModel[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchCategories() {
      this.loading = true;
      const categoryService = serviceProvider.getCategoriesService();
      try {
        this.categories = await categoryService.get({});
      } catch (error) {
        this.error = 'Помилка завантаження категорій';
      } finally {
        this.loading = false;
      }
    },

    async createCategory(newCategory: CategoryModel) {
      const categoryService = serviceProvider.getCategoriesService();
      try {
        const createdCategory = await categoryService.create(newCategory);
        this.categories.push(createdCategory);
      } catch (error) {
        this.error = 'Помилка при створенні категорії';
      }
    },

    async updateCategory(id: number, updatedData: CategoryModel) {
      const categoryService = serviceProvider.getCategoriesService();
      try {
        const updatedCategory = await categoryService.update(id, updatedData);
        const index = this.categories.findIndex(cat => cat.id === id);
        if (index !== -1) {
          this.categories[index] = updatedCategory;
        }
      } catch (error) {
        this.error = 'Помилка при оновленні категорії';
      }
    },

    async deleteCategory(id: number) {
      const categoryService = serviceProvider.getCategoriesService();
      try {
        await categoryService.delete(id);
        this.categories = this.categories.filter(cat => cat.id !== id);
      } catch (error) {
        this.error = 'Помилка при видаленні категорії';
      }
    },
  },
});
