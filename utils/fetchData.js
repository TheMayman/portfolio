import axios from "axios";

export const API_URL = "https://cms.xplor.beyond-creation.net/api";
export const BASE_URL = "https://cms.xplor.beyond-creation.net";

async function fetchData(url) {
	const config = {
		headers: {
			"Content-Type": "application/json",
			// "Accept-Language": locale,
		},
	};
	const response = await axios
		.get(`${API_URL}/${url}?populate=deep`, config)
		.then((response) => {
			// console.log(response.data, "RESSSS");
			return response.data;
		})
		.catch((error) => {
			// console.log(error, "error");
		});
		// console.log(response, "REturn");
	return response.data;
}

export default fetchData;
