import AdminUserSearch from "./AdminUserSearch";

const AdminUserFilters = ({ search, setSearch, role, setRole, status, setStatus }) => (
  <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row dark:border-slate-800 dark:bg-slate-900">
    <AdminUserSearch value={search} onChange={setSearch} />
    <select value={role} onChange={(e) => setRole(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900">
      <option value="">All roles</option>
      <option value="USER">User</option>
      <option value="ADMIN">Admin</option>
    </select>
    <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900">
      <option value="">All statuses</option>
      <option value="ACTIVE">Active</option>
      <option value="INACTIVE">Inactive</option>
      <option value="LOCKED">Locked</option>
    </select>
  </div>
);

export default AdminUserFilters;
