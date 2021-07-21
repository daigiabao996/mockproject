import mapConfig from "./mapConfig";

const mapAPI = {
	getAllCountries() {
		const url = "/countries";
		return mapConfig.get(url);
	},
};

export default mapAPI;
