import { useState } from 'react';
import { Feedback } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Trash2, Search, Star, Eye, EyeOff, Archive } from 'lucide-react';
import { useFeedbacks } from '@/hooks/useFeedbacks';
import { useConfirmDeleteDialog } from '@/hooks/useConfirmDeleteDialog';

interface FeedbacksListProps {
  onDelete?: (feedbackId: string, feedbackName: string) => void;
}

const FeedbacksList = ({ onDelete }: FeedbacksListProps) => {
  const { feedbacks, deleteFeedback, toggleReadStatus, archiveFeedback, updateFeedback } = useFeedbacks();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unread' | 'read' | 'archived'>('all');
  const { confirmDelete, ConfirmDeleteDialog } = useConfirmDeleteDialog({
    title: 'Confirmer la suppression',
    description: 'Êtes-vous sûr de vouloir supprimer ce feedback',
  });

  // Filtrer les feedbacks selon la recherche et le statut
  const filteredFeedbacks = feedbacks.filter(feedback => {
    const matchesSearch = feedback.comment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || feedback.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'read': return 'default';
      case 'unread': return 'secondary';
      case 'archived': return 'outline';
      default: return 'secondary';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'read': return 'Lu';
      case 'unread': return 'Non lu';
      case 'archived': return 'Archivé';
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderFeedbackCard = (feedback: Feedback) => (
    <Card key={feedback.id} className="transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">
            Feedback Anonyme
          </CardTitle>
          <Badge variant={getStatusBadgeVariant(feedback.status)}>
            {getStatusLabel(feedback.status)}
          </Badge>
        </div>
        <div className="flex items-center gap-1 mt-2">
          {[...Array(feedback.rating)].map((_, i) => (
            <Star key={i} size={14} className="fill-primary text-primary" />
          ))}
        </div>
        <div className="text-sm text-muted-foreground mt-1">
          {formatDate(feedback.createdAt)}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
          "{feedback.comment}"
        </p>
        <div className="space-y-2">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleReadStatus(feedback.id)}
              className="flex-1"
            >
              {feedback.status === 'unread' ? <Eye className="h-4 w-4 mr-2" /> : <EyeOff className="h-4 w-4 mr-2" />}
              {feedback.status === 'unread' ? 'Marquer lu' : 'Marquer non lu'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => feedback.status === 'archived' ? updateFeedback(feedback.id, { status: 'read' }) : archiveFeedback(feedback.id)}
              className="flex-1"
            >
              <Archive className="h-4 w-4 mr-2" />
              {feedback.status === 'archived' ? 'Désarchiver' : 'Archiver'}
            </Button>
          </div>
          <Button
            variant="destructive"
            size="sm"
            className="w-full"
            onClick={() => confirmDelete('ce feedback', () => {
              deleteFeedback(feedback.id);
              onDelete?.(feedback.id, 'Feedback Anonyme');
            })}
            aria-label="Supprimer ce feedback anonyme"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Supprimer
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <h2 className="text-xl font-semibold">Feedbacks reçus ({feedbacks.length})</h2>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto max-w-full overflow-x-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher dans les commentaires..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full sm:w-64"
            />
          </div>
          <Select value={statusFilter} onValueChange={(value: 'all' | 'unread' | 'read' | 'archived') => setStatusFilter(value)}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="unread">Non lus</SelectItem>
              <SelectItem value="read">Lus</SelectItem>
              <SelectItem value="archived">Archivés</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredFeedbacks.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                Aucun feedback trouvé.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredFeedbacks.map(renderFeedbackCard)}
          </div>
        )}
      </div>
      <ConfirmDeleteDialog />
    </div>
  );
};

export default FeedbacksList;