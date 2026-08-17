import { useCallback, useState } from "react";
import progressService from "../services/progressService";

const useRoadmapProgress = (roadmapId) => {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updatingStepId, setUpdatingStepId] = useState(null);
  const [error, setError] = useState(null);

  const getProgress = useCallback(async () => {
    if (!roadmapId) {
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await progressService.getRoadmapProgress(roadmapId);
      const roadmapProgress = response?.data || null;
      setProgress(roadmapProgress);
      return roadmapProgress;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        "Failed to load roadmap progress.";

      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [roadmapId]);

  const updateStepProgress = useCallback(async (stepId, completed) => {
    if (!roadmapId || !stepId) {
      throw new Error("Roadmap ID and step ID are required.");
    }

    setUpdatingStepId(stepId);
    setError(null);

    try {
      const response = await progressService.updateStepProgress(
        roadmapId,
        stepId,
        completed
      );

      const updatedProgress = response?.data || null;
      setProgress(updatedProgress);
      return updatedProgress;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        "Failed to update roadmap progress.";

      setError(message);
      throw err;
    } finally {
      setUpdatingStepId(null);
    }
  }, [roadmapId]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    progress,
    loading,
    updatingStepId,
    error,
    getProgress,
    updateStepProgress,
    clearError,
  };
};

export default useRoadmapProgress;
