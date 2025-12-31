import { useState, useEffect } from 'react';
import { Category } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Edit, Trash2, Plus, Power } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useCategories } from '@/features/categories/hooks/useCategories';
import ImageUpload from '@/components/ui/image-upload';
import { useConfirmDeleteDialog } from '@/hooks/useConfirmDeleteDialog';

const CategoriesManagement = () => {
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { categories, addCategory, updateCategory, deleteCategory, toggleCategory } = useCategories();
  const { confirmDelete, ConfirmDeleteDialog } = useConfirmDeleteDialog({
    title: 'Confirmer la suppression',
    description: 'Êtes-vous sûr de vouloir supprimer la catégorie',
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [parentFilter, setParentFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const parentCategories = categories.filter(c => !c.parentId);
  const filteredCategories = categories.filter(category => {
    if (!category.parentId) return false; // only subcategories
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesParent = parentFilter === 'all' || category.parentId === parentFilter;
    const matchesStatus = statusFilter === 'all' || category.status === statusFilter;
    return matchesSearch && matchesParent && matchesStatus;
  });

  const handleAdd = () => {
    setEditingCategory(null);
    setIsFormOpen(true);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setIsFormOpen(true);
  };

  const handleSave = (categoryData: Omit<Category, 'id'>) => {
    if (editingCategory) {
      updateCategory(editingCategory.id, categoryData);
    } else {
      addCategory(categoryData);
    }
    setIsFormOpen(false);
    setEditingCategory(null);
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setEditingCategory(null);
  };

  const handleToggle = (categoryId: string) => {
    try {
      toggleCategory(categoryId);
    } catch (error) {
      console.error('Error toggling category:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
        <h2 className="text-2xl font-bold">Gestion des Catégories</h2>
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter une catégorie
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <Input
          placeholder="Rechercher par nom..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Select value={parentFilter} onValueChange={(value) => setParentFilter(value)}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Service parent" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les services parents</SelectItem>
            {parentCategories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={(value: 'all' | 'active' | 'inactive') => setStatusFilter(value)}>
          <SelectTrigger className="w-full sm:w-32">
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            <SelectItem value="active">Actif</SelectItem>
            <SelectItem value="inactive">Désactivé</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {categories.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              Aucune catégorie définie. Cliquez sur "Ajouter une catégorie" pour commencer.
            </p>
          </CardContent>
        </Card>
      ) : filteredCategories.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              Aucune catégorie ne correspond aux filtres.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredCategories.map((category) => (
            <Card key={category.id} className="transition-all duration-200 hover:shadow-lg hover:scale-[1.02] overflow-hidden">
              {category.image && (
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                    onError={(e) => {
                      console.error(`Failed to load image: ${category.image}`);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant={category.status === 'active' ? 'default' : 'secondary'}>
                      {category.status === 'active' ? 'Actif' : 'Désactivé'}
                    </Badge>
                  </div>
                </div>
              )}
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-semibold">{category.name}</CardTitle>
                  {!category.image && (
                    <Badge variant={category.status === 'active' ? 'default' : 'secondary'} className="ml-2">
                      {category.status === 'active' ? 'Actif' : 'Désactivé'}
                    </Badge>
                  )}
                </div>
                {category.description && (
                  <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
                )}
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(category)} className="flex-1">
                      <Edit className="h-4 w-4 mr-1" />
                      Modifier
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleToggle(category.id)} className="flex-1">
                      <Power className="h-4 w-4 mr-1" />
                      {category.status === 'active' ? 'Désactiver' : 'Activer'}
                    </Button>
                  </div>
                  <Button variant="destructive" size="sm" onClick={() => confirmDelete(category.name, () => deleteCategory(category.id))} className="w-full">
                    <Trash2 className="h-4 w-4 mr-1" />
                    Supprimer
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <CategoryForm
        category={editingCategory}
        open={isFormOpen}
        onClose={handleClose}
        onSave={handleSave}
      />
      <ConfirmDeleteDialog />
    </div>
  );
};

interface CategoryFormProps {
  category?: Category | null;
  open: boolean;
  onClose: () => void;
  onSave: (category: Omit<Category, 'id'>) => void;
}

const CategoryForm = ({ category, open, onClose, onSave }: CategoryFormProps) => {
  const { categories } = useCategories();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    parentId: '',
    status: 'active' as 'active' | 'inactive',
    image: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description || '',
        parentId: category.parentId || '',
        status: category.status || 'active',
        image: category.image || '',
      });
    } else {
      setFormData({
        name: '',
        description: '',
        parentId: '',
        status: 'active',
        image: '',
      });
    }
    setErrors({});
  }, [category, open]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    } else {
      const existingCategory = categories.find(cat =>
        cat.name.toLowerCase() === formData.name.toLowerCase().trim() &&
        (!category || cat.id !== category.id)
      );
      if (existingCategory) {
        newErrors.name = 'Une catégorie avec ce nom existe déjà';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSave({ ...formData, name: formData.name.trim(), parentId: formData.parentId || undefined });
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {category ? 'Modifier la catégorie' : 'Ajouter une catégorie'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Informations générales</h3>
              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="parentId">Service Parent</Label>
                  <Select value={formData.parentId} onValueChange={(value) => handleChange('parentId', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir où classer la catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.filter(c => !c.parentId).map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="name">Nom de la Catégorie</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    required
                    autoFocus
                    aria-describedby={errors.name ? "name-error" : undefined}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && <p id="name-error" className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                  <Label htmlFor="description">Description de la catégorie</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    rows={3}
                    placeholder="Texte explicatif de la catégorie"
                  />
                </div>
                <div>
                  <Label htmlFor="status">Statut</Label>
                  <Select value={formData.status} onValueChange={(value: 'active' | 'inactive') => handleChange('status', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner le statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Actif</SelectItem>
                      <SelectItem value="inactive">Désactivé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <ImageUpload
                  id="image"
                  label="Image"
                  value={formData.image}
                  onChange={(file, preview) => {
                    setFormData(prev => ({ ...prev, image: preview }));
                    setErrors(prev => ({ ...prev, image: '' }));
                  }}
                  onError={(error) => setErrors(prev => ({ ...prev, image: error }))}
                  error={errors.image}
                  maxSize={2}
                  acceptedTypes={['image/jpeg', 'image/png']}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">
              {category ? 'Modifier' : 'Ajouter'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoriesManagement;
