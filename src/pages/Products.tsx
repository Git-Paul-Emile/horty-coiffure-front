import { useSearchParams } from "react-router-dom";
import ProductsManagement from "@/features/products/components/ProductsManagement";
import AdminLayout from "@/layout/AdminLayout";

const Products = () => {
  const [searchParams] = useSearchParams();
  const action = searchParams.get("action");

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Gestion des Produits</h1>
        <ProductsManagement initialAction={action === "add" ? "add" : null} />
      </div>
    </AdminLayout>
  );
};

export default Products;
