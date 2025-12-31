import AppointmentsManagement from "@/features/appointments/components/AppointmentsManagement";
import AdminLayout from "@/layout/AdminLayout";

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
