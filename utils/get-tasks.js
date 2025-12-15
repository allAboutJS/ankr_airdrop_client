import toast from "./toast";

const getTasks = async (dispatch) => {
	try {
		const response = await fetch(
			"https://ankr-airdrop-server-e0tq.onrender.com/api/tasks",
			// "http://localhost:3000/api/tasks",
		);
		const data = await response.json();

		dispatch({ type: "set_tasks", payload: data });
	} catch (error) {
		console.error(error);

		toast.error("Failed to fetch data. Retrying...");

		setTimeout(() => getTasks(dispatch), 3_000);
	}
};

export default getTasks;
