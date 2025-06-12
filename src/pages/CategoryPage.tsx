import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Plus, Edit, Trash2, Loader } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { 
  getProductsByCategory, 
  addProduct, 
  updateProduct, 
  deleteProduct,
  Product 
} from '../services/firebaseService';

const CategoryPage: React.FC = () => {
  const location = useLocation();
  const category = location.pathname.slice(1); // Remove the leading slash
  const { isAuthenticated } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load products from Firebase
  useEffect(() => {
    loadProducts();
  }, [category]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      console.log('Loading products for category:', category);
      const fetchedProducts = await getProductsByCategory(category);
      console.log('Fetched products:', fetchedProducts);
      setProducts(fetchedProducts);
      
      // Extract unique subcategories
      const uniqueSubcategories = [...new Set(fetchedProducts.map(p => p.subcategory))];
      setSubcategories(uniqueSubcategories);
      console.log('Subcategories:', uniqueSubcategories);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const categoryTitles: Record<string, string> = {
    puertas: 'Puertas',
    portones: 'Portones',
    gondolas: 'Góndolas',
    estanterias: 'Estanterías',
    rejas: 'Rejas',
    escaleras: 'Escaleras',
    muebles: 'Muebles',
    accesorios: 'Accesorios'
  };

  const handleAddProduct = async (productData: Omit<Product, 'id'>) => {
    setSaving(true);
    try {
      console.log('Adding product:', productData);
      const newProductId = await addProduct({
        ...productData,
        category: category
      });
      
      if (newProductId) {
        console.log('Product added successfully with ID:', newProductId);
        // Reload products to get the updated list
        await loadProducts();
        setShowAddForm(false);
        alert('Producto agregado exitosamente');
      } else {
        console.error('Failed to add product - no ID returned');
        alert('Error al agregar el producto');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error al agregar el producto: ' + error);
    } finally {
      setSaving(false);
    }
  };

  const handleEditProduct = async (productData: Product) => {
    if (!productData.id) return;
    
    setSaving(true);
    try {
      console.log('Updating product:', productData);
      const success = await updateProduct(productData.id, productData);
      
      if (success) {
        console.log('Product updated successfully');
        // Reload products to get the updated list
        await loadProducts();
        setEditingProduct(null);
        alert('Producto actualizado exitosamente');
      } else {
        console.error('Failed to update product');
        alert('Error al actualizar el producto');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Error al actualizar el producto: ' + error);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      return;
    }
    
    setSaving(true);
    try {
      console.log('Deleting product:', id);
      const success = await deleteProduct(id);
      
      if (success) {
        console.log('Product deleted successfully');
        // Reload products to get the updated list
        await loadProducts();
        alert('Producto eliminado exitosamente');
      } else {
        console.error('Failed to delete product');
        alert('Error al eliminar el producto');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error al eliminar el producto: ' + error);
    } finally {
      setSaving(false);
    }
  };

  const ProductForm: React.FC<{
    product?: Product;
    onSubmit: (product: Product | Omit<Product, 'id'>) => void;
    onCancel: () => void;
  }> = ({ product, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
      name: product?.name || '',
      image: product?.image || '',
      subcategory: product?.subcategory || '',
      price: product?.price || '',
      description: product?.description || ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      if (!formData.name.trim() || !formData.image.trim() || !formData.subcategory.trim()) {
        alert('Por favor completa todos los campos obligatorios');
        return;
      }

      console.log('Form data:', formData);

      if (product && product.id) {
        onSubmit({ ...product, ...formData });
      } else {
        onSubmit({
          ...formData,
          category: category
        });
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            {product ? 'Editar Producto' : 'Agregar Producto'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nombre *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nombre del producto"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                URL de Imagen *
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://ejemplo.com/imagen.jpg"
                required
              />
              {formData.image && (
                <div className="mt-2">
                  <img 
                    src={formData.image} 
                    alt="Preview" 
                    className="w-full h-32 object-cover rounded-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Subcategoría *
              </label>
              <input
                type="text"
                value={formData.subcategory}
                onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ej: Puertas de Hierro"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Precio
              </label>
              <input
                type="text"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ej: $850"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Descripción
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Descripción del producto"
                rows={3}
              />
            </div>
            
            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium flex items-center justify-center"
              >
                {saving ? (
                  <>
                    <Loader className="animate-spin h-4 w-4 mr-2" />
                    Guardando...
                  </>
                ) : (
                  product ? 'Actualizar' : 'Agregar'
                )}
              </button>
              <button
                type="button"
                onClick={onCancel}
                disabled={saving}
                className="flex-1 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin h-8 w-8 text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Cargando productos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            {categoryTitles[category] || 'Categoría'}
          </h1>
          {isAuthenticated && (
            <button
              onClick={() => setShowAddForm(true)}
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-200 font-medium"
            >
              <Plus className="h-5 w-5 mr-2" />
              Agregar Producto
            </button>
          )}
        </div>

        {/* Debug info - solo visible en desarrollo */}
        {process.env.NODE_ENV === 'development' && isAuthenticated && (
          <div className="mb-4 p-4 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              Debug: Categoría actual: {category} | Productos encontrados: {products.length} | Subcategorías: {subcategories.length}
            </p>
          </div>
        )}

        {subcategories.length > 0 ? (
          subcategories.map((subcategory) => (
            <div key={subcategory} className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                {subcategory}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products
                  .filter(product => product.subcategory === subcategory)
                  .map((product) => (
                    <div
                      key={product.id}
                      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                    >
                      <div className="aspect-w-16 aspect-h-12 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-48 object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://images.pexels.com/photos/2251247/pexels-photo-2251247.jpeg?auto=compress&cs=tinysrgb&w=800';
                          }}
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {product.name}
                        </h3>
                        {product.price && (
                          <p className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-3">
                            {product.price}
                          </p>
                        )}
                        {product.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            {product.description}
                          </p>
                        )}
                        <div className="flex justify-between items-center">
                          <a
                            href="https://wa.me/541125192502"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200 font-medium"
                          >
                            Consultar
                          </a>
                          {isAuthenticated && (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => setEditingProduct(product)}
                                disabled={saving}
                                className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 rounded transition-colors duration-200 disabled:opacity-50"
                                title="Editar producto"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => product.id && handleDeleteProduct(product.id)}
                                disabled={saving}
                                className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded transition-colors duration-200 disabled:opacity-50"
                                title="Eliminar producto"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <Plus className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No hay productos disponibles
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                {isAuthenticated 
                  ? 'Comienza agregando tu primer producto a esta categoría.'
                  : 'Esta categoría está siendo actualizada. Vuelve pronto para ver nuestros productos.'
                }
              </p>
              {isAuthenticated && (
                <button
                  onClick={() => setShowAddForm(true)}
                  disabled={saving}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg transition-colors duration-200 font-medium"
                >
                  Agregar Primer Producto
                </button>
              )}
            </div>
          </div>
        )}

        {showAddForm && (
          <ProductForm
            onSubmit={handleAddProduct}
            onCancel={() => setShowAddForm(false)}
          />
        )}

        {editingProduct && (
          <ProductForm
            product={editingProduct}
            onSubmit={handleEditProduct}
            onCancel={() => setEditingProduct(null)}
          />
        )}

        {saving && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 flex items-center space-x-3">
              <Loader className="animate-spin h-6 w-6 text-blue-600" />
              <span className="text-gray-900 dark:text-white font-medium">Guardando...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;