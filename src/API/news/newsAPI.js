import newsConfig from "./newsConfig";

const newsAPI = {
  getAllNews() {
    const url = "/articles";
    return newsConfig.get(url);
  },
};

export default newsAPI;
