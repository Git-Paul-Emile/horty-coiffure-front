import { useState, useEffect } from 'react';
import { Service } from '@/lib/types';
import { useCategories } from '@/hooks/useCategories';
import { useServices } from '@/hooks/useServices';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Upload, X } from 'lucide-react';

interface ServiceFormProps {
  service?: Service | null;
  open: boolean;
  onClose: () => void;
  onSave: (service: Omit<Service, 'id'>) => void;
}

const ServiceForm = ({ service, open, onClose, onSave }: ServiceFormProps) => {
  const { categories } = useCategories();
  const { services } = useServices();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    duration: 0,
    price: 0,
    included: '',
    excluded: '',
    status: 'active' as 'active' | 'inactive',
    image: '',
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [imagePreview, setImagePreview] = useState<string>('');

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name,
        description: service.description,
        category: service.category,
        duration: service.duration,
        price: service.price,
        included: service.included,
        excluded: service.excluded,
        status: service.status,
        image: service.image || '',
      });
      setImagePreview(service.image || '');
    } else {
      setFormData({
        name: '',
        description: '',
        category: '',
        duration: 0,
        price: 0,
        included: '',
        excluded: '',
        status: 'active',
        image: '',
      });
      setImagePreview('');
    }
    setSelectedFile(null);
    setErrors({});
  }, [service, open]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
      setErrors(prev => ({ ...prev, image: '' }));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
      setErrors(prev => ({ ...prev, image: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    } else {
      const existingService = services.find(svc =>
        svc.name.toLowerCase() === formData.name.toLowerCase().trim() &&
        (!service || svc.id !== service.id)
      );
      if (existingService) {
        newErrors.name = 'Un service avec ce nom existe déjà';
      }
    }
    if (!formData.description.trim()) newErrors.description = 'La description est requise';
    if (!formData.category.trim()) newErrors.category = 'La catégorie est requise';
    if (formData.duration <= 0) newErrors.duration = 'La durée doit être positive';
    if (formData.price <= 0) newErrors.price = 'Le prix doit être positif';
    if (!formData.included.trim()) newErrors.included = 'Ce qui est inclus est requis';
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) newErrors.image = 'Le fichier ne doit pas dépasser 5MB';
      if (!['image/jpeg', 'image/png', 'image/gif'].includes(selectedFile.type)) newErrors.image = 'Format non supporté. Utilisez PNG, JPG ou GIF';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const imageToSave = selectedFile ? imagePreview : (service?.image || '');
    onSave({ ...formData, name: formData.name.trim(), image: imageToSave });
    onClose();
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {service ? 'Modifier le service' : 'Ajouter un service'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Informations générales</h3>
              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="name">Nom du service</Label>
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
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    rows={3}
                    required
                    aria-describedby={errors.description ? "description-error" : undefined}
                    aria-invalid={!!errors.description}
                  />
                  {errors.description && <p id="description-error" className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>
                <div>
                  <Label htmlFor="category">Catégorie</Label>
                  <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
                    <SelectTrigger aria-describedby={errors.category ? "category-error" : undefined} aria-invalid={!!errors.category}>
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.name}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && <p id="category-error" className="text-red-500 text-sm mt-1">{errors.category}</p>}
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Détails du service</h3>
              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="duration">Durée estimée (minutes)</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={formData.duration}
                      onChange={(e) => handleChange('duration', parseInt(e.target.value) || 0)}
                      required
                      aria-describedby={errors.duration ? "duration-error" : undefined}
                      aria-invalid={!!errors.duration}
                    />
                    {errors.duration && <p id="duration-error" className="text-red-500 text-sm mt-1">{errors.duration}</p>}
                  </div>
                  <div>
                    <Label htmlFor="price">Prix à partir de (€)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => handleChange('price', parseFloat(e.target.value) || 0)}
                      required
                      aria-describedby={errors.price ? "price-error" : undefined}
                      aria-invalid={!!errors.price}
                    />
                    {errors.price && <p id="price-error" className="text-red-500 text-sm mt-1">{errors.price}</p>}
                  </div>
                </div>
                <div>
                  <Label htmlFor="included">Ce qui est inclus</Label>
                  <Textarea
                    id="included"
                    value={formData.included}
                    onChange={(e) => handleChange('included', e.target.value)}
                    rows={2}
                    required
                    aria-describedby={errors.included ? "included-error" : undefined}
                    aria-invalid={!!errors.included}
                  />
                  {errors.included && <p id="included-error" className="text-red-500 text-sm mt-1">{errors.included}</p>}
                </div>
                <div>
                  <Label htmlFor="excluded">Ce qui n'est pas inclus</Label>
                  <Textarea
                    id="excluded"
                    value={formData.excluded}
                    onChange={(e) => handleChange('excluded', e.target.value)}
                    rows={2}
                  />
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Médias</h3>
              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="image">Image du service</Label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 transition-colors"
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    <div className="space-y-1 text-center">
                      {imagePreview ? (
                        <div className="relative">
                          <img src={imagePreview} alt="Aperçu" className="mx-auto h-32 w-32 object-cover rounded-md" />
                          <button
                            type="button"
                            onClick={() => { setSelectedFile(null); setImagePreview(''); setErrors(prev => ({ ...prev, image: '' })); }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            aria-label="Supprimer l'image"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                              <span>Télécharger un fichier</span>
                              <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
                            </label>
                            <p className="pl-1">ou glisser-déposer</p>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF jusqu'à 5MB</p>
                        </>
                      )}
                    </div>
                  </div>
                  {errors.image && <p id="image-error" className="text-red-500 text-sm mt-1">{errors.image}</p>}
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="status">Statut</Label>
              <Select value={formData.status} onValueChange={(value: 'active' | 'inactive') => handleChange('status', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Actif</SelectItem>
                  <SelectItem value="inactive">Désactivé</SelectItem>
                </SelectContent>
              </Select>
            </div>
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

export default ServiceForm;