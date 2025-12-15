import toast from "./toast";

const getUserTasks = async (dispatch) => {
	try {
		const {
			initDataUnsafe: {
				user: { id },
			},
		} = window.Telegram.WebApp;

		const response = await fetch(
			"https://ankr-airdrop-server-e0tq.onrender.com/api/user/tasks",
			// "http://localhost:3000/api/user/tasks",
			{
				headers: {
					"X-Enc-Id": btoa(id),
					// "X-Enc-Id": btoa("user008"),
				},
			},
		);
		const data = await response.json();

		dispatch({ type: "set_user_tasks", payload: data });
	} catch (error) {
		console.error(error);

		toast.error("Failed to fetch data. Retrying...");

		setTimeout(() => getReferees(dispatch), 3_000);
	}
};

export default getUserTasks;
