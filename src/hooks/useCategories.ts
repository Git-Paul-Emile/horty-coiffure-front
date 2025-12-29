import { useState, useEffect } from 'react';
import { Category } from '@/lib/types';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // Initialize with hierarchical categories
    const defaultCategories: Category[] = [
      // Main services
      { id: 'coiffure', name: 'Coiffure', description: 'Services de coiffure professionnels', status: 'active', image: '/gallery-braids.jpg' },
      { id: 'pedicure-manucure', name: 'Pédicure et Manucure', description: 'Services de soin des pieds et mains', status: 'active', image: '/pedicure.jpg' },
      { id: 'beaute', name: 'Beauté', description: 'Services de beauté', status: 'active', image: '/gallery-braids.jpg' },

      // Subcategories for Coiffure
      { id: 'africaine', name: 'Africaine', description: 'Coiffure traditionnelle africaine', parentId: 'coiffure', status: 'active', image: '/gallery-braids.jpg' },
      { id: 'europeenne', name: 'Européenne', description: 'Coiffure européenne moderne', parentId: 'coiffure', status: 'active', image: '/gallery-extensions.jpg' },
      { id: 'evenementiel', name: 'Événementiel', description: 'Coiffure pour événements spéciaux', parentId: 'coiffure', status: 'active', image: '/gallery-twists.jpg' },

      // Subcategories for Beauté
      { id: 'regard', name: 'Regard', description: 'Soins des yeux et cils', parentId: 'beaute', status: 'active', image: '/gallery-braids.jpg' },

      // Subcategories for Pédicure et Manucure
      { id: 'pedicure', name: 'Pédicure', description: 'Soins des pieds et ongles', parentId: 'pedicure-manucure', status: 'active', image: '/pedicure.jpg' },
      { id: 'manucure', name: 'Manucure', description: 'Soins des mains et ongles', parentId: 'pedicure-manucure', status: 'active', image: '/pedicure.jpg' },
    ];

    // Load from localStorage or use defaults
    const stored = localStorage.getItem('categories');
    if (stored) {
      try {
        const parsedCategories: Category[] = JSON.parse(stored).map((cat: Partial<Category>) => ({ ...cat, status: cat.status || 'active' }));

        if (parsedCategories.length === 0) {
          // If empty, use defaults
          setCategories(defaultCategories);
          localStorage.setItem('categories', JSON.stringify(defaultCategories));
        } else {
          // Merge with default images if missing
          const mergedCategories = parsedCategories.map(cat => {
            const defaultCat = defaultCategories.find(dc => dc.id === cat.id);
            return {
              ...cat,
              image: cat.image || defaultCat?.image || cat.image,
            };
          });
          setCategories(mergedCategories);
          localStorage.setItem('categories', JSON.stringify(mergedCategories));
        }
      } catch (error) {
        console.error('Error parsing categories from localStorage:', error);
        // If parsing fails, use defaults
        setCategories(defaultCategories);
        localStorage.setItem('categories', JSON.stringify(defaultCategories));
      }
    } else {
      setCategories(defaultCategories);
      localStorage.setItem('categories', JSON.stringify(defaultCategories));
    }
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

  const toggleCategory = (id: string) => {
    const updated = categories.map(category =>
      category.id === id ? { ...category, status: category.status === 'active' ? 'inactive' : 'active' } : category
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