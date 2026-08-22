import {
  Bell,
  Check,
  Lock,
  Moon,
  Save,
  Shield,
  Sun,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import userService from "../../services/userService";
import { useTheme } from "../../contexts/ThemeContext";

const SettingsPage = () => {
  const { darkMode, toggleTheme } = useTheme();

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [profileLoading, setProfileLoading] = useState(true);
  const [profileSaving, setProfileSaving] = useState(false);

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordSaving, setPasswordSaving] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setProfileLoading(true);

        const response = await userService.getProfile();

        const data = response?.data ?? response;

        setProfile({
          firstName: data?.firstName ?? "",
          lastName: data?.lastName ?? "",
          email: data?.email ?? "",
        });
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            "Unable to load your profile."
        );
      } finally {
        setProfileLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleProfileChange = (event) => {
    const { name, value } = event.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleProfileSubmit = async (event) => {
    event.preventDefault();

    if (!profile.firstName.trim() || !profile.lastName.trim()) {
      toast.error("First name and last name are required.");
      return;
    }

    try {
      setProfileSaving(true);

      const response = await userService.updateProfile({
        firstName: profile.firstName.trim(),
        lastName: profile.lastName.trim(),
      });

      const data = response?.data ?? response;

      setProfile((previous) => ({
        ...previous,
        firstName: data?.firstName ?? previous.firstName,
        lastName: data?.lastName ?? previous.lastName,
      }));

      toast.success("Profile updated successfully.");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Unable to update your profile."
      );
    } finally {
      setProfileSaving(false);
    }
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;

    setPassword((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();

    if (
      !password.currentPassword ||
      !password.newPassword ||
      !password.confirmPassword
    ) {
      toast.error("Please complete all password fields.");
      return;
    }

    if (password.newPassword.length < 8) {
      toast.error(
        "New password must contain at least 8 characters."
      );
      return;
    }

    if (password.newPassword !== password.confirmPassword) {
      toast.error("New password and confirmation do not match.");
      return;
    }

    try {
      setPasswordSaving(true);

      await userService.changePassword(password);

      setPassword({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      toast.success("Password changed successfully.");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Unable to change your password."
      );
    } finally {
      setPasswordSaving(false);
    }
  };

  return (
    <div className="min-h-full bg-slate-100 px-4 py-6 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}

        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
              <Shield size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">
                Settings
              </h1>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Manage your profile, security and preferences.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">

          {/* Profile */}

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="border-b border-slate-200 px-5 py-5 dark:border-slate-800 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                  <User size={19} />
                </div>

                <div>
                  <h2 className="font-semibold">
                    Profile information
                  </h2>

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Update your personal information.
                  </p>
                </div>
              </div>
            </div>

            {profileLoading ? (
              <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
                <div className="h-11 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800" />
                <div className="h-11 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800" />
                <div className="h-11 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800 sm:col-span-2" />
              </div>
            ) : (
              <form
                onSubmit={handleProfileSubmit}
                className="p-5 sm:p-6"
              >
                <div className="grid gap-5 sm:grid-cols-2">

                  <div>
                    <label
                      htmlFor="firstName"
                      className="mb-2 block text-sm font-medium"
                    >
                      First name
                    </label>

                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={profile.firstName}
                      onChange={handleProfileChange}
                      maxLength={50}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="mb-2 block text-sm font-medium"
                    >
                      Last name
                    </label>

                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={profile.lastName}
                      onChange={handleProfileChange}
                      maxLength={50}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium"
                    >
                      Email address
                    </label>

                    <input
                      id="email"
                      type="email"
                      value={profile.email}
                      readOnly
                      className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
                    />

                    <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
                      Email address cannot be changed from settings.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    disabled={profileSaving}
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Save size={17} />

                    {profileSaving
                      ? "Saving..."
                      : "Save changes"}
                  </button>
                </div>
              </form>
            )}
          </section>

          {/* Security */}

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="border-b border-slate-200 px-5 py-5 dark:border-slate-800 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                  <Lock size={19} />
                </div>

                <div>
                  <h2 className="font-semibold">
                    Security
                  </h2>

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Keep your account secure.
                  </p>
                </div>
              </div>
            </div>

            <form
              onSubmit={handlePasswordSubmit}
              className="p-5 sm:p-6"
            >
              <div className="grid gap-5 sm:grid-cols-2">

                <div className="sm:col-span-2">
                  <label
                    htmlFor="currentPassword"
                    className="mb-2 block text-sm font-medium"
                  >
                    Current password
                  </label>

                  <input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    value={password.currentPassword}
                    onChange={handlePasswordChange}
                    autoComplete="current-password"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950"
                  />
                </div>

                <div>
                  <label
                    htmlFor="newPassword"
                    className="mb-2 block text-sm font-medium"
                  >
                    New password
                  </label>

                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={password.newPassword}
                    onChange={handlePasswordChange}
                    autoComplete="new-password"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950"
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-medium"
                  >
                    Confirm new password
                  </label>

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={password.confirmPassword}
                    onChange={handlePasswordChange}
                    autoComplete="new-password"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  disabled={passwordSaving}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                >
                  <Lock size={17} />

                  {passwordSaving
                    ? "Updating..."
                    : "Change password"}
                </button>
              </div>
            </form>
          </section>

          {/* Appearance */}

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="border-b border-slate-200 px-5 py-5 dark:border-slate-800 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                  {darkMode ? (
                    <Moon size={19} />
                  ) : (
                    <Sun size={19} />
                  )}
                </div>

                <div>
                  <h2 className="font-semibold">
                    Appearance
                  </h2>

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Customize how SkillForge looks.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <p className="font-medium">
                  Dark mode
                </p>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {darkMode
                    ? "Dark theme is currently enabled."
                    : "Light theme is currently enabled."}
                </p>
              </div>

              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle dark mode"
                aria-pressed={darkMode}
                className={`relative h-7 w-12 shrink-0 rounded-full transition ${
                  darkMode
                    ? "bg-indigo-600"
                    : "bg-slate-300"
                }`}
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition ${
                    darkMode
                      ? "left-6"
                      : "left-1"
                  }`}
                />

                <span className="sr-only">
                  Toggle dark mode
                </span>
              </button>
            </div>
          </section>

          {/* Notifications */}

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="border-b border-slate-200 px-5 py-5 dark:border-slate-800 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <Bell size={19} />
                </div>

                <div>
                  <h2 className="font-semibold">
                    Notifications
                  </h2>

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Manage your SkillForge notifications.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-6">
              <div className="flex items-start gap-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-500/20 dark:bg-emerald-500/5">
                <div className="mt-0.5 text-emerald-600 dark:text-emerald-400">
                  <Check size={18} />
                </div>

                <div>
                  <p className="font-medium text-emerald-900 dark:text-emerald-300">
                    Notifications are enabled
                  </p>

                  <p className="mt-1 text-sm leading-6 text-emerald-700 dark:text-emerald-400">
                    SkillForge will show learning progress and
                    system notifications in your notification center.
                  </p>
                </div>
              </div>

              <p className="mt-4 text-xs text-slate-400 dark:text-slate-500">
                Advanced email and push notification preferences
                will be available when their backend preference
                APIs are introduced.
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default SettingsPage;