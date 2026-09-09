import { ShieldCheck } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const AdminHeader = () => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
      <div className="flex min-h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">Administration</p>
          <h1 className="text-lg font-semibold">Control Center</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Administrator</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-primary">
            {user?.profileImageUrl ? (
              <img src={user.profileImageUrl} alt="Admin profile" className="h-full w-full object-cover" />
            ) : (
              <ShieldCheck size={19} />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
