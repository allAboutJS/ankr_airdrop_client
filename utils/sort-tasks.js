const sortTasks = (state, dispatch) => {
	const { tasks, userTasks, pendingTasks, dailyTasks } = state;

	if (tasks && userTasks && (!pendingTasks || !dailyTasks)) {
		const sortedPendingTasks = tasks.filter(task => {
			const isTaskDone = userTasks.find(
				userTask => userTask.taskId === task._id
			);

			return isTaskDone ? false : true;
		});

		dispatch({ type: "set_pending_tasks", payload: sortedPendingTasks });
	}
};

export default sortTasks;
