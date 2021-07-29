import newsConfig from "./newsConfig";

const newsAPI = {
  getAllNews(param) {
    const url = `/top-headlines?q=${param}&apiKey=efc9ca47d5bb41cfb313cae3661141c0`;
    return newsConfig.get(url);
  },
};

export default newsAPI;
