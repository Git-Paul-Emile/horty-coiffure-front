import { useSearchParams } from "react-router-dom";
import NewsManagement from "@/components/NewsManagement";
import AdminLayout from "@/components/AdminLayout";

const News = () => {
  const [searchParams] = useSearchParams();
  const action = searchParams.get("action");

  return (
    <AdminLayout>
      <div className="p-6">
        <NewsManagement />
      </div>
    </AdminLayout>
  );
};

export default News;