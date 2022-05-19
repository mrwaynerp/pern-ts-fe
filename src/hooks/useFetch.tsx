import React from "react";

export default function useFetch(url: string) {
	const [status, setStatus] = React.useState("idle");
	const [data, setData] = React.useState([]);

	React.useEffect(() => {
		if (!url || status === "fetching") return;
		const fetchData = async () => {
			setStatus("fetching");
			try {
				const response = await fetch(url);
				const data = await response.json();
				setData(data);
				setStatus("fetched");
			} catch (error) {
				setStatus("failed");
			}
		};

		fetchData();
	}, [url]);

	return { status, data };
}
