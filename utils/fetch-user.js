import toast from "./toast";

const fetchUser = async (dispatch) => {
	if (window.Telegram.WebApp) {
		const {
			initDataUnsafe: {
				user: { id },
			},
		} = window.Telegram.WebApp;

		try {
			const response = await fetch(
				"https://ankr-airdrop-server-e0tq.onrender.com/api/user/",
				// "http://localhost:3000/api/user/",
				{
					headers: {
						"X-Enc-Id": btoa(id),
						// "X-Enc-Id": btoa("user008")
					},
				},
			);
			const data = await response.json();

			dispatch({ type: "set_user", payload: data });
		} catch (error) {
			console.error(error);

			toast.error("Failed to fetch data. Retrying...");

			setTimeout(() => {
				fetchUser(dispatch);
			}, 3_000);
		}
	} else {
		setTimeout(() => {
			fetchUser(dispatch);
		}, 3_000);
	}
};

export default fetchUser;
