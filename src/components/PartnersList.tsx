import { useState } from 'react';
import { Partner } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit, Trash2, Plus, Search, ExternalLink, Power } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { usePartners } from '@/hooks/usePartners';
import { useConfirmDeleteDialog } from '@/hooks/useConfirmDeleteDialog';

interface PartnersListProps {
  onEdit: (partner: Partner) => void;
  onAdd: () => void;
  onDelete?: (partnerId: string, partnerName: string) => void;
}

const PartnersList = ({ onEdit, onAdd, onDelete }: PartnersListProps) => {
  const { partners, deletePartner, togglePartnerStatus } = usePartners();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const { confirmDelete, ConfirmDeleteDialog } = useConfirmDeleteDialog({
    title: 'Confirmer la suppression',
    description: 'Êtes-vous sûr de vouloir supprimer la marque',
  });

  // Filtrer les marques selon la recherche et le statut
  const filteredPartners = partners.filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (partner.description && partner.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || partner.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const renderPartnerCard = (partner: Partner) => (
    <Card key={partner.id} className="transition-all duration-200 hover:shadow-lg hover:scale-[1.02] overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{partner.name}</CardTitle>
          <Badge variant={partner.status === 'active' ? 'default' : 'secondary'}>
            {partner.status === 'active' ? 'Actif' : 'Désactivé'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Logo */}
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center overflow-hidden mx-auto">
            {partner.logo ? (
              <img
                src={partner.logo}
                alt={`Logo ${partner.name}`}
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            <div className={`w-full h-full flex items-center justify-center text-muted-foreground text-xs ${partner.logo ? 'hidden' : ''}`}>
              Logo
            </div>
          </div>

          {/* Description */}
          {partner.description && (
            <p className="text-sm text-muted-foreground text-center">
              {partner.description}
            </p>
          )}

          {/* Website */}
          {partner.website && partner.website !== '#' && (
            <div className="text-center">
              <a
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm"
              >
                Site web
                <ExternalLink size={14} />
              </a>
            </div>
          )}

          <div className="space-y-2 pt-4">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => onEdit(partner)} className="flex-1" aria-label={`Modifier la marque ${partner.name}`}>
                <Edit className="h-4 w-4 mr-2" />
                Modifier
              </Button>
              <Button variant="outline" size="sm" onClick={() => togglePartnerStatus(partner.id)} className="flex-1" aria-label={`${partner.status === 'active' ? 'Désactiver' : 'Activer'} la marque ${partner.name}`}>
                <Power className="h-4 w-4 mr-2" />
                {partner.status === 'active' ? 'Désactiver' : 'Activer'}
              </Button>
            </div>
            <Button
              variant="destructive"
              size="sm"
              className="w-full"
              onClick={() => confirmDelete(partner.name, () => {
                deletePartner(partner.id);
                onDelete?.(partner.id, partner.name);
              })}
              aria-label={`Supprimer la marque ${partner.name}`}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Supprimer
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Gestion des Marques</h2>
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <Button onClick={onAdd} aria-label="Ajouter une nouvelle marque">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter une marque
        </Button>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto max-w-full overflow-x-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher une marque..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full sm:w-64"
            />
          </div>
          <Select value={statusFilter} onValueChange={(value: 'all' | 'active' | 'inactive') => setStatusFilter(value)}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="active">Actif</SelectItem>
              <SelectItem value="inactive">Désactivé</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredPartners.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              Aucune marque définie.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredPartners.map(renderPartnerCard)}
        </div>
      )}
      <ConfirmDeleteDialog />
    </div>
  );
};

export default PartnersList;