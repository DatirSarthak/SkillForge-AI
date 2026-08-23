import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Mail,
  User,
  Save,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import userService from "../../services/userService";

const ProfilePage = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await userService.getProfile();

        const data = response?.data ?? response;

        setProfile({
          firstName: data?.firstName ?? "",
          lastName: data?.lastName ?? "",
          email: data?.email ?? "",
        });
      } catch (error) {
        console.error("Failed to load profile:", error);
        toast.error("Failed to load profile.");
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProfile((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!profile.firstName.trim()) {
      toast.error("First name is required.");
      return;
    }

    if (!profile.lastName.trim()) {
      toast.error("Last name is required.");
      return;
    }

    try {
      setIsSaving(true);

      await userService.updateProfile({
        firstName: profile.firstName.trim(),
        lastName: profile.lastName.trim(),
      });

      toast.success("Profile updated successfully.");
    } catch (error) {
      console.error("Failed to update profile:", error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to update profile."
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 dark:bg-slate-950">
        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
          <Loader2
            className="animate-spin"
            size={22}
          />

          <span className="font-medium">
            Loading profile...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        min-h-screen
        overflow-x-hidden
        bg-slate-100
        px-3
        py-4
        transition-colors
        duration-300
        sm:px-6
        sm:py-6
        lg:px-8
        lg:py-8
        dark:bg-slate-950
      "
    >
      <div className="mx-auto w-full max-w-4xl">

        {/* Page Header */}
        <div
          className="
            mb-5
            flex
            flex-col
            gap-4
            sm:mb-6
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400 sm:text-sm">
              Account
            </p>

            <h1 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
              Profile
            </h1>

            <p className="mt-1 max-w-md text-sm leading-5 text-slate-500 dark:text-slate-400">
              Manage your personal information.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="
              inline-flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              py-3
              text-sm
              font-semibold
              text-slate-700
              shadow-sm
              transition
              hover:bg-slate-50
              active:scale-[0.98]
              sm:w-auto
              dark:border-slate-700
              dark:bg-slate-900
              dark:text-slate-200
              dark:hover:bg-slate-800
            "
          >
            <ArrowLeft size={17} />
            Dashboard
          </button>
        </div>

        {/* Profile Card */}
        <div
          className="
            overflow-hidden
            rounded-2xl
            border
            border-slate-200
            bg-white
            shadow-sm
            sm:rounded-3xl
            dark:border-slate-800
            dark:bg-slate-900
          "
        >

          {/* Card Header */}
          <div
            className="
              border-b
              border-slate-100
              px-4
              py-5
              sm:px-8
              sm:py-6
              dark:border-slate-800
            "
          >
            <div className="flex items-center gap-3 sm:gap-4">

              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-indigo-100
                  text-indigo-600
                  sm:h-14
                  sm:w-14
                  sm:rounded-2xl
                  dark:bg-indigo-500/10
                  dark:text-indigo-400
                "
              >
                <User
                  size={22}
                  className="sm:h-[25px] sm:w-[25px]"
                />
              </div>

              <div className="min-w-0">
                <h2 className="text-base font-bold text-slate-900 sm:text-lg dark:text-white">
                  Personal Information
                </h2>

                <p className="mt-0.5 text-xs leading-5 text-slate-500 sm:text-sm dark:text-slate-400">
                  Update your name and account information.
                </p>
              </div>

            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="p-4 sm:p-8"
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              {/* First Name */}
              <div>
                <label
                  htmlFor="firstName"
                  className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-slate-700
                    dark:text-slate-200
                  "
                >
                  First name
                </label>

                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={profile.firstName}
                  onChange={handleChange}
                  autoComplete="given-name"
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    px-4
                    py-3
                    text-sm
                    text-slate-900
                    outline-none
                    transition
                    placeholder:text-slate-400
                    focus:border-indigo-500
                    focus:ring-4
                    focus:ring-indigo-500/10
                    dark:border-slate-700
                    dark:bg-slate-950
                    dark:text-white
                  "
                />
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor="lastName"
                  className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-slate-700
                    dark:text-slate-200
                  "
                >
                  Last name
                </label>

                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={profile.lastName}
                  onChange={handleChange}
                  autoComplete="family-name"
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    px-4
                    py-3
                    text-sm
                    text-slate-900
                    outline-none
                    transition
                    placeholder:text-slate-400
                    focus:border-indigo-500
                    focus:ring-4
                    focus:ring-indigo-500/10
                    dark:border-slate-700
                    dark:bg-slate-950
                    dark:text-white
                  "
                />
              </div>

              {/* Email */}
              <div className="md:col-span-2">
                <label
                  htmlFor="email"
                  className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-slate-700
                    dark:text-slate-200
                  "
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                    "
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={profile.email}
                    disabled
                    readOnly
                    aria-describedby="email-help"
                    className="
                      w-full
                      cursor-not-allowed
                      rounded-xl
                      border
                      border-slate-200
                      bg-slate-50
                      py-3
                      pl-11
                      pr-4
                      text-sm
                      text-slate-500
                      outline-none
                      dark:border-slate-700
                      dark:bg-slate-800
                      dark:text-slate-400
                    "
                  />
                </div>

                <p
                  id="email-help"
                  className="mt-2 text-xs leading-5 text-slate-400 dark:text-slate-500"
                >
                  Email address cannot be changed from your profile.
                </p>
              </div>
            </div>

            {/* Security Information */}
            <div
              className="
                mt-6
                flex
                items-start
                gap-3
                rounded-2xl
                border
                border-emerald-200
                bg-emerald-50
                p-3.5
                sm:mt-7
                sm:p-4
                dark:border-emerald-500/20
                dark:bg-emerald-500/5
              "
            >
              <ShieldCheck
                size={20}
                className="
                  mt-0.5
                  shrink-0
                  text-emerald-600
                  dark:text-emerald-400
                "
              />

              <div className="min-w-0">
                <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                  Account information protected
                </p>

                <p className="mt-1 text-xs leading-5 text-emerald-700 dark:text-emerald-400">
                  Your email address is protected and cannot be changed from
                  this page.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 sm:mt-7 sm:flex sm:justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="
                  inline-flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-indigo-600
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  shadow-sm
                  transition
                  hover:bg-indigo-700
                  active:scale-[0.98]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  sm:w-auto
                "
              >
                {isSaving ? (
                  <>
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={17} />
                    Save changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Bottom spacing on mobile */}
        <div className="h-2 sm:h-0" />
      </div>
    </div>
  );
};

export default ProfilePage;