import { useSearchParams } from "react-router-dom";
import ProductsManagement from "@/components/ProductsManagement";
import PartnersManagement from "@/components/PartnersManagement";
import AdminLayout from "@/components/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Products = () => {
  const [searchParams] = useSearchParams();
  const action = searchParams.get("action");

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Gestion des Produits et Partenaires</h1>
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="products">Produits</TabsTrigger>
            <TabsTrigger value="partners">Partenaires</TabsTrigger>
          </TabsList>
          <TabsContent value="products">
            <ProductsManagement initialAction={action === "add" ? "add" : null} />
          </TabsContent>
          <TabsContent value="partners">
            <PartnersManagement />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Products;