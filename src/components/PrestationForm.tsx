import { useState, useEffect } from 'react';
import { Service } from '@/lib/types';
import { useServices } from '@/hooks/useServices';
import { useCategories } from '@/hooks/useCategories';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import ImageUpload from '@/components/ui/image-upload';

interface PrestationFormProps {
  service?: Service | null;
  open: boolean;
  onClose: () => void;
  onSave: (service: Omit<Service, 'id'>) => void;
}

const PrestationForm = ({ service, open, onClose, onSave }: PrestationFormProps) => {
  const { services } = useServices();
  const { categories } = useCategories();
  const [formData, setFormData] = useState({
    category: '',
    name: '',
    included: '',
    excluded: '',
    price: 0,
    duration: 0,
    image: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (service) {
      setFormData({
        category: service.category,
        name: service.name,
        included: service.included,
        excluded: service.excluded,
        price: service.price,
        duration: service.duration,
        image: service.image || '',
      });
    } else {
      setFormData({
        category: '',
        name: '',
        included: '',
        excluded: '',
        price: 0,
        duration: 0,
        image: '',
      });
    }
    setErrors({});
  }, [service, open]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.category.trim()) {
      newErrors.category = 'La catégorie est requise';
    }
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    } else {
      const existingService = services.find(svc =>
        svc.name.toLowerCase() === formData.name.toLowerCase().trim() &&
        (!service || svc.id !== service.id)
      );
      if (existingService) {
        newErrors.name = 'Une prestation avec ce nom existe déjà';
      }
    }
    if (!formData.included.trim()) newErrors.included = 'Les détails sont requis';
    if (formData.price <= 0) newErrors.price = 'Le prix doit être positif';
    if (formData.duration <= 0) newErrors.duration = 'La durée doit être positive';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSave({
      name: formData.name.trim(),
      description: '',
      category: formData.category,
      duration: formData.duration,
      price: formData.price,
      included: formData.included.trim(),
      excluded: formData.excluded.trim(),
      status: 'active',
      image: formData.image,
      variants: [],
    });
    onClose();
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {service ? 'Modifier le service' : 'Ajouter une prestation'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="category">Catégorie</Label>
              <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.filter(c => c.parentId).map((cat) => {
                    const parent = categories.find(p => p.id === cat.parentId);
                    return (
                      <SelectItem key={cat.id} value={cat.id}>
                        {parent ? `${parent.name} - ${cat.name}` : cat.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
            </div>
            <div>
              <Label htmlFor="name">Nom de la prestation</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
                autoFocus
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            <div>
              <Label htmlFor="included">Détails / Inclus</Label>
              <Textarea
                id="included"
                value={formData.included}
                onChange={(e) => handleChange('included', e.target.value)}
                rows={3}
                required
              />
              {errors.included && <p className="text-red-500 text-sm mt-1">{errors.included}</p>}
            </div>
            <div>
              <Label htmlFor="excluded">Non inclus</Label>
              <Textarea
                id="excluded"
                value={formData.excluded}
                onChange={(e) => handleChange('excluded', e.target.value)}
                rows={2}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Prix (€)</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => handleChange('price', parseFloat(e.target.value) || 0)}
                  required
                />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
              </div>
              <div>
                <Label htmlFor="duration">Durée (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  min="0"
                  value={formData.duration}
                  onChange={(e) => handleChange('duration', parseInt(e.target.value) || 0)}
                  required
                />
                {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
              </div>
            </div>
            <ImageUpload
              id="image"
              label="Upload image"
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
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">
              {service ? 'Modifier' : 'Ajouter'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PrestationForm;