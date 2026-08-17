import api from "./api";

const BASE_URL = "/ai/roadmaps";

const generateRoadmap = async (data) => {
  const response = await api.post(`${BASE_URL}/generate`, data);

  return response.data;
};

const getRoadmaps = async () => {
  const response = await api.get(BASE_URL);

  return response.data;
};

const getRoadmap = async (roadmapId) => {
  const response = await api.get(`${BASE_URL}/${roadmapId}`);

  return response.data;
};

const deleteRoadmap = async (roadmapId) => {
  const response = await api.delete(`${BASE_URL}/${roadmapId}`);

  return response.data;
};

const aiRoadmapService = {
  generateRoadmap,
  getRoadmaps,
  getRoadmap,
  deleteRoadmap,
};

export default aiRoadmapService;