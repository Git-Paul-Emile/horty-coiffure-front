import FeedbacksManagement from "@/components/FeedbacksManagement";
import AdminLayout from "@/components/AdminLayout";

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