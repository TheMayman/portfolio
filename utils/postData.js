import axios from "axios";
import { API_URL } from "./fetchData";

async function postData(url, values) {
	const config = {
		headers: {
			"Content-Type": "application/json",
			// "Accept-Language": locale,
		},
		body: values
		
	};
	const response = await axios
		.post(`${API_URL}/${url}`, config)
		.then((response) => {
			// console.log(response, "RESSSS");
			return response;
		})
		.catch((error) => {
			console.log(error, "error");
		});
		// console.log(response, "REturn");
	return response;
}

export default postData;
