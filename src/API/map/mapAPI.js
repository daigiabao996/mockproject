import mapConfig from "./mapConfig";
import moment from "moment";

const mapAPI = {
  getAllCountries() {
    const url = "/summary";
    return mapConfig.get(url);
  },
  getByCountry(slug) {
    const url = `/dayone/country/${slug}?from=2021-01-01T00:00:00&to=${moment()
      .utc(0)
      .format()}`;
    return mapConfig.get(url);
  },
  getWorldwide() {
    const url = `/world?from=2021-01-01T00:00:00&to=${moment()
      .utc(0)
      .format()}`;
    return mapConfig.get(url);
  },
};

export default mapAPI;
