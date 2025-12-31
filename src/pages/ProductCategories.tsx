import { useSearchParams } from "react-router-dom";
import ProductCategoriesManagement from "@/features/products/components/ProductCategoriesManagement";
import AdminLayout from "@/layout/AdminLayout";

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
