import { useState, useEffect } from 'react';
import { Product } from '@/lib/types';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Initialize with default products
    const defaultProducts: Product[] = [
      {
        id: '1',
        name: 'Shampooing Babor® Deep Cleansing',
        description: 'Shampooing purifiant en profondeur de la marque Babor® pour un nettoyage optimal du cuir chevelu',
        price: 25,
        brand: 'Babor®',
        category: 'Soins capillaires',
        status: 'active',
        image: '/placeholder.svg',
      },
      {
        id: '2',
        name: 'Masque Capillaire Naturel à l\'Aloe Vera',
        description: 'Masque nourrissant 100% naturel à base d\'aloe vera pour hydrater et revitaliser les cheveux',
        price: 18,
        brand: 'Naturel',
        category: 'Soins capillaires',
        status: 'active',
        image: '/placeholder.svg',
      },
      {
        id: '3',
        name: 'Huile Essentielle de Jojoba Pure',
        description: 'Huile essentielle pure de jojoba pour nourrir les cheveux et la peau naturellement',
        price: 15,
        brand: 'Naturel',
        category: 'Huiles essentielles',
        status: 'active',
        image: '/placeholder.svg',
      },
      {
        id: '4',
        name: 'Crème Hydratante Babor®',
        description: 'Crème hydratante premium de Babor® pour une peau douce et éclatante',
        price: 35,
        brand: 'Babor®',
        category: 'Soins de peau',
        status: 'active',
        image: '/placeholder.svg',
      },
      {
        id: '5',
        name: 'Savon Naturel au Miel et Lavande',
        description: 'Savon artisanal 100% naturel au miel et à la lavande pour une peau purifiée',
        price: 8,
        brand: 'Naturel',
        category: 'Savons',
        status: 'active',
        image: '/placeholder.svg',
      },
    ];

    // Load from localStorage or use defaults
    const stored = localStorage.getItem('products');
    if (stored) {
      setProducts(JSON.parse(stored));
    } else {
      setProducts(defaultProducts);
      localStorage.setItem('products', JSON.stringify(defaultProducts));
    }
  }, []);

  const saveProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem('products', JSON.stringify(newProducts));
  };

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
    };
    const updated = [...products, newProduct];
    saveProducts(updated);
  };

  const updateProduct = (id: string, productData: Omit<Product, 'id'>) => {
    const updated = products.map(product =>
      product.id === id ? { ...productData, id } : product
    );
    saveProducts(updated);
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter(product => product.id !== id);
    saveProducts(updated);
  };

  const toggleProductStatus = (id: string) => {
    const updated = products.map(product =>
      product.id === id ? { ...product, status: product.status === 'active' ? 'inactive' : 'active' as 'active' | 'inactive' } : product
    );
    saveProducts(updated);
  };

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleProductStatus,
  };
};