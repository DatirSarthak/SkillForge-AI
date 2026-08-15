const StatCard = ({
  title,
  value,
  icon,
  color,
}) => {

  const Icon = icon;

  return (
    <div
      className="
      group
      rounded-3xl
      border
      border-slate-200
      bg-white
      p-6
      shadow-sm
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-xl
      dark:border-slate-700
      dark:bg-slate-900
      "
    >
      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-slate-900 dark:text-white">
            {value}
          </h2>

        </div>

        <div
          className={`
          h-14
          w-14
          rounded-2xl
          bg-gradient-to-r
          ${color}
          flex
          items-center
          justify-center
          text-white
          shadow-lg
          `}
        >
          <Icon size={26}/>
        </div>

      </div>

    </div>
  );
};

export default StatCard;