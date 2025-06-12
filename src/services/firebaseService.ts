import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../firebase/config';

export interface Product {
  id?: string;
  name: string;
  image: string;
  category: string;
  subcategory: string;
  price?: string;
  description?: string;
  createdAt?: Timestamp;
}

const COLLECTION_NAME = 'products';

// Obtener todos los productos de una categoría
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    // Removemos temporalmente el orderBy para evitar el error del índice
    // Una vez que crees el índice en Firebase, puedes descomentar la línea orderBy
    const q = query(
      collection(db, COLLECTION_NAME),
      where('category', '==', category)
      // orderBy('createdAt', 'desc') // Descomenta esta línea después de crear el índice
    );
    
    const querySnapshot = await getDocs(q);
    const products: Product[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      products.push({
        id: doc.id,
        ...data,
        // Asegurar que createdAt sea un Timestamp válido
        createdAt: data.createdAt || Timestamp.now()
      } as Product);
    });
    
    // Ordenamos manualmente por ahora
    products.sort((a, b) => {
      const aTime = a.createdAt?.toMillis() || 0;
      const bTime = b.createdAt?.toMillis() || 0;
      return bTime - aTime; // Orden descendente (más reciente primero)
    });
    
    return products;
  } catch (error) {
    console.error('Error getting products:', error);
    return [];
  }
};

// Agregar un nuevo producto
export const addProduct = async (product: Omit<Product, 'id'>): Promise<string | null> => {
  try {
    const productData = {
      ...product,
      createdAt: Timestamp.now() // Usar Timestamp de Firebase
    };
    
    const docRef = await addDoc(collection(db, COLLECTION_NAME), productData);
    console.log('Product added with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding product:', error);
    return null;
  }
};

// Actualizar un producto existente
export const updateProduct = async (id: string, product: Partial<Product>): Promise<boolean> => {
  try {
    const productRef = doc(db, COLLECTION_NAME, id);
    // Remover campos undefined para evitar errores
    const cleanProduct = Object.fromEntries(
      Object.entries(product).filter(([_, value]) => value !== undefined)
    );
    await updateDoc(productRef, cleanProduct);
    console.log('Product updated:', id);
    return true;
  } catch (error) {
    console.error('Error updating product:', error);
    return false;
  }
};

// Eliminar un producto
export const deleteProduct = async (id: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
    console.log('Product deleted:', id);
    return true;
  } catch (error) {
    console.error('Error deleting product:', error);
    return false;
  }
};

// Obtener todas las subcategorías de una categoría
export const getSubcategoriesByCategory = async (category: string): Promise<string[]> => {
  try {
    const products = await getProductsByCategory(category);
    const subcategories = [...new Set(products.map(p => p.subcategory))];
    return subcategories;
  } catch (error) {
    console.error('Error getting subcategories:', error);
    return [];
  }
};