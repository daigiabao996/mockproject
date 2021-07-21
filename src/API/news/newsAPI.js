import newsConfig from "./newsConfig";

const newsAPI = {
  getAllNews() {
    const url = `/api/json/v1/1/lookup.php?i=${id}`;
    return newsConfig.get(url);
  },
};

export default newsAPI;
