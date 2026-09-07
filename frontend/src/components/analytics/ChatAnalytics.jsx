import PropTypes from "prop-types";
import { Bot, MessageSquare, UserRound } from "lucide-react";

const ChatAnalytics = ({ data = {} }) => {
  const totalMessages = Number(data.totalMessages ?? 0);
  const userMessages = Number(data.userMessages ?? 0);
  const aiMessages = Number(data.aiMessages ?? 0);

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-6">
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400">
            <MessageSquare size={18} />
          </div>

          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            AI Chat
          </h2>
        </div>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Understand how you interact with the AI assistant.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Metric
          label="Conversations"
          value={data.totalConversations}
        />

        <Metric
          label="Your Messages"
          value={userMessages}
          icon={UserRound}
        />

        <Metric
          label="AI Responses"
          value={aiMessages}
          icon={Bot}
        />
      </div>

      <div className="mt-5 rounded-xl bg-gray-50 p-4 dark:bg-gray-800/50">
        <div className="mb-2 flex justify-between text-xs">
          <span className="text-gray-500 dark:text-gray-400">
            Total messages
          </span>

          <span className="font-medium text-gray-700 dark:text-gray-200">
            {totalMessages}
          </span>
        </div>

        <div
          className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700"
          role="progressbar"
          aria-valuenow={totalMessages}
          aria-valuemin="0"
          aria-valuemax={Math.max(totalMessages, 1)}
        >
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{
              width: `${Math.min(
                (aiMessages / Math.max(totalMessages, 1)) * 100,
                100
              )}%`,
            }}
          />
        </div>
      </div>
    </section>
  );
};

const Metric = ({ label, value, icon: Icon }) => {
  return (
    <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
      {Icon && (
        <Icon
          size={16}
          className="mb-2 text-gray-400"
        />
      )}

      <p className="text-xs text-gray-500 dark:text-gray-400">
        {label}
      </p>

      <p className="mt-1 text-xl font-bold text-gray-900 dark:text-white">
        {Number(value ?? 0).toLocaleString("en-IN")}
      </p>
    </div>
  );
};

ChatAnalytics.propTypes = {
  data: PropTypes.object,
};

Metric.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  icon: PropTypes.elementType,
};

export default ChatAnalytics;