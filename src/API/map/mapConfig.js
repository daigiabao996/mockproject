import axios from "axios";

const mapConfig = axios.create({
	baseURL: "https://api.covid19api.com",
	// headers: {
	// 	"Content-Type": "application/json",
	// },
});

mapConfig.interceptors.request.use(
	function (config) {
		// Do something before request is sent
		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);

// Add a response interceptor
mapConfig.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response.data;
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		return Promise.reject(error);
	}
);

export default mapConfig;
