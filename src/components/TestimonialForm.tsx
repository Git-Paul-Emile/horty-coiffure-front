import { useState, useEffect } from 'react';
import { Testimonial } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

interface TestimonialFormProps {
  testimonial?: Testimonial | null;
  open: boolean;
  onClose: () => void;
  onSave: (testimonial: Omit<Testimonial, 'id'>) => void;
}

const TestimonialForm = ({ testimonial, open, onClose, onSave }: TestimonialFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    text: '',
    rating: 5,
    service: '',
    status: 'pending' as 'pending' | 'approved' | 'rejected',
  });

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
  }, [testimonial, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {testimonial ? 'Modifier le témoignage' : 'Ajouter un témoignage'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nom du client</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="text">Témoignage</Label>
            <Textarea
              id="text"
              value={formData.text}
              onChange={(e) => handleChange('text', e.target.value)}
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="rating">Note (1-5)</Label>
              <Input
                id="rating"
                type="number"
                min="1"
                max="5"
                value={formData.rating}
                onChange={(e) => handleChange('rating', parseInt(e.target.value) || 5)}
                required
              />
            </div>
            <div>
              <Label htmlFor="service">Service</Label>
              <Input
                id="service"
                value={formData.service}
                onChange={(e) => handleChange('service', e.target.value)}
                placeholder="Ex: Nattes collées"
                required
              />
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