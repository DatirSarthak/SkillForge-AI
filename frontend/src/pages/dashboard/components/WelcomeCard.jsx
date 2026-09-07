import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WelcomeCard = ({ user }) => {
  const navigate = useNavigate();

  const handleContinueLearning = () => {
    navigate("/ai-roadmap");
  };

  return (
    <div
      className="
relative
overflow-hidden
rounded-3xl
bg-gradient-to-r
from-blue-600
via-indigo-600
to-violet-600
p-8
text-white
shadow-xl
"
    >
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

      <div className="relative z-10 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles size={20} />

            <span className="text-sm font-semibold uppercase tracking-wider">
              SkillForge AI
            </span>
          </div>

          <h2 className="mt-4 text-4xl font-bold">
            Welcome Back,
          </h2>

          <h3 className="mt-2 text-3xl font-black">
            {user?.firstName} {user?.lastName}
          </h3>

          <p className="mt-3 text-blue-100">
            {user?.email}
          </p>

          <p className="mt-6 max-w-xl text-blue-100">
            Continue your AI-powered learning journey.
            Learn faster, practice smarter and
            build your career with SkillForge AI.
          </p>
        </div>

        <button
          type="button"
          onClick={handleContinueLearning}
          className="
hidden
md:flex
items-center
gap-2
rounded-2xl
bg-white
px-6
py-3
font-semibold
text-blue-700
transition
hover:scale-105
"
        >
          Continue Learning

          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default WelcomeCard;