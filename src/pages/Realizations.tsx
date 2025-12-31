import { useSearchParams } from "react-router-dom";
import RealizationsManagement from "@/features/realizations/components/RealizationsManagement";
import AdminLayout from "@/layout/AdminLayout";

const Realizations = () => {
  const [searchParams] = useSearchParams();
  const action = searchParams.get("action");

  return (
    <AdminLayout>
      <div className="p-6">
        <RealizationsManagement initialAction={action === "add" ? "add" : null} />
      </div>
    </AdminLayout>
  );
};

export default Realizations;
