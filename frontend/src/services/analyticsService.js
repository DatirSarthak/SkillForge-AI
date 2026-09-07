import api from "./api";
import { ANALYTICS_ENDPOINTS } from "../constants/analyticsConstants";

const analyticsService = {
  /**
   * Get current user's analytics
   */
  async getAnalytics() {
    const response = await api.get(
      ANALYTICS_ENDPOINTS.GET_ANALYTICS
    );

    return response.data;
  },
};

export default analyticsService;