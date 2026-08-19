import api from "./api";

const SEARCH_ENDPOINT = "/search";

const search = async (query, limit = 20) => {
  const response = await api.get(SEARCH_ENDPOINT, {
    params: {
      q: query,
      limit,
    },
  });

  return response.data;
};

const searchService = {
  search,
};

export default searchService;
