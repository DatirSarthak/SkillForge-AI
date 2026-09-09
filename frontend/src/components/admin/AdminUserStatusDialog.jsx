import { useState } from "react";

const AdminUserStatusDialog = ({
  user,
  onClose,
  onConfirm,
  loading,
}) => {
  const [status, setStatus] = useState(
    user?.accountStatus ?? "ACTIVE"
  );

  if (!user) return null;

  const hasChanges = status !== user.accountStatus;

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-slate-950/50
        p-4
        backdrop-blur-sm
      "
      role="dialog"
      aria-modal="true"
      aria-labelledby="status-dialog-title"
    >
      <div
        className="
          w-full max-w-md
          rounded-2xl
          border border-slate-200
          bg-white
          p-6
          shadow-2xl
          dark:border-slate-800
          dark:bg-slate-900
        "
      >
        <h2
          id="status-dialog-title"
          className="text-lg font-semibold text-slate-900 dark:text-white"
        >
          Update account status
        </h2>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Change the status for{" "}
          <span className="font-medium text-slate-700 dark:text-slate-200">
            {user.firstName} {user.lastName}
          </span>
          .
        </p>

        <div className="mt-5">
          <label
            htmlFor="account-status"
            className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Account status
          </label>

          <select
            id="account-status"
            value={status}
            onChange={(event) =>
              setStatus(event.target.value)
            }
            disabled={loading}
            className="
              w-full
              rounded-xl
              border border-slate-200
              bg-white
              px-3 py-2.5
              text-sm
              text-slate-900
              outline-none
              transition
              focus:border-slate-400
              focus:ring-2
              focus:ring-slate-200
              disabled:cursor-not-allowed
              disabled:opacity-60
              dark:border-slate-700
              dark:bg-slate-950
              dark:text-white
              dark:focus:border-slate-500
              dark:focus:ring-slate-800
            "
          >
            <option value="ACTIVE">
              Active
            </option>

            <option value="INACTIVE">
              Inactive
            </option>

            <option value="LOCKED">
              Locked
            </option>
          </select>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="
              rounded-xl
              border border-slate-200
              bg-white
              px-4 py-2
              text-sm font-semibold
              text-slate-700
              transition
              hover:bg-slate-50
              disabled:cursor-not-allowed
              disabled:opacity-50
              dark:border-slate-700
              dark:bg-slate-900
              dark:text-slate-200
              dark:hover:bg-slate-800
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => onConfirm(status)}
            disabled={loading || !hasChanges}
            className="
              inline-flex
              min-w-[110px]
              items-center justify-center
              rounded-xl
              bg-slate-900
              px-4 py-2
              text-sm font-semibold
              text-white
              shadow-sm
              transition
              hover:bg-slate-800
              focus:outline-none
              focus:ring-2
              focus:ring-slate-400
              focus:ring-offset-2
              disabled:cursor-not-allowed
              disabled:bg-slate-300
              disabled:text-slate-500
              disabled:shadow-none
              dark:bg-white
              dark:text-slate-900
              dark:hover:bg-slate-200
              dark:focus:ring-slate-500
              dark:focus:ring-offset-slate-900
              dark:disabled:bg-slate-700
              dark:disabled:text-slate-400
            "
          >
            {loading ? "Saving..." : "Save status"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminUserStatusDialog;
