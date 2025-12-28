import { useSearchParams } from "react-router-dom";
import TestimonialsManagement from "@/components/TestimonialsManagement";
import AdminLayout from "@/components/AdminLayout";

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