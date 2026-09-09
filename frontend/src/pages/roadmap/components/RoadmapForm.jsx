import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import ExperienceLevelSelect from "./ExperienceLevelSelect";
import roadmapValidationSchema from "../../../utils/roadmapValidation";

const RoadmapForm = ({ onSubmit, loading = false }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(roadmapValidationSchema),
    defaultValues: {
      goal: "",
      currentSkills: "",
      experienceLevel: "",
      topic: "",
      targetRole: "",
    },
  });

  const handleFormSubmit = async (data) => {
    await onSubmit(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="min-w-0 space-y-6"
    >
      {/* Goal */}
      <div className="min-w-0">
        <label
          htmlFor="goal"
          className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
        >
          What is your goal?
        </label>

        <textarea
          id="goal"
          rows={3}
          placeholder="Example: Become a Java Backend Developer"
          {...register("goal")}
          className={`block w-full max-w-full min-w-0 resize-none rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 ${
            errors.goal
              ? "border-red-500 focus:ring-red-500/20"
              : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 dark:border-slate-700"
          }`}
        />

        {errors.goal && (
          <p className="mt-1.5 text-xs text-red-500">
            {errors.goal.message}
          </p>
        )}
      </div>

      {/* Current Skills */}
      <div className="min-w-0">
        <label
          htmlFor="currentSkills"
          className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
        >
          Current Skills
        </label>

        <textarea
          id="currentSkills"
          rows={4}
          placeholder="Example: Java basics, OOP, SQL, Git"
          {...register("currentSkills")}
          className={`block w-full max-w-full min-w-0 resize-none rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 ${
            errors.currentSkills
              ? "border-red-500 focus:ring-red-500/20"
              : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 dark:border-slate-700"
          }`}
        />

        {errors.currentSkills && (
          <p className="mt-1.5 text-xs text-red-500">
            {errors.currentSkills.message}
          </p>
        )}
      </div>

      {/* Topic + Experience */}
      <div className="grid min-w-0 grid-cols-1 gap-5 md:grid-cols-2">
        {/* Learning Topic */}
        <div className="min-w-0">
          <label
            htmlFor="topic"
            className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Learning Topic
          </label>

          <input
            id="topic"
            type="text"
            placeholder="Example: Java Backend Development"
            {...register("topic")}
            className={`block w-full max-w-full min-w-0 rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 ${
              errors.topic
                ? "border-red-500 focus:ring-red-500/20"
                : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 dark:border-slate-700"
            }`}
          />

          {errors.topic && (
            <p className="mt-1.5 text-xs text-red-500">
              {errors.topic.message}
            </p>
          )}
        </div>

        {/* Experience Level */}
        <div className="min-w-0">
          <label
            htmlFor="experienceLevel"
            className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Experience Level
          </label>

          <Controller
            name="experienceLevel"
            control={control}
            render={({ field }) => (
              <ExperienceLevelSelect
                value={field.value}
                onChange={field.onChange}
                error={errors.experienceLevel}
              />
            )}
          />

          {errors.experienceLevel && (
            <p className="mt-1.5 text-xs text-red-500">
              {errors.experienceLevel.message}
            </p>
          )}
        </div>
      </div>

      {/* Target Role */}
      <div className="min-w-0">
        <label
          htmlFor="targetRole"
          className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
        >
          Target Role
          <span className="ml-1 text-xs font-normal text-slate-400">
            Optional
          </span>
        </label>

        <input
          id="targetRole"
          type="text"
          placeholder="Example: Java Backend Developer"
          {...register("targetRole")}
          className={`block w-full max-w-full min-w-0 rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 ${
            errors.targetRole
              ? "border-red-500 focus:ring-red-500/20"
              : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 dark:border-slate-700"
          }`}
        />

        {errors.targetRole && (
          <p className="mt-1.5 text-xs text-red-500">
            {errors.targetRole.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Generating Roadmap...
          </>
        ) : (
          "Generate Roadmap"
        )}
      </button>
    </form>
  );
};

export default RoadmapForm;