import { useState, useEffect } from 'react';
import { Category } from '@/lib/types';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // Initialize with default categories
    const defaultCategories: Category[] = [
      { id: '1', name: 'Coiffure africaine', description: 'Services de coiffure traditionnelle africaine' },
      { id: '2', name: 'Extensions', description: 'Services d\'extensions de cheveux' },
      { id: '3', name: 'Tresses', description: 'Services de tressage' },
      { id: '6', name: 'Pédicure', description: 'Services de soin médical des pieds et ongles' },
    ];
    setCategories(defaultCategories);
    localStorage.setItem('categories', JSON.stringify(defaultCategories));
  }, []);

  const saveCategories = (newCategories: Category[]) => {
    setCategories(newCategories);
    localStorage.setItem('categories', JSON.stringify(newCategories));
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

  return {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
  };
};