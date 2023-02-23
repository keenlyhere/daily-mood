export default function categoryTasksMapper(allTasks, categoryTasks) {
    return (
        Object.keys(allTasks).length ? (
            Object.keys(categoryTasks).map((category) => (
                <div key={category} className={`UserTasks-category-container`}>
                    <div className="UserTasks-header">
                        <p className="UserTasks-header-text">{category}</p>
                    </div>
                    <div className="UserTasks-icons-container">
                        {
                            categoryTasks[category].map((task ,idx) => (
                                <div key={idx} className="UserTasks-icon-container">
                                    <img src={task.taskIcon} className={`UserTasks-icon ${task.isComplete ? "" : "UserTasks-incomplete"}`} alt="Task icon" />
                                </div>
                            ))
                        }
                    </div>
                </div>
            ))
        ) : (
            <div className="UserTasks-category-container">
                No task T_T prompt user to create a task here!
            </div>
        )

    )
}