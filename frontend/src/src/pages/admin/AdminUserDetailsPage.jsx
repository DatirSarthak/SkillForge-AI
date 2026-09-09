import { ArrowLeft, Edit3 } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import AdminUserDetails from "../../components/admin/AdminUserDetails";
import AdminUserStatusDialog from "../../components/admin/AdminUserStatusDialog";
import { useAdminUser, useUpdateAdminUserStatus } from "../../hooks/useAdmin";
import toast from "react-hot-toast";

const AdminUserDetailsPage = () => {
  const { userId } = useParams();
  const { data, isLoading, isError, refetch } = useAdminUser(userId);
  const mutation = useUpdateAdminUserStatus();
  const [dialogOpen, setDialogOpen] = useState(false);

  const updateStatus = async (accountStatus) => {
    try {
      await mutation.mutateAsync({ userId, accountStatus });
      toast.success("Account status updated.");
      setDialogOpen(false);
    } catch (error) {
      toast.error(error?.response?.data?.message ?? "Unable to update account status.");
    }
  };

  if (isLoading) return <div className="h-96 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />;
  if (isError || !data) return <div className="py-20 text-center"><p className="font-semibold">Unable to load user</p><button onClick={() => refetch()} className="mt-4 rounded-xl bg-primary px-4 py-2 text-sm text-white">Try again</button></div>;

  return <div className="space-y-6"><div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><Link to="/admin/users" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300"><ArrowLeft size={17} /> Back to users</Link><button onClick={() => setDialogOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white"><Edit3 size={16} /> Update status</button></div><AdminUserDetails user={data} />{dialogOpen && <AdminUserStatusDialog user={data} onClose={() => setDialogOpen(false)} onConfirm={updateStatus} loading={mutation.isPending} />}</div>;
};

export default AdminUserDetailsPage;
