import { useState, useEffect } from 'react';
import { News } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit, Trash2, Plus, Eye, Upload, X } from 'lucide-react';
import { useNews } from '@/hooks/useNews';

const NewsManagement = () => {
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { news, addNews, updateNews, deleteNews } = useNews();

  const handleAdd = () => {
    setEditingNews(null);
    setIsFormOpen(true);
  };

  const handleEdit = (newsItem: News) => {
    setEditingNews(newsItem);
    setIsFormOpen(true);
  };

  const handleSave = (newsData: Omit<News, 'id'>) => {
    if (editingNews) {
      updateNews(editingNews.id, newsData);
    } else {
      addNews(newsData);
    }
    setIsFormOpen(false);
    setEditingNews(null);
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setEditingNews(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestion des Actualités</h2>
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter une actualité
        </Button>
      </div>

      {news.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              Aucune actualité. Cliquez sur "Ajouter une actualité" pour commencer.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {news.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {new Date(item.publishedAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      item.status === 'published'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.status === 'published' ? 'Publié' : 'Brouillon'}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {item.content}
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                    <Edit className="h-4 w-4 mr-1" />
                    Modifier
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => deleteNews(item.id)}>
                    <Trash2 className="h-4 w-4 mr-1" />
                    Supprimer
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <NewsForm
        news={editingNews}
        open={isFormOpen}
        onClose={handleClose}
        onSave={handleSave}
      />
    </div>
  );
};

interface NewsFormProps {
  news?: News | null;
  open: boolean;
  onClose: () => void;
  onSave: (news: Omit<News, 'id'>) => void;
}

const NewsForm = ({ news, open, onClose, onSave }: NewsFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
    status: 'draft' as 'draft' | 'published',
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [imagePreview, setImagePreview] = useState<string>('');

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (news) {
      setFormData({
        title: news.title,
        content: news.content,
        image: news.image || '',
        status: news.status,
      });
      setImagePreview(news.image || '');
    } else {
      setFormData({
        title: '',
        content: '',
        image: '',
        status: 'draft',
      });
      setImagePreview('');
    }
    setSelectedFile(null);
    setErrors({});
  }, [news, open]);

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
    if (!formData.title.trim()) newErrors.title = 'Le titre est requis';
    if (!formData.content.trim()) newErrors.content = 'Le contenu est requis';
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
    const imageToSave = selectedFile ? imagePreview : (news?.image || '');
    onSave({
      ...formData,
      image: imageToSave,
      publishedAt: news?.publishedAt || new Date().toISOString(),
    });
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
            {news ? 'Modifier l\'actualité' : 'Ajouter une actualité'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Informations générales</h3>
              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="title">Titre</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    required
                    autoFocus
                    aria-describedby={errors.title ? "title-error" : undefined}
                    aria-invalid={!!errors.title}
                  />
                  {errors.title && <p id="title-error" className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>
                <div>
                  <Label htmlFor="content">Contenu</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => handleChange('content', e.target.value)}
                    rows={6}
                    required
                    aria-describedby={errors.content ? "content-error" : undefined}
                    aria-invalid={!!errors.content}
                  />
                  {errors.content && <p id="content-error" className="text-red-500 text-sm mt-1">{errors.content}</p>}
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Médias</h3>
              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="image">Image de l'actualité</Label>
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
              <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Brouillon</SelectItem>
                  <SelectItem value="published">Publié</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">
              {news ? 'Modifier' : 'Ajouter'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewsManagement;