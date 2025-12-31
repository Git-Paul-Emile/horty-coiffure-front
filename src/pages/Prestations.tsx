import { useSearchParams } from "react-router-dom";
import PrestationsManagement from "@/features/services/components/PrestationsManagement";
import AdminLayout from "@/layout/AdminLayout";

const Prestations = () => {
  const [searchParams] = useSearchParams();
  const action = searchParams.get("action");

  return (
    <AdminLayout>
      <div className="p-6">
        <PrestationsManagement initialAction={action === "add" ? "add" : null} />
      </div>
    </AdminLayout>
  );
};

export default Prestations;
