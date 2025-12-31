import { useConfirmDelete } from './useConfirmDelete';
import { ConfirmDeleteDialog } from '@/components/ui/confirm-delete-dialog';

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
