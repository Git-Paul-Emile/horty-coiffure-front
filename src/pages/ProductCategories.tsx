import { useSearchParams } from "react-router-dom";
import ProductCategoriesManagement from "@/components/ProductCategoriesManagement";
import AdminLayout from "@/components/AdminLayout";

const ProductCategories = () => {
  const [searchParams] = useSearchParams();
  const action = searchParams.get("action");

  return (
    <AdminLayout>
      <div className="p-6">
        <ProductCategoriesManagement />
      </div>
    </AdminLayout>
  );
};

export default ProductCategories;