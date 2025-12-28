import { useSearchParams } from "react-router-dom";
import PartnersManagement from "@/components/PartnersManagement";
import AdminLayout from "@/components/AdminLayout";

const Partners = () => {
  const [searchParams] = useSearchParams();
  const action = searchParams.get("action");

  return (
    <AdminLayout>
      <div className="p-6">
        <PartnersManagement initialAction={action === "add" ? "add" : null} />
      </div>
    </AdminLayout>
  );
};

export default Partners;