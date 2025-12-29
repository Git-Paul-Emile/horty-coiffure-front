import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useConfirmDelete } from '@/hooks/useConfirmDelete';

interface ConfirmDeleteDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  itemName: string;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmDeleteDialog = ({
  isOpen,
  onConfirm,
  onCancel,
  itemName,
  title = 'Confirmer la suppression',
  description = 'Cette action est irréversible.',
  confirmText = 'Supprimer',
  cancelText = 'Annuler',
}: ConfirmDeleteDialogProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onCancel}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description} "{itemName}" ?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

// Hook wrapper pour une utilisation simplifiée
export const useConfirmDeleteDialog = (options?: {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
}) => {
  const confirmDelete = useConfirmDelete(options);

  const ConfirmDeleteDialogComponent = () => (
    <ConfirmDeleteDialog
      isOpen={confirmDelete.isOpen}
      onConfirm={confirmDelete.handleConfirm}
      onCancel={confirmDelete.handleCancel}
      itemName={confirmDelete.itemName}
      title={confirmDelete.title}
      description={confirmDelete.description}
      confirmText={confirmDelete.confirmText}
      cancelText={confirmDelete.cancelText}
    />
  );

  return {
    confirmDelete: confirmDelete.confirmDelete,
    ConfirmDeleteDialog: ConfirmDeleteDialogComponent,
  };
};