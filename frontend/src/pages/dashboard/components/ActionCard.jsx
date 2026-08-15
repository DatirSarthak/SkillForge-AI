import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ActionCard = ({
  title,
  description,
  route,
  icon,
  color,
}) => {

  return (

    <Link
      to={route}
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
      hover:-translate-y-2
      hover:shadow-xl
      dark:border-slate-700
      dark:bg-slate-900
      "
    >

      <div className="flex items-center justify-between">

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
          `}
        >
          {icon}
        </div>

        <ArrowRight
          className="
          transition
          group-hover:translate-x-1
          "
        />

      </div>

      <h3 className="mt-6 text-xl font-bold dark:text-white">
        {title}
      </h3>

      <p className="mt-2 text-slate-500 dark:text-slate-400">
        {description}
      </p>

    </Link>

  );

};

export default ActionCard;