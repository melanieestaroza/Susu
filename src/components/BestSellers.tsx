import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Loader, ArrowUp, ArrowDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { 
  getFeaturedProducts, 
  addFeaturedProduct, 
  updateFeaturedProduct, 
  deleteFeaturedProduct,
  FeaturedProduct 
} from '../services/firebaseService';

const BestSellers: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [products, setProducts] = useState<FeaturedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<FeaturedProduct | null>(null);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    setLoading(true);
    try {
      const fetchedProducts = await getFeaturedProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      console.error('Error loading featured products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (productData: Omit<FeaturedProduct, 'id'>) => {
    setSaving(true);
    try {
      const newProductId = await addFeaturedProduct(productData);
      if (newProductId) {
        await loadFeaturedProducts();
        setShowAddForm(false);
        alert('Producto destacado agregado exitosamente');
      } else {
        alert('Error al agregar el producto destacado');
      }
    } catch (error) {
      console.error('Error adding featured product:', error);
      alert('Error al agregar el producto destacado: ' + error);
    } finally {
      setSaving(false);
    }
  };

  const handleEditProduct = async (productData: FeaturedProduct) => {
    if (!productData.id) return;
    
    setSaving(true);
    try {
      const success = await updateFeaturedProduct(productData.id, productData);
      if (success) {
        await loadFeaturedProducts();
        setEditingProduct(null);
        alert('Producto destacado actualizado exitosamente');
      } else {
        alert('Error al actualizar el producto destacado');
      }
    } catch (error) {
      console.error('Error updating featured product:', error);
      alert('Error al actualizar el producto destacado: ' + error);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este producto destacado?')) {
      return;
    }
    
    setSaving(true);
    try {
      const success = await deleteFeaturedProduct(id);
      if (success) {
        await loadFeaturedProducts();
        alert('Producto destacado eliminado exitosamente');
      } else {
        alert('Error al eliminar el producto destacado');
      }
    } catch (error) {
      console.error('Error deleting featured product:', error);
      alert('Error al eliminar el producto destacado: ' + error);
    } finally {
      setSaving(false);
    }
  };

  const handleMoveProduct = async (id: string, direction: 'up' | 'down') => {
    const currentIndex = products.findIndex(p => p.id === id);
    if (currentIndex === -1) return;
    
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= products.length) return;

    setSaving(true);
    try {
      const currentProduct = products[currentIndex];
      const targetProduct = products[targetIndex];
      
      // Intercambiar órdenes
      const currentOrder = currentProduct.order || currentIndex;
      const targetOrder = targetProduct.order || targetIndex;
      
      await updateFeaturedProduct(currentProduct.id!, { order: targetOrder });
      await updateFeaturedProduct(targetProduct.id!, { order: currentOrder });
      
      await loadFeaturedProducts();
    } catch (error) {
      console.error('Error moving product:', error);
    } finally {
      setSaving(false);
    }
  };

  const FeaturedProductForm: React.FC<{
    product?: FeaturedProduct;
    onSubmit: (product: FeaturedProduct | Omit<FeaturedProduct, 'id'>) => void;
    onCancel: () => void;
  }> = ({ product, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
      name: product?.name || '',
      image: product?.image || '',
      category: product?.category || '',
      price: product?.price || '',
      description: product?.description || '',
      order: product?.order || 0
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      if (!formData.name.trim() || !formData.image.trim() || !formData.category.trim()) {
        alert('Por favor completa todos los campos obligatorios');
        return;
      }

      if (product && product.id) {
        onSubmit({ ...product, ...formData });
      } else {
        onSubmit(formData);
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            {product ? 'Editar Producto Destacado' : 'Agregar Producto Destacado'}
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
                Categoría *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Seleccionar categoría</option>
                <option value="Puertas">Puertas</option>
                <option value="Portones">Portones</option>
                <option value="Escaleras">Escaleras</option>
                <option value="Rejas">Rejas</option>
                <option value="Muebles">Muebles</option>
                <option value="Góndolas">Góndolas</option>
                <option value="Estanterías">Estanterías</option>
                <option value="Accesorios">Accesorios</option>
              </select>
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
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Orden de Visualización
              </label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
                min="0"
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
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Loader className="animate-spin h-8 w-8 text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Cargando productos destacados...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div className="text-center flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Productos Destacados
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Descubre nuestros productos más populares, elegidos por miles de clientes satisfechos.
            </p>
          </div>
          {isAuthenticated && (
            <button
              onClick={() => setShowAddForm(true)}
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-200 font-medium ml-4"
            >
              <Plus className="h-5 w-5 mr-2" />
              Agregar
            </button>
          )}
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="aspect-w-16 aspect-h-12 overflow-hidden relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.pexels.com/photos/2251247/pexels-photo-2251247.jpeg?auto=compress&cs=tinysrgb&w=800';
                    }}
                  />
                  {isAuthenticated && (
                    <div className="absolute top-2 right-2 flex flex-col space-y-1">
                      <button
                        onClick={() => product.id && handleMoveProduct(product.id, 'up')}
                        disabled={saving || index === 0}
                        className="p-1 bg-white/80 hover:bg-white text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Mover arriba"
                      >
                        <ArrowUp className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => product.id && handleMoveProduct(product.id, 'down')}
                        disabled={saving || index === products.length - 1}
                        className="p-1 bg-white/80 hover:bg-white text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Mover abajo"
                      >
                        <ArrowDown className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                      {product.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {product.name}
                  </h3>
                  {product.price && (
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-3">
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
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <Plus className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No hay productos destacados
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                {isAuthenticated 
                  ? 'Comienza agregando productos destacados para mostrar en la página principal.'
                  : 'Estamos actualizando nuestros productos destacados. Vuelve pronto.'
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

        <div className="text-center mt-12">
          <a
            href="https://wa.me/541125192502"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Consultar Precios
          </a>
        </div>

        {showAddForm && (
          <FeaturedProductForm
            onSubmit={handleAddProduct}
            onCancel={() => setShowAddForm(false)}
          />
        )}

        {editingProduct && (
          <FeaturedProductForm
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
    </section>
  );
};

export default BestSellers;