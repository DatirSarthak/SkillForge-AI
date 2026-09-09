import { CalendarDays, CheckCircle2, Eye, Shield, UserRound, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const STATUS_STYLES = {
  ACTIVE:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
  INACTIVE:
    "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
  LOCKED:
    "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300",
};

const getInitials = (firstName, lastName) => {
  const firstInitial = firstName?.trim()?.[0] ?? "";
  const lastInitial = lastName?.trim()?.[0] ?? "";

  return `${firstInitial}${lastInitial}`.toUpperCase() || "U";
};

const formatDate = (date) => {
  if (!date) {
    return "—";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "—";
  }

  return parsedDate.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const AdminUserCard = ({ user }) => {
  const fullName =
    `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || "Unknown User";

  const statusStyle =
    STATUS_STYLES[user.accountStatus] ?? STATUS_STYLES.INACTIVE;

  return (
    <article
      className="
        rounded-2xl
        border border-slate-200
        bg-white
        p-5
        shadow-sm
        transition
        hover:-translate-y-0.5
        hover:shadow-md
        dark:border-slate-800
        dark:bg-slate-900
      "
    >
      {/* User Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          {/* Avatar */}
          <div
            className="
              flex h-12 w-12 shrink-0
              items-center justify-center
              overflow-hidden rounded-full
              bg-primary/10
              text-sm font-semibold text-primary
            "
          >
            {user.profileImageUrl ? (
              <img
                src={user.profileImageUrl}
                alt={`${fullName} profile`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              getInitials(user.firstName, user.lastName)
            )}
          </div>

          {/* Name + Email */}
          <div className="min-w-0">
            <h3
              className="
                truncate
                text-sm
                font-semibold
                text-slate-900
                dark:text-white
              "
              title={fullName}
            >
              {fullName}
            </h3>

            <p
              className="
                mt-0.5
                truncate
                text-xs
                text-slate-500
                dark:text-slate-400
              "
              title={user.email}
            >
              {user.email}
            </p>
          </div>
        </div>

        {/* Role */}
        <span
          className="
            inline-flex
            shrink-0
            items-center
            gap-1.5
            rounded-full
            bg-primary/10
            px-2.5
            py-1
            text-xs
            font-medium
            text-primary
          "
        >
          <Shield size={13} />
          {user.role}
        </span>
      </div>

      {/* User Information */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        {/* Status */}
        <div
          className="
            rounded-xl
            border border-slate-100
            bg-slate-50
            p-3
            dark:border-slate-800
            dark:bg-slate-950/60
          "
        >
          <div className="mb-1 flex items-center gap-1.5">
            {user.accountStatus === "ACTIVE" ? (
              <CheckCircle2 size={14} className="text-emerald-600" />
            ) : user.accountStatus === "LOCKED" ? (
              <XCircle size={14} className="text-red-600" />
            ) : (
              <UserRound size={14} className="text-slate-500" />
            )}

            <span className="text-xs text-slate-500 dark:text-slate-400">
              Status
            </span>
          </div>

          <span
            className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${statusStyle}`}
          >
            {user.accountStatus ?? "UNKNOWN"}
          </span>
        </div>

        {/* Email Verification */}
        <div
          className="
            rounded-xl
            border border-slate-100
            bg-slate-50
            p-3
            dark:border-slate-800
            dark:bg-slate-950/60
          "
        >
          <div className="mb-1 flex items-center gap-1.5">
            <CheckCircle2
              size={14}
              className={
                user.emailVerified
                  ? "text-emerald-600"
                  : "text-slate-400"
              }
            />

            <span className="text-xs text-slate-500 dark:text-slate-400">
              Verification
            </span>
          </div>

          <p
            className={`text-xs font-medium ${
              user.emailVerified
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-slate-500 dark:text-slate-400"
            }`}
          >
            {user.emailVerified ? "Verified" : "Not verified"}
          </p>
        </div>
      </div>

      {/* Created Date */}
      <div
        className="
          mt-3
          flex
          items-center
          gap-2
          text-xs
          text-slate-500
          dark:text-slate-400
        "
      >
        <CalendarDays size={14} />

        <span>
          Joined {formatDate(user.createdAt)}
        </span>
      </div>

      {/* Action */}
      <div className="mt-5 border-t border-slate-100 pt-4 dark:border-slate-800">
        <Link
          to={`/admin/users/${user.id}`}
          className="
            inline-flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-slate-200
            px-4
            py-2.5
            text-sm
            font-medium
            text-slate-700
            transition
            hover:bg-slate-50
            hover:text-primary
            focus:outline-none
            focus:ring-2
            focus:ring-primary/20
            dark:border-slate-700
            dark:text-slate-200
            dark:hover:bg-slate-800
            dark:hover:text-primary
          "
        >
          <Eye size={16} />
          View Details
        </Link>
      </div>
    </article>
  );
};

AdminUserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
    accountStatus: PropTypes.string,
    emailVerified: PropTypes.bool,
    profileImageUrl: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
};

export default AdminUserCard;