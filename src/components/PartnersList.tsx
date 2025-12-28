import { useState } from 'react';
import { Partner } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Edit, Trash2, Plus, Search, ExternalLink } from 'lucide-react';
import { usePartners } from '@/hooks/usePartners';

interface PartnersListProps {
  onEdit: (partner: Partner) => void;
  onAdd: () => void;
  onDelete?: (partnerId: string, partnerName: string) => void;
}

const PartnersList = ({ onEdit, onAdd, onDelete }: PartnersListProps) => {
  const { partners, deletePartner } = usePartners();
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrer les partenaires selon la recherche
  const filteredPartners = partners.filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (partner.description && partner.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  const renderPartnerCard = (partner: Partner) => (
    <Card key={partner.id} className="transition-all duration-200 hover:shadow-lg hover:scale-[1.02] overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{partner.name}</CardTitle>
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

          <div className="flex gap-2 pt-4">
            <Button variant="outline" size="sm" onClick={() => onEdit(partner)} className="flex-1" aria-label={`Modifier le partenaire ${partner.name}`}>
              <Edit className="h-4 w-4 mr-2" />
              Modifier
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex-1" aria-label={`Supprimer le partenaire ${partner.name}`}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Supprimer
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                  <AlertDialogDescription>
                    Êtes-vous sûr de vouloir supprimer le partenaire "{partner.name}" ? Cette action est irréversible.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      deletePartner(partner.id);
                      onDelete?.(partner.id, partner.name);
                    }}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Supprimer
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <Button onClick={onAdd} aria-label="Ajouter un nouveau partenaire">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un partenaire
        </Button>
        <div className="relative flex-1 sm:flex-initial">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un partenaire..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full sm:w-64"
          />
        </div>
      </div>

      {filteredPartners.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              Aucun partenaire défini.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredPartners.map(renderPartnerCard)}
        </div>
      )}
    </div>
  );
};

export default PartnersList;