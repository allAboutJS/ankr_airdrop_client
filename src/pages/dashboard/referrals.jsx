import { useContext } from "react";
import { BiCopy } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import getReferralMessage from "../../../utils/get-referral-message";
import toast from "../../../utils/toast";
import { AppCtx } from "../../App";
import PendingReferralsUi from "../../components/referrals-optimistic-ui";

const ReferralsPage = () => {
	const { state } = useContext(AppCtx);
	const { user, referees } = state;
	const copyLink = async () => {
		try {
			await window.navigator.clipboard.writeText(
				`https://t.me/@the_ankr_airdrop_bot?start=${user.referralCode}`,
			);

			toast.success("Link copied!");
		} catch (error) {
			toast.error("Failed to copy!");
		}
	};

	return (
		<div className="referrals-page">
			<header>
				<h1>Referrals</h1>
			</header>
			<div className="container">
				<section className="referral-link">
					<div>
						<h2>Your Referral Link</h2>
						<p>Share this link with your friends to earn rewards</p>
					</div>
					<div>
						<input
							type="text"
							readOnly
							value={`https://t.me/ankr_airdrop_bot?start=${user.referralCode}`}
						/>
						<button onClick={copyLink}>
							<BiCopy /> Copy
						</button>
					</div>
				</section>
				<section className="total-referrals">
					<FaUsers className="card-icon" />
					<h3>Referrals</h3>
					<div>
						<h2>{user.totalReferrals.toLocaleString()}</h2>
						{referees ? (
							<p className="fade-in">
								{getReferralMessage(referees)}
							</p>
						) : (
							<div
								className="animate-pulse"
								style={{
									height: 16,
									background: "#444",
									borderRadius: 6,
								}}
							></div>
						)}
					</div>
				</section>
				<section className="referrals-rewards">
					<svg
						className="card-icon"
						clip-rule="evenodd"
						fill-rule="evenodd"
						stroke-linejoin="round"
						stroke-miterlimit="2"
						viewBox="0 0 560 400"
						width={32}
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="m21.4.6 13.1 6.7c1.9 1 3.1 2.9 3.1 5.1v3.1h-4.8v-3.1c0-.3-.2-.6-.5-.8l-13.1-6.7c-.2-.1-.5-.1-.8 0l-13.1 6.7c-.3.1-.5.4-.5.8v3.1h-4.8v-3.1c0-2.1 1.2-4.1 3.1-5.1l13.1-6.7c1.6-.8 3.5-.8 5.2 0zm1.5 19.2c0-2.3-1.9-4.1-4.1-4.1-2.3 0-4.1 1.8-4.1 4.1s1.9 4.1 4.1 4.1 4.1-1.8 4.1-4.1zm9.3 8.6c.3-.1.5-.4.5-.8v-3.1h4.8v3.1c0 2.1-1.2 4.1-3.1 5.1l-13.1 6.7c-.8.4-1.7.6-2.6.6s-1.8-.2-2.6-.6l-13-6.7c-1.9-1-3.1-2.9-3.1-5.1v-3.1h4.8v3.1c0 .3.2.6.5.8l11.1 5.6v-5.6c-3.8-1.1-6.5-4.5-6.5-8.6 0-4.9 4-9 9-9 4.9 0 9 4 9 9 0 4.1-2.8 7.6-6.5 8.6v5.6z"
							fill="#f1f1f1"
							fill-opacity=".9"
							transform="matrix(6.75 0 0 6.75 153.1 65)"
						/>
					</svg>
					<h3>Earnings from Referrals</h3>
					<div>
						<h2>
							{(user.totalReferrals * 10).toLocaleString()} ANKR
						</h2>
					</div>
				</section>
				<section className="referrals-list">
					<div>
						<h2>Referral List</h2>
						<p>List of friends you've referred</p>
					</div>
					<div style={{ overflow: "auto" }}>
						{referees ? (
							referees.length > 0 ? (
								<table>
									<thead>
										<tr>
											<td>Username</td>
											<td>Date joined</td>
											<td>Earnings</td>
										</tr>
									</thead>
									<tbody>
										{referees.map((referee) => (
											<tr>
												<td>{referee.username}</td>
												<td>
													{new Date(
														referee.dateJoined,
													).toLocaleDateString()}
												</td>
												<td
													style={{
														textAlign: "right",
													}}
												>
													{referee.balance.toLocaleString()}{" "}
													ANKR
												</td>
											</tr>
										))}
									</tbody>
								</table>
							) : (
								<p
									style={{
										textAlign: "center",
										fontSize: "1rem",
									}}
								>
									<small>You haven't referred anyone</small>
								</p>
							)
						) : (
							<div>
								<table>
									<thead>
										<tr>
											<td>Username</td>
											<td>Date joined</td>
											<td>Earnings</td>
										</tr>
									</thead>
								</table>
								<PendingReferralsUi />
							</div>
						)}
					</div>
				</section>
			</div>
		</div>
	);
};

export default ReferralsPage;
