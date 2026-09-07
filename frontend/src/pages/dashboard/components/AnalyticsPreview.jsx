import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {
    BarChart3,
    MessageSquare,
    FileText,
    Trophy,
    Target,
    Map,
    ArrowRight,
} from "lucide-react";

const AnalyticsPreview = ({
    analytics,
    loading = false,
    error = false,
}) => {
    const navigate = useNavigate();

    const handleViewAnalytics = () => {
        navigate("/analytics");
    };

    if (loading) {
        return (
            <section
                className="
                    rounded-2xl
                    border
                    border-gray-200
                    bg-white
                    p-5
                    shadow-sm
                    dark:border-gray-800
                    dark:bg-gray-900
                    sm:p-6
                "
            >
                <div className="animate-pulse">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-gray-200 dark:bg-gray-800" />

                            <div>
                                <div className="h-4 w-36 rounded bg-gray-200 dark:bg-gray-800" />
                                <div className="mt-2 h-3 w-48 rounded bg-gray-200 dark:bg-gray-800" />
                            </div>
                        </div>

                        <div className="h-9 w-28 rounded-lg bg-gray-200 dark:bg-gray-800" />
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                        {[1, 2, 3, 4, 5].map((item) => (
                            <div
                                key={item}
                                className="
                                    h-24
                                    rounded-xl
                                    bg-gray-100
                                    dark:bg-gray-800
                                "
                            />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section
                className="
                    rounded-2xl
                    border
                    border-gray-200
                    bg-white
                    p-5
                    shadow-sm
                    dark:border-gray-800
                    dark:bg-gray-900
                    sm:p-6
                "
            >
                <div className="flex items-center gap-3">
                    <div
                        className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                            bg-red-50
                            text-red-500
                            dark:bg-red-500/10
                        "
                    >
                        <BarChart3 size={19} />
                    </div>

                    <div>
                        <h2
                            className="
                                text-lg
                                font-semibold
                                text-gray-900
                                dark:text-white
                            "
                        >
                            Learning Analytics
                        </h2>

                        <p
                            className="
                                mt-0.5
                                text-sm
                                text-gray-500
                                dark:text-gray-400
                            "
                        >
                            Analytics are temporarily unavailable.
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleViewAnalytics}
                    className="
                        mt-5
                        inline-flex
                        items-center
                        gap-2
                        rounded-lg
                        border
                        border-gray-200
                        px-4
                        py-2
                        text-sm
                        font-medium
                        text-gray-700
                        transition
                        hover:bg-gray-50
                        dark:border-gray-700
                        dark:text-gray-200
                        dark:hover:bg-gray-800
                    "
                >
                    Open Analytics
                    <ArrowRight size={16} />
                </button>
            </section>
        );
    }

    const data = analytics?.data ?? analytics ?? {};

    const stats = [
        {
            label: "AI Conversations",
            value: data.chat?.totalConversations ?? 0,
            icon: MessageSquare,
            iconClass:
                "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
        },
        {
            label: "Notes Created",
            value: data.notes?.totalNotes ?? 0,
            icon: FileText,
            iconClass:
                "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
        },
        {
            label: "Quiz Attempts",
            value: data.quiz?.totalAttempts ?? 0,
            icon: Trophy,
            iconClass:
                "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
        },
        {
            label: "Average ATS",
            value: `${Number(
                data.resume?.averageAtsScore ?? 0
            ).toFixed(1)}%`,
            icon: Target,
            iconClass:
                "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400",
        },
        {
            label: "Roadmap Progress",
            value: `${Number(
                data.roadmap?.progressPercentage ?? 0
            ).toFixed(0)}%`,
            icon: Map,
            iconClass:
                "bg-pink-50 text-pink-600 dark:bg-pink-500/10 dark:text-pink-400",
        },
    ];

    return (
        <section
            className="
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-5
                shadow-sm
                transition-shadow
                hover:shadow-md
                dark:border-gray-800
                dark:bg-gray-900
                sm:p-6
            "
        >
            {/* Header */}
            <div
                className="
                    flex
                    flex-col
                    gap-4
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                "
            >
                <div className="flex items-center gap-3">
                    <div
                        className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-primary/10
                            text-primary
                        "
                    >
                        <BarChart3 size={19} />
                    </div>

                    <div>
                        <h2
                            className="
                                text-lg
                                font-semibold
                                text-gray-900
                                dark:text-white
                            "
                        >
                            Learning Analytics
                        </h2>

                        <p
                            className="
                                mt-0.5
                                text-sm
                                text-gray-500
                                dark:text-gray-400
                            "
                        >
                            Your learning performance at a glance.
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleViewAnalytics}
                    className="
                        group
                        inline-flex
                        w-fit
                        items-center
                        gap-2
                        rounded-lg
                        border
                        border-gray-200
                        px-3.5
                        py-2
                        text-sm
                        font-medium
                        text-gray-700
                        transition-all
                        duration-200
                        hover:border-primary/30
                        hover:bg-primary/5
                        hover:text-primary
                        dark:border-gray-700
                        dark:text-gray-200
                        dark:hover:bg-primary/10
                        dark:hover:text-primary
                    "
                >
                    View Analytics
                    <ArrowRight
                        size={16}
                        className="transition-transform group-hover:translate-x-0.5"
                    />
                </button>
            </div>

            {/* Stats */}
            <div
                className="
                    mt-6
                    grid
                    grid-cols-2
                    gap-3
                    sm:grid-cols-3
                    lg:grid-cols-5
                "
            >
                {stats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <div
                            key={stat.label}
                            className="
                                rounded-xl
                                border
                                border-gray-100
                                bg-gray-50/70
                                p-4
                                transition-all
                                duration-200
                                hover:-translate-y-0.5
                                hover:shadow-sm
                                dark:border-gray-800
                                dark:bg-gray-800/50
                            "
                        >
                            <div
                                className={`
                                    flex
                                    h-9
                                    w-9
                                    items-center
                                    justify-center
                                    rounded-lg
                                    ${stat.iconClass}
                                `}
                            >
                                <Icon size={17} />
                            </div>

                            <p
                                className="
                                    mt-3
                                    text-xl
                                    font-bold
                                    text-gray-900
                                    dark:text-white
                                "
                            >
                                {stat.value}
                            </p>

                            <p
                                className="
                                    mt-1
                                    text-xs
                                    leading-5
                                    text-gray-500
                                    dark:text-gray-400
                                "
                            >
                                {stat.label}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* Footer */}
            <div
                className="
                    mt-5
                    flex
                    items-center
                    justify-between
                    border-t
                    border-gray-100
                    pt-4
                    dark:border-gray-800
                "
            >
                <p
                    className="
                        text-xs
                        text-gray-400
                        dark:text-gray-500
                    "
                >
                    Updated from your latest activity
                </p>

                <button
                    type="button"
                    onClick={handleViewAnalytics}
                    className="
                        text-xs
                        font-medium
                        text-primary
                        transition
                        hover:underline
                    "
                >
                    See detailed report
                </button>
            </div>
        </section>
    );
};

AnalyticsPreview.propTypes = {
    analytics: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.bool,
};

export default AnalyticsPreview;