import FeedbacksManagement from "@/features/feedbacks/components/FeedbacksManagement";
import AdminLayout from "@/layout/AdminLayout";

const Feedbacks = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        <FeedbacksManagement />
      </div>
    </AdminLayout>
  );
};

export default Feedbacks;
