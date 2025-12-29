import { useState, useEffect } from 'react';
import { Realization } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Upload, X } from 'lucide-react';
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

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [imagePreview, setImagePreview] = useState<string>('');

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (realization) {
      setFormData({
        image: realization.image,
        serviceId: realization.serviceId,
        caption: realization.caption,
        title: realization.title || '',
      });
      setImagePreview(realization.image);
    } else {
      setFormData({
        image: '',
        serviceId: '',
        caption: '',
        title: '',
      });
      setImagePreview('');
    }
    setSelectedFile(null);
    setErrors({});
  }, [realization, open]);

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
    if (!formData.caption.trim()) newErrors.caption = 'La légende est requise';
    if (!formData.image.trim() && !selectedFile) newErrors.image = 'L\'image est requise';
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
    const imageToSave = selectedFile ? imagePreview : (realization?.image || '');
    onSave({ ...formData, image: imageToSave });
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
            {realization ? 'Modifier la réalisation' : 'Ajouter une réalisation'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Informations générales</h3>
              <div className="space-y-4 mt-4">
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
                  <Label htmlFor="caption">Légende</Label>
                  <Textarea
                    id="caption"
                    value={formData.caption}
                    onChange={(e) => handleChange('caption', e.target.value)}
                    rows={3}
                    placeholder="Décrivez le travail réalisé..."
                    required
                    aria-describedby={errors.caption ? "caption-error" : undefined}
                    aria-invalid={!!errors.caption}
                  />
                  {errors.caption && <p id="caption-error" className="text-red-500 text-sm mt-1">{errors.caption}</p>}
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Médias</h3>
              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="image">Image de la réalisation</Label>
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
              <h3 className="text-lg font-semibold text-gray-900">Association</h3>
              <div className="space-y-4 mt-4">
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
              </div>
            </div>
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