const API = `http://localhost:8080`;

export async function fetchFromAPI(endpoint, options) {
	const { method, body } = { method: "POST", body: null, ...options };
	const response = await fetch(`${API}/${endpoint}`, {
		method,
		...(body && { body: JSON.stringify(body) }),
		headers: {
			"Content-Type": "application/json",
		},
	});
	return response.json();
}
