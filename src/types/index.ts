export interface Category {
    id: number;
    name: string;
    image: string;
  }
  

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
  }
  

  export interface User {
    id: number;
    email: string;
    password: string; // Если это нужно, но обычно лучше не хранить пароли в явном виде
    name: string;
    role: string;
    avatar: string;
  }
  