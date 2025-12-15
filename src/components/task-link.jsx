import confetti from "canvas-confetti";
import { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import fetchUser from "../../utils/fetch-user";
import getUserTasks from "../../utils/get-user-tasks";
import toast from "../../utils/toast";

const TaskLink = ({ id, link, userId, dispatch }) => {
	const [confirming, setConfirming] = useState(false);
	const [showConfirmButton, setShowConfirmButton] = useState(false);

	const celebrate = () => {
		confetti({
			particleCount: 100,
			spread: 360,
			origin: { y: 0.5 },
		});

		setTimeout(() => confetti.reset(), 1_500);
	};

	const confirmTaskCompletion = async (trials = 1) => {
		setConfirming(true);

		try {
			const response = await fetch(
				`https://ankr-airdrop-server-e0tq.onrender.com/api/user/tasks/confirm?task_id=${id}`,
				// `http://localhost:3000/api/user/tasks/confirm?task_id=${id}`,
				{
					headers: {
						"X-Enc-Id": btoa(userId),
						// "X-Enc-Id": btoa("user008"),
					},
				},
			);

			if (!response.ok && trials < 5) {
				setTimeout(() => confirmTaskCompletion(trials + 1), 3_000);
				return;
			}
			if (!response.ok) {
				setShowConfirmButton(false);
				setConfirming(false);
				return;
			}

			await Promise.all([fetchUser(dispatch), getUserTasks(dispatch)]);
			setConfirming(false);
			celebrate();
			toast.success(
				"Task confirmation was successful. Your balance has been updated",
			);
		} catch (error) {
			console.log("Task completion verification error: ", error);

			toast.error("Task confirmation failed");

			if (trials < 5) {
				setTimeout(() => confirmTaskCompletion(trials + 1), 3_000);
			} else {
				setShowConfirmButton(false);
				setConfirming(false);
			}
		}
	};

	const handleTaskStart = async (e) => {
		e.preventDefault();

		const initializationLink = `https://ankr-airdrop-server-e0tq.onrender.com/api/user/tasks/initialize?task_id=${id}&id=${userId}`;
		// `http://localhost:3000/api/user/tasks/initialize?task_id=${id}&redirect_to=${link}&id=${userId}`;
		const anchorTag = document.createElement("a");

		anchorTag["href"] = link;
		anchorTag["rel"] = "noopener noreferrer";
		anchorTag["target"] = "_blank";
		anchorTag["style"]["display"] = "none";

		document.body.appendChild(anchorTag);

		anchorTag.click();
		anchorTag.remove();
		setShowConfirmButton(true);
		setConfirming(true);

		try {
			await fetch(initializationLink);
		} catch (error) {
			console.log("Task initialization error: ", error);
		} finally {
			setTimeout(() => setConfirming(false), 3_000);
		}
	};

	return (
		<>
			{showConfirmButton ? (
				<a
					onClick={async (e) => {
						e.target.setAttribute("disabled", true);
						await confirmTaskCompletion();
					}}
					href="javascript:void(0)"
					disabled={confirming}
				>
					{confirming ? (
						<span>
							<CgSpinner style={{ animation: "spin 1s linear infinite" }} />
						</span>
					) : (
						"Confirm"
					)}
				</a>
			) : (
				<a
					onClick={handleTaskStart}
					target="_blank"
					rel="noopener noreferrer"
					href="javascript:void(0)"
				>
					Start
				</a>
			)}
		</>
	);
};

export default TaskLink;
