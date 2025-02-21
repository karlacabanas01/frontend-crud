export interface Product {
  id: number;
  name: string;
  description: string;
  price: number; // Si manejas decimales, revisa el backend para evitar problemas de precisión
  created_at?: string; // O `Date` si lo conviertes en el frontend
  user_id: number;
}

export interface ProductFormInputs {
  name: string;
  description: string;
  price: number;
}
