import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import AdminUserFilters from "../../components/admin/AdminUserFilters";
import AdminUserTable from "../../components/admin/AdminUserTable";
import { useAdminUsers } from "../../hooks/useAdmin";

const AdminUsersPage = () => {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setPage(0), 250);
    return () => clearTimeout(timer);
  }, [search, role, status]);

  const params = { page, size: 20, search: search || undefined, role: role || undefined, status: status || undefined, sortBy: "createdAt", direction: "desc" };
  const { data, isLoading, isError, refetch } = useAdminUsers(params);
  const users = data?.content ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className="space-y-6">
      <div><p className="text-sm font-medium text-primary">Administration</p><h1 className="mt-1 text-2xl font-bold sm:text-3xl">Users</h1><p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Search, filter and inspect platform accounts.</p></div>
      <AdminUserFilters search={search} setSearch={setSearch} role={role} setRole={setRole} status={status} setStatus={setStatus} />
      {isLoading ? <div className="h-96 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" /> : isError ? <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">Unable to load users. <button onClick={() => refetch()} className="font-semibold underline">Try again</button></div> : <AdminUserTable users={users} />}
      {!isLoading && !isError && totalPages > 0 && <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900"><span className="text-sm text-slate-500">Page {page + 1} of {totalPages}</span><div className="flex gap-2"><button disabled={page === 0} onClick={() => setPage((p) => p - 1)} className="rounded-lg border border-slate-200 p-2 disabled:opacity-40 dark:border-slate-700"><ChevronLeft size={18} /></button><button disabled={page >= totalPages - 1} onClick={() => setPage((p) => p + 1)} className="rounded-lg border border-slate-200 p-2 disabled:opacity-40 dark:border-slate-700"><ChevronRight size={18} /></button></div></div>}
    </div>
  );
};

export default AdminUsersPage;
