import toast from "./toast";

const getReferees = async (dispatch) => {
	try {
		const {
			initDataUnsafe: {
				user: { id },
			},
		} = window.Telegram.WebApp;

		const response = await fetch(
			"https://ankr-airdrop-server-e0tq.onrender.com/api/user/referees",
			// "http://localhost:3000/api/user/referees",
			{
				headers: {
					"X-Enc-Id": btoa(id),
					// "X-Enc-Id": btoa("user008"),
				},
			},
		);
		const data = await response.json();

		dispatch({ type: "set_referees", payload: data });
	} catch (error) {
		console.error(error);

		toast.error("Failed to fetch data. Retrying...");

		setTimeout(() => getReferees(dispatch), 3_000);
	}
};

export default getReferees;
