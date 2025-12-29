import { useState, useEffect } from 'react';
import { Category } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import ImageUpload from '@/components/ui/image-upload';

interface ServiceFormProps {
  service?: Category | null;
  open: boolean;
  onClose: () => void;
  onSave: (data: { name: string; description: string; image: string }) => void;
}

const ServiceForm = ({ service, open, onClose, onSave }: ServiceFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name,
        description: service.description || '',
        image: service.image || '',
      });
    } else {
      setFormData({
        name: '',
        description: '',
        image: '',
      });
    }
    setErrors({});
  }, [service, open]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom du service est requis';
    }
    if (!formData.description.trim()) newErrors.description = 'La description courte est requise';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSave(formData);
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
            {service ? 'Modifier le service' : 'Ajouter un service'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nom du Service</Label>
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
              <Label htmlFor="description">Description courte : À quoi sert ce pôle</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={3}
                required
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>
            <ImageUpload
              id="image"
              label="Upload image : Pour illustrer le service sur la page d'accueil"
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

export default ServiceForm;