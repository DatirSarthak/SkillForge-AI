import { useCallback, useState } from "react";
import aiRoadmapService from "../services/aiRoadmapService";

const useAiRoadmap = () => {
  const [roadmaps, setRoadmaps] = useState([]);
  const [roadmap, setRoadmap] = useState(null);

  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [error, setError] = useState(null);

  const generateRoadmap = useCallback(async (data) => {
    setLoading(true);
    setError(null);

    try {
      const response =
        await aiRoadmapService.generateRoadmap(data);

      const generatedRoadmap = response?.data;

      setRoadmap(generatedRoadmap || null);

      return generatedRoadmap;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        "Failed to generate roadmap.";

      setError(message);

      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getRoadmaps = useCallback(async () => {
    setHistoryLoading(true);
    setError(null);

    try {
      const response =
        await aiRoadmapService.getRoadmaps();

      const roadmapHistory =
        response?.data || [];

      setRoadmaps(roadmapHistory);

      return roadmapHistory;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        "Failed to load roadmap history.";

      setError(message);

      throw err;
    } finally {
      setHistoryLoading(false);
    }
  }, []);

  const getRoadmap = useCallback(async (roadmapId) => {
    setDetailsLoading(true);
    setError(null);

    try {
      const response =
        await aiRoadmapService.getRoadmap(roadmapId);

      const roadmapDetails =
        response?.data;

      setRoadmap(
        roadmapDetails || null
      );

      return roadmapDetails;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        "Failed to load roadmap.";

      setError(message);

      throw err;
    } finally {
      setDetailsLoading(false);
    }
  }, []);

  const deleteRoadmap = useCallback(async (roadmapId) => {
    if (!roadmapId) {
      throw new Error("Roadmap ID is required.");
    }

    setDeleteLoading(true);
    setError(null);

    try {
      const response =
        await aiRoadmapService.deleteRoadmap(
          roadmapId
        );

      // Immediately update local UI
      setRoadmaps((previousRoadmaps) =>
        previousRoadmaps.filter(
          (item) => item.id !== roadmapId
        )
      );

      // Clear currently selected roadmap
      setRoadmap((currentRoadmap) =>
        currentRoadmap?.id === roadmapId
          ? null
          : currentRoadmap
      );

      return response;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        "Failed to delete roadmap.";

      setError(message);

      throw err;
    } finally {
      setDeleteLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearRoadmap = useCallback(() => {
    setRoadmap(null);
  }, []);

  return {
    roadmaps,
    roadmap,

    loading,
    historyLoading,
    detailsLoading,
    deleteLoading,

    error,

    generateRoadmap,
    getRoadmaps,
    getRoadmap,
    deleteRoadmap,

    clearError,
    clearRoadmap,
  };
};

export default useAiRoadmap;