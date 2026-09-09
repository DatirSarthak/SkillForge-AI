import PropTypes from "prop-types";
import {
    Activity,
    CalendarDays,
    FileSearch,
    FileText,
    Map,
    MessageSquare,
    Trophy,
} from "lucide-react";

const ActivityTrend = ({ data = [] }) => {
    const normalizedData = data.map((item) => ({
        ...item,
        chatMessages: Number(item.chatMessages ?? 0),
        notes: Number(item.notes ?? 0),
        quizAttempts: Number(item.quizAttempts ?? 0),
        resumeReviews: Number(item.resumeReviews ?? 0),
        roadmapCompletions: Number(
            item.roadmapCompletions ?? 0
        ),
        totalActivity: Number(item.totalActivity ?? 0),
    }));

    const maxActivity = Math.max(
        ...normalizedData.map(
            (item) => item.totalActivity
        ),
        1
    );

    const totalActivity = normalizedData.reduce(
        (sum, item) => sum + item.totalActivity,
        0
    );

    const activeDays = normalizedData.filter(
        (item) => item.totalActivity > 0
    ).length;

    return (
        <section
            className="
                overflow-hidden
                rounded-2xl
                border
                border-gray-200
                bg-white
                shadow-sm
                dark:border-gray-800
                dark:bg-gray-900
            "
        >
            {/* ================================================= */}
            {/* Header */}
            {/* ================================================= */}

            <div
                className="
                    flex
                    flex-col
                    gap-5
                    border-b
                    border-gray-100
                    px-5
                    py-5
                    dark:border-gray-800
                    sm:px-6
                    sm:py-6
                    lg:flex-row
                    lg:items-center
                    lg:justify-between
                "
            >
                {/* Title */}
                <div>
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
                            <Activity size={19} />
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
                                Activity Trend
                            </h2>

                            <p
                                className="
                                    mt-0.5
                                    text-xs
                                    text-gray-400
                                    dark:text-gray-500
                                "
                            >
                                Last 30 days
                            </p>
                        </div>
                    </div>

                    <p
                        className="
                            mt-3
                            max-w-xl
                            text-sm
                            leading-6
                            text-gray-500
                            dark:text-gray-400
                        "
                    >
                        Your learning activity across
                        SkillForge AI.
                    </p>
                </div>

                {/* Summary Cards */}
                {normalizedData.length > 0 && (
                    <div className="grid grid-cols-2 gap-3">
                        <SummaryCard
                            icon={CalendarDays}
                            label="Active days"
                            value={activeDays}
                        />

                        <SummaryCard
                            icon={Activity}
                            label="Total activity"
                            value={totalActivity}
                        />
                    </div>
                )}
            </div>

            {/* ================================================= */}
            {/* Chart */}
            {/* ================================================= */}

            {normalizedData.length === 0 ? (
                <EmptyState />
            ) : (
                <>
                    <div className="px-4 py-5 sm:px-6 sm:py-6">
                        <div className="overflow-x-auto pb-1">
                            <div className="min-w-[680px]">
                                <div className="relative h-[280px]">
                                    {/* Y Axis + Grid */}

                                    <div
                                        className="
                                            absolute
                                            inset-x-0
                                            bottom-10
                                            top-0
                                            flex
                                            flex-col
                                            justify-between
                                        "
                                    >
                                        {[100, 75, 50, 25, 0].map(
                                            (percentage) => {
                                                const value =
                                                    Math.round(
                                                        (maxActivity *
                                                            percentage) /
                                                            100
                                                    );

                                                return (
                                                    <div
                                                        key={
                                                            percentage
                                                        }
                                                        className="flex items-center gap-3"
                                                    >
                                                        <span
                                                            className="
                                                                w-8
                                                                shrink-0
                                                                text-right
                                                                text-[10px]
                                                                font-medium
                                                                text-gray-400
                                                                dark:text-gray-500
                                                            "
                                                        >
                                                            {value}
                                                        </span>

                                                        <div
                                                            className="
                                                                h-px
                                                                flex-1
                                                                border-t
                                                                border-dashed
                                                                border-gray-100
                                                                dark:border-gray-800
                                                            "
                                                        />
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>

                                    {/* Bars */}

                                    <div
                                        className="
                                            absolute
                                            inset-x-0
                                            bottom-10
                                            top-0
                                            flex
                                            items-end
                                            gap-2
                                            pl-11
                                            pr-2
                                            sm:gap-3
                                        "
                                    >
                                        {normalizedData.map(
                                            (item, index) => {
                                                const barHeight =
                                                    item.totalActivity >
                                                    0
                                                        ? Math.max(
                                                              (item.totalActivity /
                                                                  maxActivity) *
                                                                  195,
                                                              8
                                                          )
                                                        : 2;

                                                const date =
                                                    new Date(
                                                        `${item.date}T00:00:00`
                                                    );

                                                const label =
                                                    date.toLocaleDateString(
                                                        "en-IN",
                                                        {
                                                            day: "numeric",
                                                            month: "short",
                                                        }
                                                    );

                                                const showDate =
                                                    normalizedData.length <=
                                                        10 ||
                                                    index === 0 ||
                                                    index ===
                                                        normalizedData.length -
                                                            1 ||
                                                    index %
                                                        Math.ceil(
                                                            normalizedData.length /
                                                                6
                                                        ) ===
                                                        0;

                                                return (
                                                    <div
                                                        key={
                                                            item.date
                                                        }
                                                        className="
                                                            group
                                                            relative
                                                            flex
                                                            h-full
                                                            min-w-6
                                                            flex-1
                                                            flex-col
                                                            items-center
                                                            justify-end
                                                        "
                                                    >
                                                        {/* Tooltip */}

                                                        <div
                                                            className="
                                                                pointer-events-none
                                                                absolute
                                                                bottom-[68px]
                                                                left-1/2
                                                                z-30
                                                                hidden
                                                                w-48
                                                                -translate-x-1/2
                                                                rounded-xl
                                                                border
                                                                border-gray-200
                                                                bg-white
                                                                p-3
                                                                shadow-xl
                                                                group-hover:block
                                                                dark:border-gray-700
                                                                dark:bg-gray-800
                                                            "
                                                        >
                                                            <div className="mb-2 flex items-center justify-between gap-2">
                                                                <p
                                                                    className="
                                                                        text-xs
                                                                        font-semibold
                                                                        text-gray-900
                                                                        dark:text-white
                                                                    "
                                                                >
                                                                    {
                                                                        label
                                                                    }
                                                                </p>

                                                                <span
                                                                    className="
                                                                        rounded-full
                                                                        bg-primary/10
                                                                        px-2
                                                                        py-0.5
                                                                        text-[10px]
                                                                        font-semibold
                                                                        text-primary
                                                                    "
                                                                >
                                                                    {
                                                                        item.totalActivity
                                                                    }
                                                                </span>
                                                            </div>

                                                            <TooltipRow
                                                                icon={
                                                                    MessageSquare
                                                                }
                                                                label="Chat"
                                                                value={
                                                                    item.chatMessages
                                                                }
                                                            />

                                                            <TooltipRow
                                                                icon={
                                                                    FileText
                                                                }
                                                                label="Notes"
                                                                value={
                                                                    item.notes
                                                                }
                                                            />

                                                            <TooltipRow
                                                                icon={
                                                                    Trophy
                                                                }
                                                                label="Quiz"
                                                                value={
                                                                    item.quizAttempts
                                                                }
                                                            />

                                                            <TooltipRow
                                                                icon={
                                                                    FileSearch
                                                                }
                                                                label="Resume"
                                                                value={
                                                                    item.resumeReviews
                                                                }
                                                            />

                                                            <TooltipRow
                                                                icon={
                                                                    Map
                                                                }
                                                                label="Roadmap"
                                                                value={
                                                                    item.roadmapCompletions
                                                                }
                                                            />

                                                            <div
                                                                className="
                                                                    mt-2
                                                                    flex
                                                                    items-center
                                                                    justify-between
                                                                    border-t
                                                                    border-gray-100
                                                                    pt-2
                                                                    dark:border-gray-700
                                                                "
                                                            >
                                                                <span
                                                                    className="
                                                                        text-xs
                                                                        font-medium
                                                                        text-gray-500
                                                                        dark:text-gray-400
                                                                    "
                                                                >
                                                                    Total
                                                                </span>

                                                                <span
                                                                    className="
                                                                        text-xs
                                                                        font-bold
                                                                        text-gray-900
                                                                        dark:text-white
                                                                    "
                                                                >
                                                                    {
                                                                        item.totalActivity
                                                                    }
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {/* Activity Value */}

                                                        {item.totalActivity >
                                                            0 && (
                                                            <span
                                                                className="
                                                                    mb-2
                                                                    rounded-full
                                                                    bg-gray-100
                                                                    px-2
                                                                    py-0.5
                                                                    text-[10px]
                                                                    font-semibold
                                                                    text-gray-600
                                                                    transition
                                                                    group-hover:bg-primary/10
                                                                    group-hover:text-primary
                                                                    dark:bg-gray-800
                                                                    dark:text-gray-300
                                                                    dark:group-hover:bg-primary/10
                                                                    dark:group-hover:text-primary
                                                                "
                                                            >
                                                                {
                                                                    item.totalActivity
                                                                }
                                                            </span>
                                                        )}

                                                        {/* Bar */}

                                                        <div
                                                            className="
                                                                w-full
                                                                max-w-9
                                                                rounded-t-lg
                                                                bg-gradient-to-t
                                                                from-primary
                                                                to-primary/50
                                                                shadow-sm
                                                                transition-all
                                                                duration-300
                                                                group-hover:scale-x-110
                                                                group-hover:from-primary
                                                                group-hover:to-primary/70
                                                            "
                                                            style={{
                                                                height: `${barHeight}px`,
                                                            }}
                                                        />

                                                        {/* Date */}

                                                        <span
                                                            className={`
                                                                mt-2
                                                                whitespace-nowrap
                                                                text-[10px]
                                                                ${
                                                                    showDate
                                                                        ? "text-gray-400 dark:text-gray-500"
                                                                        : "invisible"
                                                                }
                                                            `}
                                                        >
                                                            {label}
                                                        </span>
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ================================================= */}
                    {/* Legend */}
                    {/* ================================================= */}

                    <div
                        className="
                            flex
                            flex-wrap
                            gap-x-5
                            gap-y-2
                            border-t
                            border-gray-100
                            px-5
                            py-4
                            dark:border-gray-800
                            sm:px-6
                        "
                    >
                        <Legend
                            icon={MessageSquare}
                            label="Chat"
                        />

                        <Legend
                            icon={FileText}
                            label="Notes"
                        />

                        <Legend
                            icon={Trophy}
                            label="Quiz"
                        />

                        <Legend
                            icon={FileSearch}
                            label="Resume"
                        />

                        <Legend
                            icon={Map}
                            label="Roadmap"
                        />
                    </div>
                </>
            )}
        </section>
    );
};

/* ========================================================= */
/* Summary Card */
/* ========================================================= */

const SummaryCard = ({
    icon: Icon,
    label,
    value,
}) => (
    <div
        className="
            flex
            min-w-[105px]
            items-center
            gap-2.5
            rounded-xl
            border
            border-gray-100
            bg-gray-50
            px-3
            py-2.5
            dark:border-gray-800
            dark:bg-gray-800/60
        "
    >
        <div
            className="
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-primary/10
                text-primary
            "
        >
            <Icon size={14} />
        </div>

        <div className="min-w-0">
            <p
                className="
                    whitespace-nowrap
                    text-[10px]
                    text-gray-400
                    dark:text-gray-500
                "
            >
                {label}
            </p>

            <p
                className="
                    text-sm
                    font-bold
                    text-gray-900
                    dark:text-white
                "
            >
                {value}
            </p>
        </div>
    </div>
);

/* ========================================================= */
/* Tooltip Row */
/* ========================================================= */

const TooltipRow = ({
    icon: Icon,
    label,
    value,
}) => (
    <div className="flex items-center justify-between py-1">
        <span
            className="
                flex
                items-center
                gap-2
                text-xs
                text-gray-500
                dark:text-gray-400
            "
        >
            <Icon size={12} />

            {label}
        </span>

        <span
            className="
                text-xs
                font-medium
                text-gray-800
                dark:text-gray-200
            "
        >
            {value}
        </span>
    </div>
);

/* ========================================================= */
/* Legend */
/* ========================================================= */

const Legend = ({
    icon: Icon,
    label,
}) => (
    <span
        className="
            flex
            items-center
            gap-2
            text-xs
            text-gray-500
            dark:text-gray-400
        "
    >
        <Icon size={13} />

        {label}
    </span>
);

/* ========================================================= */
/* Empty State */
/* ========================================================= */

const EmptyState = () => (
    <div className="px-5 py-6 sm:px-6">
        <div
            className="
                flex
                min-h-56
                items-center
                justify-center
                rounded-xl
                border
                border-dashed
                border-gray-200
                bg-gray-50/50
                dark:border-gray-800
                dark:bg-gray-950/30
            "
        >
            <div className="max-w-sm px-6 text-center">
                <div
                    className="
                        mx-auto
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-xl
                        bg-gray-100
                        text-gray-400
                        dark:bg-gray-800
                        dark:text-gray-500
                    "
                >
                    <Activity size={20} />
                </div>

                <p
                    className="
                        mt-3
                        text-sm
                        font-medium
                        text-gray-700
                        dark:text-gray-300
                    "
                >
                    No activity yet
                </p>

                <p
                    className="
                        mt-1
                        text-xs
                        leading-5
                        text-gray-400
                        dark:text-gray-500
                    "
                >
                    Your activity will appear here as
                    you use SkillForge AI.
                </p>
            </div>
        </div>
    </div>
);

/* ========================================================= */
/* PropTypes */
/* ========================================================= */

ActivityTrend.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.object
    ),
};

SummaryCard.propTypes = {
    icon: PropTypes.elementType.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
};

TooltipRow.propTypes = {
    icon: PropTypes.elementType.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
};

Legend.propTypes = {
    icon: PropTypes.elementType.isRequired,
    label: PropTypes.string.isRequired,
};

export default ActivityTrend;