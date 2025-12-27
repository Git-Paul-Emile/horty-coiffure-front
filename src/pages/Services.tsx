import { useSearchParams } from "react-router-dom";
import ServicesManagement from "@/components/ServicesManagement";
import AdminLayout from "@/components/AdminLayout";

const Services = () => {
  const [searchParams] = useSearchParams();
  const action = searchParams.get("action");

  return (
    <AdminLayout>
      <div className="p-6">
        <ServicesManagement initialAction={action === "add" ? "add" : null} />
      </div>
    </AdminLayout>
  );
};

export default Services;