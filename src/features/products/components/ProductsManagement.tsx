import { useState, useEffect } from 'react';
import { Product } from '@/lib/types';
import ProductsList from './ProductsList';
import ProductForm from './ProductForm';
import { useProducts } from '@/features/products/hooks/useProducts';
import { useToast } from '@/hooks/use-toast';

interface ProductsManagementProps {
  initialAction?: 'add' | null;
}

const ProductsManagement = ({ initialAction }: ProductsManagementProps) => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { addProduct, updateProduct } = useProducts();
  const { toast } = useToast();

  useEffect(() => {
    if (initialAction === 'add') {
      handleAdd();
    }
  }, [initialAction]);

  const handleAdd = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleSave = (productData: Omit<Product, 'id'>) => {
    try {
      if (editingProduct) {
        updateProduct(editingProduct.id, productData);
        toast({
          title: "Produit modifié",
          description: "Le produit a été modifié avec succès.",
        });
      } else {
        addProduct(productData);
        toast({
          title: "Produit ajouté",
          description: "Le nouveau produit a été ajouté avec succès.",
        });
      }
      setIsFormOpen(false);
      setEditingProduct(null);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la sauvegarde.",
        variant: "destructive",
      });
    }
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleDelete = (productId: string, productName: string) => {
    try {
      // deleteProduct est appelé dans ProductsList, mais on peut ajouter le toast ici
      toast({
        title: "Produit supprimé",
        description: `Le produit "${productName}" a été supprimé avec succès.`,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la suppression.",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <ProductsList onEdit={handleEdit} onAdd={handleAdd} onDelete={handleDelete} />
      <ProductForm
        product={editingProduct}
        open={isFormOpen}
        onClose={handleClose}
        onSave={handleSave}
      />
    </div>
  );
};

export default ProductsManagement;
