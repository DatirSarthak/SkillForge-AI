import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import RoadmapForm from "./components/RoadmapForm";
import RoadmapHistory from "./components/RoadmapHistory";
import DeleteRoadmapDialog from "./components/DeleteRoadmapDialog";

import useAiRoadmap from "../../hooks/useAiRoadmap";

const AiRoadmapPage = () => {
  const {
    roadmaps,
    loading,
    historyLoading,
    deleteLoading,
    error,
    generateRoadmap,
    getRoadmaps,
    deleteRoadmap,
  } = useAiRoadmap();

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    getRoadmaps().catch(() => {});
  }, [getRoadmaps]);

  const handleGenerateRoadmap = async (data) => {
    try {
      await generateRoadmap(data);

      toast.success("Roadmap generated successfully.");

      await getRoadmaps();
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Failed to generate roadmap."
      );
    }
  };

  const handleDeleteRequest = (roadmap) => {
    setDeleteTarget(roadmap);
    setShowDeleteDialog(true);
  };

  const handleDelete = async () => {
    if (!deleteTarget?.id) {
      return;
    }

    try {
      await deleteRoadmap(deleteTarget.id);

      toast.success("Roadmap deleted successfully.");

      setShowDeleteDialog(false);
      setDeleteTarget(null);
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Failed to delete roadmap."
      );
    }
  };

  const handleCancelDelete = () => {
    if (deleteLoading) {
      return;
    }

    setShowDeleteDialog(false);
    setDeleteTarget(null);
  };

  return (
    <div className="min-h-full bg-slate-50 px-4 py-6 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-xl dark:bg-indigo-500/10">
              🧭
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
                AI Roadmap Generator
              </h1>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Create a personalized learning path for your
                career goals.
              </p>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && !loading && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/40 dark:bg-red-500/10 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Generate + History */}
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[420px_1fr]">

          {/* Form */}
          <section className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Create Your Roadmap
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Tell us where you are and where you want to go.
              </p>
            </div>

            <RoadmapForm
              onSubmit={handleGenerateRoadmap}
              loading={loading}
            />
          </section>

          {/* History */}
          <RoadmapHistory
            roadmaps={roadmaps}
            loading={historyLoading}
            onDelete={handleDeleteRequest}
          />
        </div>
      </div>

      {/* Delete Dialog */}
      {showDeleteDialog && (
        <DeleteRoadmapDialog
          roadmap={deleteTarget}
          loading={deleteLoading}
          onConfirm={handleDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default AiRoadmapPage;