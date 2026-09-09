import { Search } from "lucide-react";

const AdminUserSearch = ({ value, onChange }) => (
  <div className="relative min-w-0 flex-1">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search name or email..."
      className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-900"
    />
  </div>
);

export default AdminUserSearch;
