
export interface Product {
    id: number;
    nombre: string;
    precio: number;
    stock: number;
    categoryName?: string; // Esto es opcional si deseas mostrar el nombre de la categoría
  }
  
  export interface Category {
    id: number;
    nombre: string;
  }
  