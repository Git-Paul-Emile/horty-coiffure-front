import { useState, useEffect } from 'react';
import { Realization } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useServices } from '@/hooks/useServices';

interface RealizationFormProps {
  realization?: Realization | null;
  open: boolean;
  onClose: () => void;
  onSave: (realization: Omit<Realization, 'id'>) => void;
}

const RealizationForm = ({ realization, open, onClose, onSave }: RealizationFormProps) => {
  const { services } = useServices();
  const [formData, setFormData] = useState({
    image: '',
    serviceId: '',
    caption: '',
    title: '',
  });

  useEffect(() => {
    if (realization) {
      setFormData({
        image: realization.image,
        serviceId: realization.serviceId,
        caption: realization.caption,
        title: realization.title || '',
      });
    } else {
      setFormData({
        image: '',
        serviceId: '',
        caption: '',
        title: '',
      });
    }
  }, [realization, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {realization ? 'Modifier la réalisation' : 'Ajouter une réalisation'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Titre (optionnel)</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Ex: Nattes bohèmes"
            />
          </div>

          <div>
            <Label htmlFor="serviceId">Service associé</Label>
            <Select value={formData.serviceId} onValueChange={(value) => handleChange('serviceId', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un service" />
              </SelectTrigger>
              <SelectContent>
                {services.map(service => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.name} ({service.category})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="image">Image (URL)</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => handleChange('image', e.target.value)}
              placeholder="Ex: /gallery-braids.jpg"
              required
            />
          </div>

          <div>
            <Label htmlFor="caption">Légende</Label>
            <Textarea
              id="caption"
              value={formData.caption}
              onChange={(e) => handleChange('caption', e.target.value)}
              rows={3}
              placeholder="Décrivez le travail réalisé..."
              required
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">
              {realization ? 'Modifier' : 'Ajouter'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RealizationForm;