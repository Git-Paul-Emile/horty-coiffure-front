import { useState, useEffect } from 'react';
import { Category } from '@/lib/types';

export const useProductCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const currentVersion = 'v3'; // Increment when defaults change

  useEffect(() => {
    // Initialize with default product categories
    const defaultCategories: Category[] = [
      { id: 'soins-capillaires', name: 'Soins capillaires', description: 'Produits pour les soins des cheveux', status: 'active', image: '/gallery-braids.jpg' },
      { id: 'huiles-essentielles', name: 'Huiles essentielles', description: 'Huiles essentielles naturelles', status: 'active', image: '/gallery-twists.jpg' },
      { id: 'soins-peau', name: 'Soins de peau', description: 'Produits pour les soins de la peau', status: 'active', image: '/pedicure.jpg' },
      { id: 'savons', name: 'Savons', description: 'Savons naturels et artisanaux', status: 'active', image: '/hero-image.jpg' },
    ];

    // Load from localStorage or use defaults
    const stored = localStorage.getItem('productCategories');
    const storedVersion = localStorage.getItem('productCategoriesVersion');

    if (stored && storedVersion === currentVersion) {
      try {
        const parsedCategories: Category[] = JSON.parse(stored).map((cat: Partial<Category>) => ({ ...cat, status: (cat.status === 'active' || cat.status === 'inactive') ? cat.status : 'active' } as Category));

        if (parsedCategories.length === 0) {
          // If empty, use defaults
          setCategories(defaultCategories);
          localStorage.setItem('productCategories', JSON.stringify(defaultCategories));
          localStorage.setItem('productCategoriesVersion', currentVersion);
        } else {
          setCategories(parsedCategories);
        }
      } catch (error) {
        console.error('Error parsing product categories from localStorage:', error);
        // If parsing fails, use defaults
        setCategories(defaultCategories);
        localStorage.setItem('productCategories', JSON.stringify(defaultCategories));
        localStorage.setItem('productCategoriesVersion', currentVersion);
      }
    } else {
      // Version mismatch or no stored data, use defaults
      setCategories(defaultCategories);
      localStorage.setItem('productCategories', JSON.stringify(defaultCategories));
      localStorage.setItem('productCategoriesVersion', currentVersion);
    }
  }, []);

  const saveCategories = (newCategories: Category[]) => {
    setCategories(newCategories);
    localStorage.setItem('productCategories', JSON.stringify(newCategories));
    localStorage.setItem('productCategoriesVersion', currentVersion);
  };

  const addCategory = (categoryData: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...categoryData,
      id: Date.now().toString(),
    };
    const updated = [...categories, newCategory];
    saveCategories(updated);
  };

  const updateCategory = (id: string, categoryData: Omit<Category, 'id'>) => {
    const updated = categories.map(category =>
      category.id === id ? { ...categoryData, id } : category
    );
    saveCategories(updated);
  };

  const deleteCategory = (id: string) => {
    const updated = categories.filter(category => category.id !== id);
    saveCategories(updated);
  };

  const toggleCategory = (id: string) => {
    const updated = categories.map(category =>
      category.id === id ? { ...category, status: category.status === 'active' ? 'inactive' as const : 'active' as const } : category
    );
    saveCategories(updated);
  };

  return {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    toggleCategory,
  };
};
