import { useState } from "react";

const AdminUserStatusDialog = ({ user, onClose, onConfirm, loading }) => {
  const [status, setStatus] = useState(user.accountStatus);
  if (!user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-900">
        <h2 className="text-lg font-semibold">Update account status</h2>
        <p className="mt-2 text-sm text-slate-500">Change the status for {user.firstName} {user.lastName}.</p>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="mt-5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950">
          <option value="ACTIVE">Active</option><option value="INACTIVE">Inactive</option><option value="LOCKED">Locked</option>
        </select>
        <div className="mt-6 flex justify-end gap-3"><button onClick={onClose} disabled={loading} className="rounded-xl px-4 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800">Cancel</button><button onClick={() => onConfirm(status)} disabled={loading || status === user.accountStatus} className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white disabled:opacity-50">{loading ? "Saving..." : "Save status"}</button></div>
      </div>
    </div>
  );
};

export default AdminUserStatusDialog;
