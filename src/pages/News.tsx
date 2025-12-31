import { useSearchParams } from "react-router-dom";
import NewsManagement from "@/features/news/components/NewsManagement";
import AdminLayout from "@/layout/AdminLayout";

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
