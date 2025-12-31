import { useState } from 'react';
import { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit, Trash2, Plus, Search, Power } from 'lucide-react';
import { useProducts } from '@/features/products/hooks/useProducts';
import { useProductCategories } from '@/features/products/hooks/useProductCategories';
import { useConfirmDeleteDialog } from '@/hooks/useConfirmDeleteDialog';

interface ProductsListProps {
  onEdit: (product: Product) => void;
  onAdd: () => void;
  onDelete?: (productId: string, productName: string) => void;
}

const ProductsList = ({ onEdit, onAdd, onDelete }: ProductsListProps) => {
  const { products, deleteProduct, toggleProductStatus } = useProducts();
  const { categories } = useProductCategories();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const { confirmDelete, ConfirmDeleteDialog } = useConfirmDeleteDialog({
    title: 'Confirmer la suppression',
    description: 'Êtes-vous sûr de vouloir supprimer le produit',
  });

  // Filtrer les produits selon la recherche, le statut et la catégorie
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (product.brand && product.brand.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Grouper les produits filtrés par catégorie
  const groupedProducts = filteredProducts.reduce((acc, product) => {
    const category = product.category || 'Autres';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  const renderProductCard = (product: Product) => (
    <Card key={product.id} className="transition-all duration-200 hover:shadow-lg hover:scale-[1.02] overflow-hidden">
      {product.image && (
        <div className="relative h-48 overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
            onError={(e) => {
              console.error(`Failed to load image: ${product.image}`);
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="absolute top-2 right-2">
            <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
              {product.status === 'active' ? 'Actif' : 'Désactivé'}
            </Badge>
          </div>
        </div>
      )}
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{product.name}</CardTitle>
          {!product.image && (
            <Badge variant={product.status === 'active' ? 'default' : 'secondary'} className="ml-2">
              {product.status === 'active' ? 'Actif' : 'Désactivé'}
            </Badge>
          )}
        </div>
        {product.brand && (
          <p className="text-sm text-primary font-medium">{product.brand}</p>
        )}
        <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between mb-4">
          <div className="text-lg font-bold text-primary">
            {product.price}€
          </div>
          {product.category && (
            <Badge variant="outline">{product.category}</Badge>
          )}
        </div>
        <div className="space-y-2">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(product)} className="flex-1" aria-label={`Modifier le produit ${product.name}`}>
              <Edit className="h-4 w-4 mr-2" />
              Modifier
            </Button>
            <Button variant="outline" size="sm" onClick={() => toggleProductStatus(product.id)} className="flex-1" aria-label={`${product.status === 'active' ? 'Désactiver' : 'Activer'} le produit ${product.name}`}>
              <Power className="h-4 w-4 mr-2" />
              {product.status === 'active' ? 'Désactiver' : 'Activer'}
            </Button>
          </div>
          <Button
            variant="destructive"
            size="sm"
            className="w-full"
            onClick={() => confirmDelete(product.name, () => {
              deleteProduct(product.id);
              onDelete?.(product.id, product.name);
            })}
            aria-label={`Supprimer le produit ${product.name}`}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Supprimer
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <Button onClick={onAdd} aria-label="Ajouter un nouveau produit">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un produit
        </Button>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto max-w-full overflow-x-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full sm:w-64"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Toutes les catégories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les catégories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category.id} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={(value: 'all' | 'active' | 'inactive') => setStatusFilter(value)}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="active">Actif</SelectItem>
              <SelectItem value="inactive">Désactivé</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {Object.keys(groupedProducts).length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              Aucun produit défini.
            </p>
          </CardContent>
        </Card>
      ) : (
        Object.entries(groupedProducts).map(([category, categoryProducts]) => (
          <div key={category} className="space-y-4">
            <h3 className="text-xl font-semibold">{category}</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {categoryProducts.map(renderProductCard)}
            </div>
          </div>
        ))
      )}
      <ConfirmDeleteDialog />
    </div>
  );
};

export default ProductsList;
