import api from "./api";

const BASE_URL = "/ai/roadmaps";

const getRoadmapProgress = async (roadmapId) => {
  const response = await api.get(`${BASE_URL}/${roadmapId}/progress`);
  return response.data;
};

const updateStepProgress = async (roadmapId, stepId, completed) => {
  const response = await api.patch(
    `${BASE_URL}/${roadmapId}/steps/${stepId}/progress`,
    { completed }
  );

  return response.data;
};

const progressService = {
  getRoadmapProgress,
  updateStepProgress,
};

export default progressService;
