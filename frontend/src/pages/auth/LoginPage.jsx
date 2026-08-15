import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Loader2 } from "lucide-react";

import { login } from "../../services/authService";
import { useAuth } from "../../contexts/AuthContext";

const LoginPage = () => {
    const navigate = useNavigate();
    const { signIn } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (event) => {

        setFormData((previous) => ({
            ...previous,
            [event.target.name]: event.target.value
        }));

        if (error) {
            setError("");
        }
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        setLoading(true);
        setError("");

        try {

            await login(formData);

            signIn();

            navigate("/dashboard", {
                replace: true
            });

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Invalid email or password."
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
"
        >

            <div
                className="
absolute
-left-40
-top-0
h-96
w-96
rounded-full
bg-blue-500/20
blur-3xl
"
            />

            <div
                className="
absolute
-right-32
-bottom-0
h-96
w-96
rounded-full
bg-violet-500/20
blur-3xl
"
            />

            <div
                className="
relative
w-full
max-w-md
rounded-3xl
border
border-white/10
bg-white/10
p-10
backdrop-blur-xl
shadow-2xl
transition-all
duration-300
hover:-translate-y-1
hover:shadow-blue-500/20
"
            >

                <div className="mb-5 flex justify-center">

                    <div
                        className="
rounded-2xl
bg-gradient-to-r
from-blue-600
to-violet-600
p-4
shadow-xl
"
                    >
                        <Sparkles
                            size={34}
                            className="text-white"
                        />
                    </div>

                </div>

                <h1
                    className="
text-center
text-5xl
font-black
bg-gradient-to-r
from-blue-400
to-violet-400
bg-clip-text
text-transparent
"
                >
                    SkillForge AI
                </h1>

                <p className="mt-3 mb-8 text-center text-slate-300">
                    Sign in to continue
                </p>

                {error && (

                    <div
                        className="
mb-5
rounded-xl
border
border-red-400/30
bg-red-500/20
p-3
text-center
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

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="
w-full
rounded-xl
border
border-slate-600
bg-slate-900/60
px-4
py-3
text-white
placeholder:text-slate-400
outline-none
transition-all
focus:border-blue-500
focus:ring-4
focus:ring-blue-500/20
"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="
w-full
rounded-xl
border
border-slate-600
bg-slate-900/60
px-4
py-3
text-white
placeholder:text-slate-400
outline-none
transition-all
focus:border-blue-500
focus:ring-4
focus:ring-blue-500/20
"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="
flex
w-full
items-center
justify-center
gap-2
rounded-xl
bg-gradient-to-r
from-blue-600
to-violet-600
py-3
font-semibold
text-white
transition-all
duration-300
hover:scale-[1.02]
hover:shadow-xl
disabled:cursor-not-allowed
disabled:opacity-60
"
                    >

                        {loading && (
                            <Loader2
                                size={18}
                                className="animate-spin"
                            />
                        )}

                        {loading
                            ? "Signing In..."
                            : "Login"}

                    </button>

                </form>

                <div className="mt-7 text-center">

                    <p className="text-sm text-slate-300">

                        Don't have an account?{" "}

                        <button
                            type="button"
                            onClick={() => navigate("/register")}
                            className="
font-semibold
text-blue-400
transition
hover:text-blue-300
hover:underline
"
                        >
                            Create Account
                        </button>

                    </p>

                </div>

                <div className="mt-3 text-center">

                    <button
                        type="button"
                        className="
text-sm
text-slate-400
transition
hover:text-white
"
                    >
                        Forgot Password?
                    </button>

                </div>

            </div>

        </div>

    );

};

export default LoginPage;