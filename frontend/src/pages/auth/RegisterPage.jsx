import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Sparkles,
    Eye,
    EyeOff,
} from "lucide-react";

import { register } from "../../services/authService";

const RegisterPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

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

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            await register({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
            });

            toast.success("Account created successfully!");

            navigate("/login", {
                replace: true,
            });
        } catch (error) {
            setError(
                error.response?.data?.message ||
                    "Registration failed."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="
                relative
                flex
                min-h-screen
                items-center
                justify-center
                overflow-hidden
                bg-gradient-to-br
                from-slate-950
                via-blue-950
                to-indigo-950
                px-4
                py-6
                sm:py-10
            "
        >
            {/* Background Glow */}
            <div
                className="
                    absolute
                    -left-40
                    top-0
                    h-96
                    w-96
                    rounded-full
                    bg-blue-500/20
                    blur-3xl
                    animate-pulse
                "
            />

            <div
                className="
                    absolute
                    -right-32
                    bottom-0
                    h-96
                    w-96
                    rounded-full
                    bg-violet-500/20
                    blur-3xl
                "
            />

            <motion.div
                initial={{
                    opacity: 0,
                    y: 30,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.5,
                }}
                className="
                    relative
                    w-full
                    max-w-lg
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/10
                    p-5
                    shadow-2xl
                    backdrop-blur-xl
                    sm:p-8
                    lg:p-10
                "
            >
                {/* Logo */}
                <div className="mb-5 flex justify-center">
                    <div
                        className="
                            flex
                            h-16
                            w-16
                            items-center
                            justify-center
                            rounded-2xl
                            bg-gradient-to-r
                            from-blue-600
                            to-violet-600
                            shadow-lg
                            shadow-blue-900/20
                        "
                    >
                        <Sparkles
                            className="text-white"
                            size={32}
                        />
                    </div>
                </div>

                {/* Heading */}
                <h1
                    className="
                        text-center
                        text-3xl
                        font-black
                        bg-gradient-to-r
                        from-blue-400
                        to-violet-400
                        bg-clip-text
                        text-transparent
                        sm:text-4xl
                    "
                >
                    Create Account
                </h1>

                <p
                    className="
                        mt-3
                        mb-7
                        text-center
                        text-sm
                        leading-6
                        text-slate-300
                        sm:mb-8
                        sm:text-base
                    "
                >
                    Build your AI-powered learning journey
                </p>

                {/* Error */}
                {error && (
                    <div
                        className="
                            mb-5
                            rounded-xl
                            border
                            border-red-400/30
                            bg-red-500/20
                            px-4
                            py-3
                            text-center
                            text-sm
                            text-red-200
                        "
                    >
                        {error}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    {/* Name */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="
                                w-full
                                rounded-xl
                                border
                                border-slate-600
                                bg-slate-900/60
                                px-4
                                py-3
                                text-sm
                                text-white
                                placeholder:text-slate-400
                                outline-none
                                transition
                                focus:border-blue-500
                                focus:ring-4
                                focus:ring-blue-500/20
                            "
                            required
                            minLength={2}
                            maxLength={50}
                            autoComplete="given-name"
                        />

                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="
                                w-full
                                rounded-xl
                                border
                                border-slate-600
                                bg-slate-900/60
                                px-4
                                py-3
                                text-sm
                                text-white
                                placeholder:text-slate-400
                                outline-none
                                transition
                                focus:border-blue-500
                                focus:ring-4
                                focus:ring-blue-500/20
                            "
                            required
                            minLength={2}
                            maxLength={50}
                            autoComplete="family-name"
                        />
                    </div>

                    {/* Email */}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        className="
                            w-full
                            rounded-xl
                            border
                            border-slate-600
                            bg-slate-900/60
                            px-4
                            py-3
                            text-sm
                            text-white
                            placeholder:text-slate-400
                            outline-none
                            transition
                            focus:border-blue-500
                            focus:ring-4
                            focus:ring-blue-500/20
                        "
                        required
                        autoComplete="email"
                    />

                    {/* Password */}
                    <div>
                        <div className="relative">
                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-slate-600
                                    bg-slate-900/60
                                    px-4
                                    py-3
                                    pr-12
                                    text-sm
                                    text-white
                                    placeholder:text-slate-400
                                    outline-none
                                    transition
                                    focus:border-blue-500
                                    focus:ring-4
                                    focus:ring-blue-500/20
                                "
                                required
                                minLength={8}
                                autoComplete="new-password"
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
                                className="
                                    absolute
                                    right-2.5
                                    top-1/2
                                    flex
                                    h-9
                                    w-9
                                    -translate-y-1/2
                                    items-center
                                    justify-center
                                    rounded-lg
                                    text-slate-400
                                    transition
                                    hover:bg-white/10
                                    hover:text-white
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-blue-500/40
                                "
                            >
                                {showPassword ? (
                                    <EyeOff
                                        size={19}
                                        strokeWidth={2}
                                    />
                                ) : (
                                    <Eye
                                        size={19}
                                        strokeWidth={2}
                                    />
                                )}
                            </button>
                        </div>

                        {formData.password && (
                            <p
                                className="
                                    mt-2
                                    text-xs
                                    text-slate-400
                                "
                            >
                                Password Length:{" "}
                                {formData.password.length}/8
                            </p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <div className="relative">
                            <input
                                type={
                                    showConfirmPassword
                                        ? "text"
                                        : "password"
                                }
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={
                                    formData.confirmPassword
                                }
                                onChange={handleChange}
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-slate-600
                                    bg-slate-900/60
                                    px-4
                                    py-3
                                    pr-12
                                    text-sm
                                    text-white
                                    placeholder:text-slate-400
                                    outline-none
                                    transition
                                    focus:border-blue-500
                                    focus:ring-4
                                    focus:ring-blue-500/20
                                "
                                required
                                minLength={8}
                                autoComplete="new-password"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(
                                        (previous) =>
                                            !previous
                                    )
                                }
                                aria-label={
                                    showConfirmPassword
                                        ? "Hide confirm password"
                                        : "Show confirm password"
                                }
                                className="
                                    absolute
                                    right-2.5
                                    top-1/2
                                    flex
                                    h-9
                                    w-9
                                    -translate-y-1/2
                                    items-center
                                    justify-center
                                    rounded-lg
                                    text-slate-400
                                    transition
                                    hover:bg-white/10
                                    hover:text-white
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-blue-500/40
                                "
                            >
                                {showConfirmPassword ? (
                                    <EyeOff
                                        size={19}
                                        strokeWidth={2}
                                    />
                                ) : (
                                    <Eye
                                        size={19}
                                        strokeWidth={2}
                                    />
                                )}
                            </button>
                        </div>

                        {formData.confirmPassword &&
                            formData.password !==
                                formData.confirmPassword && (
                                <p
                                    className="
                                        mt-2
                                        text-sm
                                        text-red-400
                                    "
                                >
                                    Passwords do not match
                                </p>
                            )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            w-full
                            rounded-xl
                            bg-gradient-to-r
                            from-blue-600
                            to-indigo-600
                            py-3
                            text-sm
                            font-semibold
                            text-white
                            transition
                            duration-300
                            hover:scale-[1.01]
                            hover:shadow-lg
                            hover:shadow-blue-900/20
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                            disabled:hover:scale-100
                        "
                    >
                        {loading
                            ? "Creating your account..."
                            : "Create Account"}
                    </button>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="border-t border-white/10" />

                        <span
                            className="
                                absolute
                                left-1/2
                                top-0
                                -translate-x-1/2
                                -translate-y-1/2
                                bg-slate-900
                                px-3
                                text-xs
                                text-slate-400
                            "
                        >
                            OR
                        </span>
                    </div>

                    {/* Login */}
                    <div className="text-center">
                        <p className="text-sm text-slate-300">
                            Already have an account?{" "}
                            <button
                                type="button"
                                onClick={() =>
                                    navigate("/login")
                                }
                                className="
                                    font-semibold
                                    text-blue-400
                                    transition
                                    hover:text-blue-300
                                    hover:underline
                                "
                            >
                                Sign In
                            </button>
                        </p>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default RegisterPage;