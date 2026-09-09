import { Eye } from "lucide-react";
import { Link } from "react-router-dom";
import AdminUserCard from "./AdminUserCard";

const statusClass = {
  ACTIVE:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
  INACTIVE:
    "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
  LOCKED:
    "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300",
};

const AdminUserTable = ({ users = [] }) => {
  return (
    <>
      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 md:block">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead
              className="
                border-b border-slate-200
                bg-slate-50
                text-xs uppercase tracking-wider
                text-slate-500
                dark:border-slate-800
                dark:bg-slate-950/50
                dark:text-slate-400
              "
            >
              <tr>
                <th className="px-5 py-4">User</th>
                <th className="px-5 py-4">Role</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Verified</th>
                <th className="px-5 py-4">Created</th>
                <th className="px-5 py-4" />
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="
                    hover:bg-slate-50/70
                    dark:hover:bg-slate-800/40
                  "
                >
                  {/* User */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="
                          flex h-9 w-9 shrink-0
                          items-center justify-center
                          overflow-hidden rounded-full
                          bg-primary/10
                          text-xs font-semibold
                          text-primary
                        "
                      >
                        {user.profileImageUrl ? (
                          <img
                            src={user.profileImageUrl}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          `${user.firstName?.[0] ?? ""}${
                            user.lastName?.[0] ?? ""
                          }`
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate font-medium text-slate-900 dark:text-white">
                          {user.firstName} {user.lastName}
                        </p>

                        <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="px-5 py-4 text-slate-700 dark:text-slate-300">
                    {user.role}
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        statusClass[user.accountStatus] ??
                        statusClass.INACTIVE
                      }`}
                    >
                      {user.accountStatus}
                    </span>
                  </td>

                  {/* Verified */}
                  <td className="px-5 py-4 text-slate-700 dark:text-slate-300">
                    {user.emailVerified ? "Yes" : "No"}
                  </td>

                  {/* Created */}
                  <td className="whitespace-nowrap px-5 py-4 text-slate-500 dark:text-slate-400">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "—"}
                  </td>

                  {/* View */}
                  <td className="px-5 py-4 text-right">
                    <Link
                      to={`/admin/users/${user.id}`}
                      className="
                        inline-flex
                        items-center
                        gap-1.5
                        rounded-lg
                        px-3 py-2
                        text-primary
                        transition
                        hover:bg-primary/10
                      "
                    >
                      <Eye size={16} />
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!users.length && (
          <div className="p-10 text-center text-sm text-slate-500 dark:text-slate-400">
            No users found.
          </div>
        )}
      </div>

      {/* Mobile Cards */}
      <div className="grid gap-4 md:hidden">
        {users.map((user) => (
          <AdminUserCard key={user.id} user={user} />
        ))}

        {!users.length && (
          <div
            className="
              rounded-2xl
              border border-slate-200
              bg-white
              p-8
              text-center
              text-sm text-slate-500
              dark:border-slate-800
              dark:bg-slate-900
              dark:text-slate-400
            "
          >
            No users found.
          </div>
        )}
      </div>
    </>
  );
};

export default AdminUserTable;
