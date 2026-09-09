import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    ArrowRight,
    BookOpen,
    Eye,
    EyeOff,
    LockKeyhole,
    Mail,
    Rocket,
    ShieldCheck,
    Sparkles,
    Trophy,
    User,
    UserPlus,
    X,
} from "lucide-react";
import toast from "react-hot-toast";

import { useAuth } from "../../contexts/AuthContext";

const LoginPage = () => {
    const navigate = useNavigate();
    const { login, signOut } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loginMode, setLoginMode] = useState("USER");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (event) => {
        setFormData((previous) => ({
            ...previous,
            [event.target.name]: event.target.value,
        }));

        if (error) {
            setError("");
        }
    };

    const handleModeChange = (mode) => {
        if (loading) return;

        setLoginMode(mode);
        setError("");
    };

    const clearEmail = () => {
        setFormData((previous) => ({
            ...previous,
            email: "",
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (loading) return;

        setLoading(true);
        setError("");

        try {
            const response = await login(formData);

            if (!response?.success || !response?.data) {
                setError(
                    response?.message ||
                        "Unable to sign in. Please try again."
                );
                return;
            }

            const authenticatedUser = response.data.user;

            if (!authenticatedUser) {
                setError(
                    "Login succeeded, but user information was not returned."
                );

                signOut();
                return;
            }

            const actualRole = authenticatedUser.role;

            /*
             * The selected login mode is only a UX-level entry point.
             * Backend authentication and authorization remain authoritative.
             *
             * USER mode  -> USER role only
             * ADMIN mode -> ADMIN role only
             */

            if (
                loginMode === "USER" &&
                actualRole !== "USER"
            ) {
                signOut();

                const message =
                    "This account is not a regular user account.";

                setError(message);
                toast.error(message);
                return;
            }

            if (
                loginMode === "ADMIN" &&
                actualRole !== "ADMIN"
            ) {
                signOut();

                const message =
                    "Admin access is available only for administrator accounts.";

                setError(message);
                toast.error(message);
                return;
            }

            if (actualRole === "ADMIN") {
                navigate("/admin", {
                    replace: true,
                });

                return;
            }

            navigate("/dashboard", {
                replace: true,
            });
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                "Invalid email or password.";

            setError(message);
        } finally {
            setLoading(false);
        }
    };

    const isAdminMode = loginMode === "ADMIN";

    return (
        <main className="relative h-screen overflow-hidden bg-[#050816] text-white">
            {/* ================= BACKGROUND ================= */}

            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -left-40 -top-52 h-[30rem] w-[30rem] rounded-full bg-blue-600/15 blur-3xl" />

                <div className="absolute -right-48 -top-40 h-[36rem] w-[36rem] rounded-full bg-violet-600/15 blur-3xl" />

                <div className="absolute -bottom-56 -left-40 h-[34rem] w-[34rem] rounded-full border border-violet-500/15 bg-violet-700/10 blur-2xl" />

                <div className="absolute -bottom-48 -right-40 h-[30rem] w-[30rem] rounded-full bg-purple-700/10 blur-3xl" />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(79,70,229,0.08),transparent_40%)]" />
            </div>

            {/* ================= HEADER ================= */}

            <header className="relative z-20 flex h-[68px] items-center justify-between px-5 sm:px-8 lg:px-12">
                {/* Logo */}

                <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="group flex items-center gap-2.5 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                    aria-label="Go to SkillForge AI home page"
                >
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 shadow-lg shadow-violet-600/20">
                        <Sparkles
                            size={19}
                            className="text-white"
                        />
                    </span>

                    <span className="text-lg font-bold tracking-tight">
                        SkillForge{" "}
                        <span className="text-violet-400">
                            AI
                        </span>
                    </span>
                </button>

                {/* Navigation */}

                <div className="hidden items-center gap-7 text-sm text-slate-500 md:flex">
                    <span>Learn</span>
                    <span>Build</span>
                    <span>Grow</span>
                    <span>Together</span>
                </div>

                {/* Right */}

                <div className="flex items-center gap-2 sm:gap-3">

                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="flex items-center gap-1.5 rounded-xl px-2 py-2 text-sm font-medium text-slate-400 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                    >
                        <ArrowLeft size={16} />

                        <span className="hidden sm:inline">
                            Back to Home
                        </span>

                        <span className="sm:hidden">
                            Home
                        </span>
                    </button>
                </div>
            </header>

            {/* ================= MAIN ================= */}

            <section className="relative z-10 mx-auto flex h-[calc(100vh-68px)] w-full max-w-[1400px] items-center px-5 pb-5 pt-5 sm:px-8 lg:px-12">
                <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_440px] lg:gap-14 xl:grid-cols-[1.05fr_440px]">
                    {/* ================= HERO ================= */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            x: -20,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                        }}
                        transition={{
                            duration: 0.5,
                        }}
                        className="hidden lg:block"
                    >
                        {/* Badge */}

                        <div className="mb-5 inline-flex rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-1.5 text-xs font-medium tracking-wide text-violet-200">
                            AI-powered

                            <span className="mx-2 text-violet-500">
                                •
                            </span>

                            Career-focused

                            <span className="mx-2 text-violet-500">
                                •
                            </span>

                            Future-ready
                        </div>

                        {/* Heading */}

                        <h1 className="max-w-[680px] text-[56px] font-black leading-[0.98] tracking-[-0.045em] xl:text-[64px]">
                            Build Your

                            <span className="block bg-gradient-to-r from-blue-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                                Better Tomorrow
                            </span>
                        </h1>

                        {/* Description */}

                        <p className="mt-5 max-w-[590px] text-base leading-7 text-slate-400">
                            SkillForge AI helps you learn
                            in-demand skills, get AI career
                            guidance, and achieve your goals —
                            all in one powerful platform.
                        </p>

                        {/* Features */}

                        <div className="mt-7 space-y-3.5">
                            <FeatureItem
                                icon={BookOpen}
                                title="Learn"
                                description="Master in-demand skills with AI"
                            />

                            <FeatureItem
                                icon={Rocket}
                                title="Build"
                                description="Create real-world projects"
                            />

                            <FeatureItem
                                icon={Trophy}
                                title="Grow"
                                description="Unlock better career opportunities"
                            />
                        </div>

                        {/* Slogan */}

                        <div className="mt-7 select-none font-serif text-xl italic leading-6 text-violet-400/75">
                            <span className="block">
                                Same People.
                            </span>

                            <span className="block pl-6">
                                Bigger Possibilities.
                            </span>
                        </div>
                    </motion.div>

                    {/* ================= LOGIN CARD ================= */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 15,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.5,
                            delay: 0.05,
                        }}
                        className="mx-auto w-full max-w-[440px]"
                    >
                        <div className="rounded-[26px] border border-violet-400/20 bg-[#080b1b]/90 p-5 shadow-2xl shadow-violet-950/40 backdrop-blur-xl sm:p-6">
                            {/* Icon */}

                            <div
                                className={`mx-auto flex h-[62px] w-[62px] items-center justify-center rounded-[19px] bg-gradient-to-br ${
                                    isAdminMode
                                        ? "from-violet-600 via-purple-600 to-fuchsia-600"
                                        : "from-blue-500 via-violet-600 to-fuchsia-600"
                                } shadow-lg shadow-violet-600/25`}
                            >
                                {isAdminMode ? (
                                    <ShieldCheck
                                        size={29}
                                        className="text-white"
                                    />
                                ) : (
                                    <Sparkles
                                        size={29}
                                        className="text-white"
                                    />
                                )}
                            </div>

                            {/* Heading */}

                            <div className="mt-3.5 text-center">
                                <h2 className="text-[28px] font-bold tracking-tight">
                                    {isAdminMode
                                        ? "Admin Login"
                                        : "Welcome Back"}
                                </h2>

                                <p className="mt-1 text-xs text-slate-500">
                                    {isAdminMode
                                        ? "Sign in to manage SkillForge AI"
                                        : "Sign in to your SkillForge AI account"}
                                </p>
                            </div>

                            {/* ================= LOGIN MODE ================= */}

                            <div className="mt-5 rounded-xl border border-slate-800 bg-[#0c1225] p-1">
                                <div
                                    role="tablist"
                                    aria-label="Login type"
                                    className="grid grid-cols-2 gap-1"
                                >
                                    <button
                                        type="button"
                                        role="tab"
                                        aria-selected={
                                            loginMode === "USER"
                                        }
                                        disabled={loading}
                                        onClick={() =>
                                            handleModeChange("USER")
                                        }
                                        className={`flex h-10 items-center justify-center gap-2 rounded-lg px-3 text-xs font-semibold transition ${
                                            loginMode === "USER"
                                                ? "bg-white text-slate-900 shadow-sm"
                                                : "text-slate-500 hover:bg-white/5 hover:text-slate-200"
                                        } disabled:cursor-not-allowed disabled:opacity-60`}
                                    >
                                        <User size={15} />

                                        User Login
                                    </button>

                                    <button
                                        type="button"
                                        role="tab"
                                        aria-selected={
                                            loginMode === "ADMIN"
                                        }
                                        disabled={loading}
                                        onClick={() =>
                                            handleModeChange("ADMIN")
                                        }
                                        className={`flex h-10 items-center justify-center gap-2 rounded-lg px-3 text-xs font-semibold transition ${
                                            loginMode === "ADMIN"
                                                ? "bg-white text-slate-900 shadow-sm"
                                                : "text-slate-500 hover:bg-white/5 hover:text-slate-200"
                                        } disabled:cursor-not-allowed disabled:opacity-60`}
                                    >
                                        <ShieldCheck size={15} />

                                        Admin Login
                                    </button>
                                </div>
                            </div>

                            {/* Mode hint */}

                            <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-slate-500">
                                {isAdminMode ? (
                                    <>
                                        <ShieldCheck
                                            size={13}
                                            className="text-violet-400"
                                        />

                                        Administrator access only
                                    </>
                                ) : (
                                    <>
                                        <User
                                            size={13}
                                            className="text-blue-400"
                                        />

                                        Regular user account access
                                    </>
                                )}
                            </div>

                            {/* Error */}

                            {error && (
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        y: -5,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    className="mt-4 rounded-xl border border-red-400/20 bg-red-500/10 px-3.5 py-2.5 text-xs leading-5 text-red-200"
                                    role="alert"
                                >
                                    {error}
                                </motion.div>
                            )}

                            {/* Form */}

                            <form
                                onSubmit={handleSubmit}
                                className="mt-5 space-y-3"
                            >
                                {/* Email */}

                                <div className="relative">
                                    <label
                                        htmlFor="email"
                                        className="sr-only"
                                    >
                                        Email address
                                    </label>

                                    <Mail
                                        size={18}
                                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                                    />

                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder={
                                            isAdminMode
                                                ? "Admin Email Address"
                                                : "Email Address"
                                        }
                                        value={formData.email}
                                        onChange={handleChange}
                                        autoComplete="email"
                                        required
                                        className="h-[52px] w-full rounded-xl border border-slate-800 bg-[#0c1225] pl-11 pr-11 text-sm text-white outline-none transition placeholder:text-slate-600 hover:border-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                                    />

                                    {formData.email && (
                                        <button
                                            type="button"
                                            onClick={clearEmail}
                                            aria-label="Clear email address"
                                            className="absolute right-2.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/5 hover:text-white"
                                        >
                                            <X size={16} />
                                        </button>
                                    )}
                                </div>

                                {/* Password */}

                                <div className="relative">
                                    <label
                                        htmlFor="password"
                                        className="sr-only"
                                    >
                                        Password
                                    </label>

                                    <LockKeyhole
                                        size={18}
                                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                                    />

                                    <input
                                        id="password"
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        name="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        autoComplete="current-password"
                                        required
                                        className="h-[52px] w-full rounded-xl border border-slate-800 bg-[#0c1225] pl-11 pr-11 text-sm text-white outline-none transition placeholder:text-slate-600 hover:border-slate-700 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(
                                                (previous) =>
                                                    !previous
                                            )
                                        }
                                        aria-label={
                                            showPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                        className="absolute right-2.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/5 hover:text-white"
                                    >
                                        {showPassword ? (
                                            <EyeOff size={17} />
                                        ) : (
                                            <Eye size={17} />
                                        )}
                                    </button>
                                </div>

                                {/* Options */}

                                <div className="flex items-center justify-between px-1 py-0.5 text-xs">
                                    <label className="flex cursor-pointer items-center gap-2 text-slate-500">
                                        <input
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={(event) =>
                                                setRememberMe(
                                                    event.target
                                                        .checked
                                                )
                                            }
                                            className="h-3.5 w-3.5 accent-violet-600"
                                        />

                                        Remember me
                                    </label>

                                </div>

                                {/* Login */}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`group flex h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r ${
                                        isAdminMode
                                            ? "from-violet-600 via-purple-600 to-fuchsia-600 shadow-violet-900/25 hover:shadow-violet-900/35"
                                            : "from-violet-600 via-purple-600 to-blue-600 shadow-violet-900/25 hover:shadow-violet-900/35"
                                    } text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 disabled:cursor-not-allowed disabled:opacity-60`}
                                >
                                    {loading
                                        ? "Signing In..."
                                        : isAdminMode
                                        ? "Login as Admin"
                                        : "Login"}

                                    {!loading && (
                                        <ArrowRight
                                            size={18}
                                            className="transition-transform duration-200 group-hover:translate-x-1"
                                        />
                                    )}
                                </button>
                            </form>

                            {/* Divider */}

                            <div className="my-5 flex items-center gap-3">
                                <span className="h-px flex-1 bg-slate-800" />

                                <span className="text-[11px] text-slate-600">
                                    Don&apos;t have an account?
                                </span>

                                <span className="h-px flex-1 bg-slate-800" />
                            </div>

                            {/* Register */}

                            <button
                                type="button"
                                onClick={() =>
                                    navigate("/register")
                                }
                                className="flex h-[48px] w-full items-center justify-center gap-2 rounded-xl border border-violet-500/50 bg-violet-500/[0.04] text-sm font-semibold text-violet-200 transition hover:border-violet-400 hover:bg-violet-500/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                            >
                                <UserPlus size={17} />

                                Create Account
                            </button>

                            {/* Footer */}

                            <p className="mt-4 text-center text-[11px] text-slate-600">
                                Same People. Bigger Possibilities. ✨
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
};

const FeatureItem = ({
    icon: Icon,
    title,
    description,
}) => (
    <div className="flex items-center gap-3.5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-400/15 bg-violet-500/10 text-violet-300">
            <Icon size={19} />
        </div>

        <div>
            <h3 className="text-sm font-semibold text-white">
                {title}
            </h3>

            <p className="mt-0.5 text-xs text-slate-500">
                {description}
            </p>
        </div>
    </div>
);

export default LoginPage;