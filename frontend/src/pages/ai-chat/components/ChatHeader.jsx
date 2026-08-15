import {
    Menu,
    Bot,
    Sparkles
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../../contexts/ThemeContext";

const ChatHeader = ({ onMenuClick }) => {

    const navigate = useNavigate();
    const { signOut } = useAuth();
    const { dark, toggleTheme } = useTheme();

    const handleLogout = () => {
        signOut();
        navigate("/login", { replace: true });
    };

    return (

        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:px-6 md:py-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">

            <div className="flex items-center gap-4">

                <button
                    onClick={onMenuClick}
                    className="
rounded-xl
p-2
transition
hover:bg-slate-100
dark:hover:bg-slate-800
lg:hidden
"
                >
                    <Menu size={22} />
                </button>

                <div className="flex items-center gap-3">

                    <div className="
rounded-2xl
bg-gradient-to-r
from-blue-600
to-indigo-600
p-2.5
text-white
shadow-md
">
                        <Bot size={22} />
                    </div>

                    <div>
                        <h2 className="font-semibold text-slate-900 dark:text-white">
                            SkillForge AI
                        </h2>

                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            AI Career Assistant
                        </p>
                    </div>

                </div>

            </div>

            <div className="flex items-center gap-3">

                <div className="hidden items-center gap-2 rounded-full bg-blue-50 dark:bg-slate-800 px-3 py-2 md:flex">

                    <Sparkles
                        size={16}
                        className="text-blue-600"
                    />

                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                        Gemini AI
                    </span>

                </div>

                <button
                    onClick={toggleTheme}
                    className="
rounded-xl
border
border-slate-300
p-2.5
transition
hover:bg-slate-100
hover:scale-105
dark:border-slate-700
dark:hover:bg-slate-800
"
                >
                    {
                        dark
                            ? <Sun size={18} />
                            : <Moon size={18} />
                    }
                </button>

                <button
                    onClick={handleLogout}
                    className="rounded-lg bg-gradient-to-r from-red-500 to-red-600 shadow hover:shadow-lg hover:scale-105 px-4 py-2 text-white transition hover:bg-red-700"
                >
                    Logout
                </button>

            </div>

        </header>

    );
};

export default ChatHeader;