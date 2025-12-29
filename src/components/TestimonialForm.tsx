import { useState, useEffect } from 'react';
import { Testimonial } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useServices } from '@/hooks/useServices';
import StarRating from './StarRating';

interface TestimonialFormProps {
  testimonial?: Testimonial | null;
  open: boolean;
  onClose: () => void;
  onSave: (testimonial: Omit<Testimonial, 'id'>) => void;
}

const TestimonialForm = ({ testimonial, open, onClose, onSave }: TestimonialFormProps) => {
  const { services } = useServices();
  const [formData, setFormData] = useState({
    name: '',
    text: '',
    rating: 5,
    service: '',
    status: 'pending' as 'pending' | 'approved' | 'rejected',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (testimonial) {
      setFormData({
        name: testimonial.name,
        text: testimonial.text,
        rating: testimonial.rating,
        service: testimonial.service,
        status: testimonial.status,
      });
    } else {
      setFormData({
        name: '',
        text: '',
        rating: 5,
        service: '',
        status: 'pending',
      });
    }
    setErrors({});
  }, [testimonial, open]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Le nom est requis';
    if (!formData.text.trim()) newErrors.text = 'Le témoignage est requis';
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
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {testimonial ? 'Modifier le témoignage' : 'Ajouter un témoignage'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Informations générales</h3>
              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="name">Nom du client</Label>
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
                  <Label htmlFor="text">Témoignage</Label>
                  <Textarea
                    id="text"
                    value={formData.text}
                    onChange={(e) => handleChange('text', e.target.value)}
                    rows={4}
                    required
                    aria-describedby={errors.text ? "text-error" : undefined}
                    aria-invalid={!!errors.text}
                  />
                  {errors.text && <p id="text-error" className="text-red-500 text-sm mt-1">{errors.text}</p>}
                </div>
                <div>
                  <Label>Note</Label>
                  <StarRating
                    rating={formData.rating}
                    onRatingChange={(rating) => handleChange('rating', rating)}
                  />
                </div>
                <div>
                  <Label htmlFor="service">Service</Label>
                  <Select value={formData.service} onValueChange={(value) => handleChange('service', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.name}>
                          {service.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="status">Statut</Label>
              <Select value={formData.status} onValueChange={(value: 'pending' | 'approved' | 'rejected') => handleChange('status', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="approved">Approuvé</SelectItem>
                  <SelectItem value="rejected">Rejeté</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">
              {testimonial ? 'Modifier' : 'Ajouter'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TestimonialForm;