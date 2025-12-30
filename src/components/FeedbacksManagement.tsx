import FeedbacksList from './FeedbacksList';
import { useToast } from '@/hooks/use-toast';

const FeedbacksManagement = () => {
  const { toast } = useToast();

  const handleDelete = (feedbackId: string, feedbackName: string) => {
    toast({
      title: "Feedback supprimé",
      description: "Le feedback anonyme a été supprimé avec succès.",
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Gestion des Feedbacks</h1>
      <FeedbacksList onDelete={handleDelete} />
    </div>
  );
};

export default FeedbacksManagement;