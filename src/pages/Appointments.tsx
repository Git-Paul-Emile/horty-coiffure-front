import AppointmentsManagement from "@/components/AppointmentsManagement";
import AdminLayout from "@/components/AdminLayout";

const Appointments = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        <AppointmentsManagement />
      </div>
    </AdminLayout>
  );
};

export default Appointments;