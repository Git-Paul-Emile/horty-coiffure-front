import { useSearchParams } from "react-router-dom";
import CategoriesManagement from "@/features/categories/components/CategoriesManagement";
import AdminLayout from "@/layout/AdminLayout";

const Categories = () => {
  const [searchParams] = useSearchParams();
  const action = searchParams.get("action");

  return (
    <AdminLayout>
      <div className="p-6">
        <CategoriesManagement />
      </div>
    </AdminLayout>
  );
};

export default Categories;
