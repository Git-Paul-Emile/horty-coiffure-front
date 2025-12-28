import { useState } from 'react';
import { Testimonial } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Edit, Trash2, Plus, Search, Star } from 'lucide-react';
import { useTestimonials } from '@/hooks/useTestimonials';

interface TestimonialsListProps {
  onEdit: (testimonial: Testimonial) => void;
  onAdd: () => void;
  onDelete?: (testimonialId: string, testimonialName: string) => void;
}

const TestimonialsList = ({ onEdit, onAdd, onDelete }: TestimonialsListProps) => {
  const { testimonials, deleteTestimonial } = useTestimonials();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  // Filtrer les témoignages selon la recherche et le statut
  const filteredTestimonials = testimonials.filter(testimonial => {
    const matchesSearch = testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          testimonial.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          testimonial.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || testimonial.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'approved': return 'default';
      case 'pending': return 'secondary';
      case 'rejected': return 'destructive';
      default: return 'secondary';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'approved': return 'Approuvé';
      case 'pending': return 'En attente';
      case 'rejected': return 'Rejeté';
      default: return status;
    }
  };

  const renderTestimonialCard = (testimonial: Testimonial) => (
    <Card key={testimonial.id} className="transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{testimonial.name}</CardTitle>
          <Badge variant={getStatusBadgeVariant(testimonial.status)}>
            {getStatusLabel(testimonial.status)}
          </Badge>
        </div>
        <div className="flex items-center gap-1 mt-2">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} size={14} className="fill-primary text-primary" />
          ))}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
          "{testimonial.text}"
        </p>
        <div className="text-sm mb-4">
          <span className="font-medium">Service:</span> {testimonial.service}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(testimonial)} className="flex-1" aria-label={`Modifier le témoignage de ${testimonial.name}`}>
            <Edit className="h-4 w-4 mr-2" />
            Modifier
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex-1" aria-label={`Supprimer le témoignage de ${testimonial.name}`}>
                <Trash2 className="h-4 w-4 mr-2" />
                Supprimer
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                <AlertDialogDescription>
                  Êtes-vous sûr de vouloir supprimer le témoignage de "{testimonial.name}" ? Cette action est irréversible.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    deleteTestimonial(testimonial.id);
                    onDelete?.(testimonial.id, testimonial.name);
                  }}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Supprimer
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <Button onClick={onAdd} aria-label="Ajouter un nouveau témoignage">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un témoignage
        </Button>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un témoignage..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full sm:w-64"
            />
          </div>
          <Select value={statusFilter} onValueChange={(value: 'all' | 'pending' | 'approved' | 'rejected') => setStatusFilter(value)}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="approved">Approuvé</SelectItem>
              <SelectItem value="rejected">Rejeté</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredTestimonials.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                Aucun témoignage trouvé.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTestimonials.map(renderTestimonialCard)}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestimonialsList;