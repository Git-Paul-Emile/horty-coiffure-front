import { useSearchParams } from "react-router-dom";
import TestimonialsManagement from "@/features/testimonials/components/TestimonialsManagement";
import AdminLayout from "@/layout/AdminLayout";

const Testimonials = () => {
  const [searchParams] = useSearchParams();
  const action = searchParams.get("action");

  return (
    <AdminLayout>
      <div className="p-6">
        <TestimonialsManagement initialAction={action === "add" ? "add" : null} />
      </div>
    </AdminLayout>
  );
};

export default Testimonials;
