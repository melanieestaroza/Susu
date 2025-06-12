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

export interface FeaturedProduct {
  id?: string;
  name: string;
  image: string;
  price?: string;
  category: string;
  description?: string;
  order?: number;
  createdAt?: Timestamp;
}

const PRODUCTS_COLLECTION = 'products';
const FEATURED_COLLECTION = 'featured_products';

// ===== PRODUCTOS REGULARES =====

// Obtener todos los productos de una categoría
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const q = query(
      collection(db, PRODUCTS_COLLECTION),
      where('category', '==', category)
    );
    
    const querySnapshot = await getDocs(q);
    const products: Product[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      products.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt || Timestamp.now()
      } as Product);
    });
    
    // Ordenar manualmente por fecha de creación
    products.sort((a, b) => {
      const aTime = a.createdAt?.toMillis() || 0;
      const bTime = b.createdAt?.toMillis() || 0;
      return bTime - aTime;
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
      createdAt: Timestamp.now()
    };
    
    const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), productData);
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
    const productRef = doc(db, PRODUCTS_COLLECTION, id);
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
    await deleteDoc(doc(db, PRODUCTS_COLLECTION, id));
    console.log('Product deleted:', id);
    return true;
  } catch (error) {
    console.error('Error deleting product:', error);
    return false;
  }
};

// ===== PRODUCTOS DESTACADOS =====

// Obtener productos destacados
export const getFeaturedProducts = async (): Promise<FeaturedProduct[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, FEATURED_COLLECTION));
    const products: FeaturedProduct[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      products.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt || Timestamp.now(),
        order: data.order || 0
      } as FeaturedProduct);
    });
    
    // Ordenar por orden personalizado y luego por fecha
    products.sort((a, b) => {
      if (a.order !== b.order) {
        return (a.order || 0) - (b.order || 0);
      }
      const aTime = a.createdAt?.toMillis() || 0;
      const bTime = b.createdAt?.toMillis() || 0;
      return bTime - aTime;
    });
    
    return products;
  } catch (error) {
    console.error('Error getting featured products:', error);
    return [];
  }
};

// Agregar producto destacado
export const addFeaturedProduct = async (product: Omit<FeaturedProduct, 'id'>): Promise<string | null> => {
  try {
    const productData = {
      ...product,
      createdAt: Timestamp.now(),
      order: product.order || 0
    };
    
    const docRef = await addDoc(collection(db, FEATURED_COLLECTION), productData);
    console.log('Featured product added with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding featured product:', error);
    return null;
  }
};

// Actualizar producto destacado
export const updateFeaturedProduct = async (id: string, product: Partial<FeaturedProduct>): Promise<boolean> => {
  try {
    const productRef = doc(db, FEATURED_COLLECTION, id);
    const cleanProduct = Object.fromEntries(
      Object.entries(product).filter(([_, value]) => value !== undefined)
    );
    await updateDoc(productRef, cleanProduct);
    console.log('Featured product updated:', id);
    return true;
  } catch (error) {
    console.error('Error updating featured product:', error);
    return false;
  }
};

// Eliminar producto destacado
export const deleteFeaturedProduct = async (id: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, FEATURED_COLLECTION, id));
    console.log('Featured product deleted:', id);
    return true;
  } catch (error) {
    console.error('Error deleting featured product:', error);
    return false;
  }
};

// Obtener subcategorías por categoría
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